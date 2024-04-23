"use client";

import { useProModal } from "@/hooks/proModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./dialog";
import {
  Code,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  Music,
  VideoIcon,
  Sparkles,
  Check,
} from "lucide-react";
import { Card } from "./card";
import { Button } from "./button";
import axios from "axios";
import { useState } from "react";
import { Loader } from "./Loading";

const tools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    label: "Code Generation",
    icon: Code,
    color: "text-green-700",
    bgColor: "bg-green-700/10",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    color: "text-orange-700",
    bgColor: "bg-orange-700/10",
  },
  // {
  //   label: "Music Generation",
  //   icon: Music,
  //   color: "text-emerald-500",
  //   bgColor: "bg-emerald-500/10",
  // },
];
const ProModal = () => {
  const proModal = useProModal();
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
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
            Upgrade to Quanta Plus !
          </DialogTitle>
          {/* <DialogDescription>
              {tools.map((item, index) => (
                <Card
                  key={index}
                  className="p-3  border-black/5 flex items-center justify-between m-2"
                >
                  <div className="flex items-center gap-x-4">
                    <div className={`${item.bgColor} p-2 w-fit rounded-md`}>
                      <item.icon className={`${item.color} w-6 h-6 `} />
                    </div>
                    <div className="font-semibold text-sm">{item.label}</div>
                  </div>
                  <Check className="w-5 h-5 text-primary" />
                </Card>
              ))}
            </DialogDescription> */}

          <DialogDescription >
            {loading ? (
               <div className="flex justify-center items-center h-48">
               <Loader />
             </div>
            ) : (
              tools.map((item, index) => (
                <Card
                  key={index}
                  className="p-3  border-black/5 flex items-center justify-between m-2"
                >
                  <div className="flex items-center gap-x-4">
                    <div className={`${item.bgColor} p-2 w-fit rounded-md`}>
                      <item.icon className={`${item.color} w-6 h-6 `} />
                    </div>
                    <div className="font-semibold text-sm">{item.label}</div>
                  </div>
                  <Check className="w-5 h-5 text-primary" />
                </Card>
              ))
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={onSubscribe}
            className="w-full hover:opacity-40"
            variant="premium"
          >
            Upgrade to Plus
            <Sparkles className="w-4 h-4 ml-2 fill-white" />
            {/* <Zap className="w-4 h-4 ml-2 fill-white" /> */}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProModal;
