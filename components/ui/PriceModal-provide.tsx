"use client"

import { useEffect,useState } from "react";
import PricingPage from "../Pricing";

export const PriceModalProvider =()=>{

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setIsMounted(true);
    }, []);
  
    if (!isMounted) {
      return null;
    }
    
    
    return (
        <>  
            <PricingPage/>
        </>
    )
}