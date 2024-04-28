"use client";
import { useRouter } from "next/navigation";
import { Code, ImageIcon, MessageSquare, Music, VideoIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";

import { Card } from "@/components/ui/card";
const MAX_FREE_COUNTS = 5;

const tools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/chats",
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    label: "Code Generation",
    icon: Code,
    color: "text-green-700",
    bgColor: "bg-green-700/10",
    href: "/code",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    href: "/image",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    color: "text-orange-700",
    bgColor: "bg-orange-700/10",
    href: "/video",
  },
  // {
  //   label: "Music Generation",
  //   icon: Music,
  //   href: "/music",
  //   color: "text-emerald-500",
  //   bgColor: "bg-emerald-500/10",
  // },
 
];

const DashboardPage = () => {
  const router = useRouter();

  return (
    <div className="">
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl pt-24 pb-8 md:text-4xl font-bold text-center">
          Explore the power of Quanta AI
        </h2>
        
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {tools.map((tool) => (
          <Card
            onClick={() => router.push(tool.href)}
            key={tool.href}
            className="p-4 border-zinc-600 flex items-center justify-between hover:shadow-md transition cursor-pointer"
          >
            <div className="flex items-center gap-x-4">
              <div className={`p-2 w-fit rounded-md ${tool.bgColor}`}>
                <tool.icon className={`w-8 h-8 ${tool.color}`} />
              </div>
              <div className="font-semibold">{tool.label}</div>
            </div>
            <ArrowRight className="w-5 h-5" />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
