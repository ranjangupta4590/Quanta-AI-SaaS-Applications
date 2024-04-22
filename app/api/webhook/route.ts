import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import prismaDB from "@/lib/prismaDB";
import { stripe } from "@/lib/stripe";

export async function POST(req:Request) {
    const body = req.text(); 
    const signature=headers().get("Stripe-Signature") as string;
    let event: Stripe.Event;
    
    try {
        event= stripe.webhooks.constructEvent(  body.toString(), signature, process.env.STRIPE_WEBHOOK_SECRET!);
    } catch (error) {
        console.log("[WEBHOOK_ERROR]",error)
        return new NextResponse("Webhook Error",{status:400})
    }
    
    const session=event.data.object as Stripe.Checkout.Session;
    
    if(event.type==="checkout.session.completed"){
        const subscription=await stripe.subscriptions.retrieve(
        
            session.subscription as string
        );
        
        if(!session?.metadata?.userId){
            return new NextResponse("userId id required",{status:400})
        }
        
        await prismaDB.userSubscription.create({
            data:{
                userId:session?.metadata?.userId,
                stripeSubscriptionId:subscription.id,
                stripeCustomerId:subscription.customer as string,
                stripePriceId:subscription.items.data[0].price.id,
                stripeCurrentPeriodEnd:new Date(subscription.current_period_end*1000).toISOString(),
            },
        })
    }
    
    if(event.type==="invoice.payment_succeeded"){
        const subscription=await stripe.subscriptions.retrieve(
            session.subscription as  string
        );
        
        await prismaDB.userSubscription.update({
            where:{
                stripeSubscriptionId:subscription.id,
                
            },
            data:{
                stripePriceId:subscription.items.data[0].price.id,
                stripeCurrentPeriodEnd:new Date(subscription.current_period_end*1000).toISOString(),
            },
        })
    }
    
    return new NextResponse(null,{status:200});
}