"use client";

import Image from "next/image";
import Link from "next/link";

import { useAuth } from "@clerk/nextjs";
import { Button } from "./ui/button";

const LandingNavbar = () => {
  const { isSignedIn } = useAuth();
  return (
    <div className="fixed bg-[#111827]  p-4 flex items-center justify-between border-b border-white/10 w-full shadow-md z-10">
      <Link href="/" className="flex items-center">
        <div className="relative h-8 w-8 mr-4 mt-2">
          <span className="text-white font-bold ">LOGO</span>
        </div>
        <h1 className={`text-2xl font-bold text-white pl-2`}>Quanta AI</h1>
      </Link>
      <div className="flex items-center gap-x-2 mr-6">
        <Link href={isSignedIn ? "/dashboard" : "/login"}>
          <Button className="bg-blue-500 rounded-full  hover:bg-blue-700">
            Login
          </Button>
        </Link>
        <Link href={isSignedIn ? "/dashboard" : "/signup"}>
          <Button className="bg-white rounded-full" variant="outline">
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default LandingNavbar;
