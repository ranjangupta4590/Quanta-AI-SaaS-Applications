import {Crisp} from 'crisp-sdk-web';
import { useEffect } from 'react';

export const CrispChatBot =()=>{
    useEffect(()=>{
        Crisp.configure("df170256-10f1-4213-9bda-2eeb3d035109");
    },[])
    // console.log(process.env.CRISP_WEBSITE_ID)
    return null;
}