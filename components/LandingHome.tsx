"use client";

import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import TypewriterComponent from "typewriter-effect";
import { Button } from "./ui/button";
import { Zap } from "lucide-react";
import { usePricingModal,  } from "@/hooks/proModal";
import Image from "next/image";

const LandingHome = () => {
  const { isSignedIn } = useAuth();
  const priceModal = usePricingModal();

  return (
    <div className="text-white font-bold py-36 text-center space-y-6">
      <div className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl space-y-5 font-extrabold">
        <h1>The Best AI Tool for</h1>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          <TypewriterComponent
            options={{
              strings: [
                "Chatbot...",
                "Code Generation...",
                "Image Generation...",
                "Video Generation...",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>

      <div className="py-5">
        <Link href={isSignedIn ? "/dashboard" : "/signup"}>
          <Button
            variant="premium"
            className="md:text-lg p-4 md:p-6 rounded-full font-semibold"
          >
            Start Generating for Free
          </Button>
        </Link>
      </div>
      <div className="text-sm md:text-xl font-semibold text-zinc-400">
        Create content using Qunata AI 10x faster and with more accuracy.
      </div>
      <div className="space-y-10 py-10">
      
        {/* <Link href="#pricing"> */}
          <Button
            onClick={priceModal.onOpen}
            className=" mr-4 md:text-lg p-4 md:p-6 bg-blue-500 hover:bg-blue-700 rounded-md font-semibold"
          >
            View Pricing
          </Button>
        {/* </Link> */}
        
        <Link href="/signup">
          <Button
            variant="premium"
            className="md:text-lg p-4 md:p-6 rounded-md font-semibold"
          >
            Buy Plus <Zap className="w-4 h-6 ml-1 fill-white" />
          </Button>
        </Link>
      </div>
      
      <div className="flex w-full justify-center">
        <Image src='/features.svg' alt="feature/svg" width='800' height='500'/>
      </div>
    </div>
  );
};

export default LandingHome;
