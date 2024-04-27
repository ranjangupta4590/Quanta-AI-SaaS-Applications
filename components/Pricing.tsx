"use client";

import { usePricingModal } from "@/hooks/proModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import axios from "axios";
import { useState } from "react";
import Loading, { Loader } from "./ui/Loading";
import { Sparkles, Check, X } from "lucide-react";

const plans = [
  {
    title: "Basic",
    price: "Free",
    visits: "10 Free trials",
    features: [
      "Access to Chatbots",
      "Access to Code Generator",
      "Access to Image Generator",
    ],
    notAllow: "Access to Video Generation",
    buttonText: "Start Trial",
    btnColor: "bg-blue-500 hover:bg-blue-700",
  },
  {
    title: "Startup",
    price: "$19/mo",
    visits: "Everything in Free",
    features: [
      //   "20,000 tokens",
      "Unlimited Chat Generations",
      "Unlimited Code Generations",
      "Unlimited Image Generations",
      "Unlimited Video Generations",
    ],
    buttonText: "Use Plus",
    btnColor: "premium",
  },
  {
    title: "Premium",
    price: "$49/mo",
    visits: "Everything in Startup",
    features: [
      "Access to our most capable model generation.",
      "Unlimited Browse, create, and use Quanta",
      "Browsing, Advanced Data Analysis and more",
    ],
    buttonText: "Upgarde",
    btnColor: "premium",
  },
  {
    title: "Annual",
    price: "$399/year",
    visits: "Everything in Premium",
    features: [
      "Access to our most capable model generation.",
      "Unlimited Browse, create, and use Quanta",
      "Browsing, Advanced Data Analysis and more",
    ],
    buttonText: "Sign Up",
    btnColor: "bg-blue-500 hover:bg-blue-700",
  },
];

const PricingPage = () => {
  const priceModal = usePricingModal();
  const [loading, setLoading] = useState(false);

  const onSubscribe = async () => {
    try {
      setLoading(true);
      const response = axios.get("/api/stripe");
      window.location.href = (await response).data.url;
    } catch (error) {
      console.log(error, "STRIPE_CLIENT_ERROR");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={priceModal.isOpen} onOpenChange={priceModal.onClose}>
      <DialogContent className="bg-[#111827] border-white max-h-[80vh] justify-center pb-4 overflow-y-auto md:max-w-2xl lg:max-w-6xl">
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center flex-col text-white font-semibold pb-2 mb-4">
            Pricing for Quanta Plus !
          </DialogTitle>

          <DialogDescription className="">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
              {plans.map((plan, index) => (
                <div
                  key={index}
                  className=" border-2 rounded-md border-purple-600 min-h-[200px] p-3 text-center transition-all duration-200 hover:bg-purple-700 hover:bg-gradient-to-r hover:border-t-2 hover:border-b-2 hover:from-yellow-400 hover:to-red-500 hover:transform hover:text-white hover:scale-105 hover:z-10"
                >
                  <div className="flex-grow">
                    <h2 className="flex justify-center gap-2 text-xl font-bold text-pink-600 border-2 rounded-md border-slate-600 p-2 mb-2"><Sparkles className="fill-pink-600"/>{plan.title}</h2>
                    <h3 className="text-2xl tracking-wide">
                      <sup className="text-sm">$</sup>
                      {plan.price}
                      {/* <span className="text-xs">/mo</span> */}
                    </h3>
                    <p className="text-base">{plan.visits}</p>
                    <div className="flex justify-center items-center">
                      <ul className="text-sm text-zinc-400 hover:text-white mt-4 items-center justify-center">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="mb-3 flex font-semibold ">
                            <Check className="text-green-600 mr-1 " />
                            {feature}
                          </li>
                        ))}
                        {plan.notAllow && (
                          <li className="mb-3 flex font-semibold">
                            <X className="text-red-500 mr-1 " />
                            {plan.notAllow}
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                  <Button
                    disabled={loading}
                    className={`${plan.btnColor} flex justify-center mx-auto text-white`}
                    onClick={onSubscribe}
                    variant="premium"
                  >
                    {loading ? <Loading /> : plan.buttonText}
                  </Button>
                </div>
              ))}
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default PricingPage;
