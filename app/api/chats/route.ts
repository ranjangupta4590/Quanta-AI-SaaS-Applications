import { OpenAI } from "openai";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import { checkSubscription } from "@/lib/proSubscription";
import { incrementApiLimit, checkApiLimit } from "@/lib/apiLimit";


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


export async function POST(req:Request){
    try {
        const {userId}= auth();
        const body=await req.json();
        const {prompt}=body;
        
        if(!userId){
            return  new NextResponse("Unauthorized",{status:401});
        }
        
        if(!openai.apiKey){
            return  new NextResponse('OpenAI API Key is missing',{ status:500 }) ;
        }
        
        if(!prompt){
         return new  NextResponse(' Messages are required',{ status:400});  
        }
        
        const freeTrial = await checkApiLimit();
        // const isPro = await checkSubscription();
    
        if (!freeTrial) {
          return new NextResponse("Free trial has expired. Please upgrade to pro.", { status: 403 });
        }
        
        const response =await openai.chat.completions.create({
            model:'gpt-3.5-turbo',
            messages: [
                {
                  role: 'system',
                  content: 'You are a helpful assistant.',
                },
                {
                  role: 'user',
                  content: prompt,
                },
              ],
        });
        
        await incrementApiLimit();
        // if (!isPro) {
        // }
        return NextResponse.json(response.choices[0].message);
    } catch (error) {
        console.log('[CONVERSATION_ERROR',error);
        return new NextResponse("Internal Error", {status:500});
    }
}