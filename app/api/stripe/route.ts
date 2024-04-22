import {auth , currentUser} from '@clerk/nextjs';
import { NextResponse } from 'next/server';

import prismaDB from '@/lib/prismaDB';
import { stripe } from '@/lib/stripe';
import { absoluteUrl } from '@/lib/utils';

const settingUrl =absoluteUrl('/settings')

export async function GET(){
try {
    const {userId}=auth();
    const user=await currentUser();
    
    if(!user || !userId) return new NextResponse('Unauthorized User',{status:401});
    
    const userSubscription=  await prismaDB.userSubscription.findUnique({where: {userId}});
    
    if(userSubscription && userSubscription.stripeCustomerId){
        
        const stripeSession=await stripe.billingPortal.sessions.create({
            customer: userSubscription.stripeCustomerId,
            return_url:settingUrl
        });
        
        return new NextResponse(JSON.stringify({url :stripeSession.url}));
    }
    
    const stripeSession=await stripe.checkout.sessions.create({
        success_url:settingUrl,
        cancel_url:settingUrl,
        payment_method_types:['card'],
        mode: 'subscription',
        billing_address_collection:"auto",
        customer_email:user.emailAddresses[0].emailAddress,
        line_items: [
            {
                price_data:{
                    currency:"USD",
                    product_data:{
                        name:"Quanta Plus",
                        description:"Access to all features of Quanta AI with unlimited Generations",
                    },
                    unit_amount:1000, // INR per month
                    recurring: {interval:"month"},
                },
                quantity:1,
            },
        ],
        metadata:{userId,}
    });
    return new NextResponse(JSON.stringify({url :stripeSession.url}));
    
} catch (error) {
    console.log("[STRIPE_ERROR]",error)
    return new NextResponse("Internal Error",{status:500})
}

}