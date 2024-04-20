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
        const {prompt,amount=1,resolution="512x512"}=body;
        
        if(!userId){
            return  new NextResponse("Unauthorized",{status:401});
        }
        
        if(!openai.apiKey){
            return  new NextResponse('OpenAI API Key is missing',{ status:500 }) ;
        }
        
        if(!prompt){
         return new  NextResponse(' Prompt are required',{ status:400});  
        }
        if(!amount){
         return new  NextResponse(' Prompt are required',{ status:400});  
        }
        if(!resolution){
         return new  NextResponse(' Prompt are required',{ status:400});  
        }
        
        // const freeTrial = await checkApiLimit();
        // const isPro = await checkSubscription();
    
        // if (!freeTrial && !isPro) {
        //   return new NextResponse("Free trial has expired. Please upgrade to pro.", { status: 403 });
        // }
        
        const response = await openai.images.generate({
          // model: "dall-e-3",
          prompt: prompt,
          n: parseInt(amount,10),
          quality:'standard',
          size: resolution,
          // n:1,
          // size: '1024x1024',
        });
        
        // if (!isPro) {
        //     await incrementApiLimit();
        // }
        return NextResponse.json(response.data);
    } catch (error) {
        console.log('[IMAGE_GENERATION_ERROR',error);
        return new NextResponse("Internal Error", {status:500});
    }
}