"use client";
import {
  Code,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  Music,
  Settings,
  VideoIcon,
  Zap,
  Sparkles  
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Progress } from "@/components/ui/progress";

import MAX_FREE_LIMIT from "@/lib/apiLimit";
import { Button } from "./ui/button";
import { useProModal } from "@/hooks/proModal";

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/chats",
    color: "text-violet-500",
  },
  {
    label: "Code Generation",
    icon: Code,
    color: "text-green-700",
    href: "/code",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    color: "text-pink-700",
    href: "/image",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    color: "text-orange-700",
    href: "/video",
  },
  // {
  //   label: 'Music Generation',
  //   icon: Music,
  //   color: "text-emerald-500",
  //   href: '/music',
  // },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

interface SidebarProps {
  apiLimitCount: number;
  isPro:boolean;
}

const Sidebar = ({ apiLimitCount = 0 ,isPro=false}: SidebarProps) => {
  const activePath = usePathname();
  const proModal=useProModal();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  
  if(isPro)return null;

  return (
  <>
    <div className="space-y-4 py-4 flex flex-col h-full bg-gray-900 text-white">
      <div className="px-3 py-2 flex-1 h-full">
        <Link href="/dashboard" className="flex items-center pl-3 mb-8">
          <div className="relative flex  w-8 h-5 mr-4">LOGO</div>
          <h1 className="font-bold pl-3 text-2xl">Quanta</h1>
        </Link>

        <div className="space-y-1">
          {routes.map((item) => (
            <Link
              href={item.href}
              key={item.href}
              className={`flex group p-3 w-full cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition ${
                activePath === item.href
                  ? "text-white bg-white/10"
                  : "text-zinc-400"
              } `}
            >
              <div className="flex items-center flex-1">
                <item.icon className={`${item.color} mx-4`} />
                {item.label}
              </div>
            </Link>
          ))}
        </div>
        
        <div className="absolute bottom-4 left-3 right-3 ">
        <Card className="bg-white/10 border-0">
          <CardContent className="py-6">
            <div className="text-center text-sm text-white mb-4 space-y-2">
              <p>
                {apiLimitCount}/{MAX_FREE_LIMIT} <span className="pl-2">Free Limits</span>
              </p>
              <Progress
                className="h-3"
                value={(apiLimitCount / MAX_FREE_LIMIT) * 100}
              />
            </div>
            <Button onClick={proModal.onOpen} className="w-full" variant="premium">
            Upgrade to Plus
              <Sparkles   className="w-4 h-4 ml-2 fill-white" />
              {/* <Zap className="w-4 h-4 ml-2 fill-white" /> */}
            </Button>
          </CardContent>
        </Card>
      </div>
      </div>

    </div>
      
    </>
  );
};

export default Sidebar;
