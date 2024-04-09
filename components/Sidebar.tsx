"use client";
import { Code, ImageIcon, LayoutDashboard, MessageSquare, Music, Settings, VideoIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const routes = [
    {
        label: 'Dashboard',
        icon: LayoutDashboard,
        href: '/dashboard',
        color: "text-sky-500"
      },
      {
        label: 'Conversation',
        icon: MessageSquare,
        href: '/chats',
        color: "text-violet-500",
      },
      {
        label: 'Code Generation',
        icon: Code,
        color: "text-green-700",
        href: '/code',
      },
      {
        label: 'Image Generation',
        icon: ImageIcon,
        color: "text-pink-700",
        href: '/image',
      },
      {
        label: 'Video Generation',
        icon: VideoIcon,
        color: "text-orange-700",
        href: '/video',
      },
      // {
      //   label: 'Music Generation',
      //   icon: Music,
      //   color: "text-emerald-500",
      //   href: '/music',
      // }, 
      {
        label: 'Settings',
        icon: Settings,
        href: '/settings',
      },
];

const Sidebar = () => {
    const activePath = usePathname();
    
  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-gray-900 text-white">
      <div className="px-3 py-2 flex-1">
      
        <Link href="/dashboard" className="flex items-center pl-3 mb-8">
          <div className="relative flex  w-8 h-5 mr-4">LOGO</div>
          <h1 className="font-bold pl-3 text-2xl">Quanta</h1>
        </Link>
        
        <div className="space-y-1/2">
          {routes.map((item) => (
            <Link href={item.href} key={item.href} className={`flex group p-3 w-full cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition ${activePath===item.href ? "text-white bg-white/10" : "text-zinc-400"} `}>
              <div className="flex items-center flex-1">
                <item.icon className={`${item.color} mx-4`} />
                {item.label}
              </div>
            </Link>
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default Sidebar;
