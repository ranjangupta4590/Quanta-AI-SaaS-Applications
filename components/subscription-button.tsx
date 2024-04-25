"use client";

import { Zap } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";
import { useState } from "react";
import Loading from "./ui/Loading";

interface SubscriptionButtonProps {
  isPro: boolean;
}

export const SubscriptionButton = ({
  isPro = false,
}: SubscriptionButtonProps) => {
  const [loading, setLoading] = useState(false);

  const isPlus = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");

      window.location.href = response.data.url;
    } catch (error) {
      setLoading(false);
      console.log("BILLING_ERROR", error);
    }
  };
  return (
    <Button
      disabled={loading}
      variant={isPro ? "default" : "premium"}
      onClick={isPlus}
      className="p-3"
    >
      {loading ? (
      <div className="flex items-center justify-center">
        <Loading />
      </div>
      ) : (
        <>
          {isPro ? "Manage Subscription" : "Upgrade to Plus"}
          {!isPro && <Zap className="w-4 h-5 ml-2 fill-white" />}
        </>
      )}
    </Button>
  );
};
