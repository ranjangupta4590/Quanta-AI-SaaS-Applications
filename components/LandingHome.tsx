"use client";

import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import TypewriterComponent from "typewriter-effect";
import { Button } from "./ui/button";

const LandingHome = () => {
  const { isSignedIn } = useAuth();

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
      <div className="space-y-10 py-20">
        <Link href="#pricing">
          <Button className=" mr-4 md:text-lg p-4 md:p-6 bg-blue-500 hover:bg-blue-700 rounded-md font-semibold">
            View Pricing
          </Button>
        </Link>
        <Link href="/signup">
          <Button
            variant="premium"
            className="md:text-lg p-4 md:p-6 rounded-md font-semibold"
          >
            Buy Plus
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default LandingHome;
