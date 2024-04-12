"use client"
import { UserButton } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";



const Navbar = () => {

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  
  
  return (
    <div className="w-full fixed flex bg-white justify-between md:pr-80 items-center p-3 border-b-2 shadow-lg z-30">
      <div>
        <Sheet>
          <SheetTrigger>
            <Button variant="ghost" size="icon" className="md:hidden">
              {" "}
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <Sidebar />
          </SheetContent>
        </Sheet>
      </div>
      <div className="flex  justify-center font-bold text-xl">
        {" "}
        <span>Work Space</span>
      </div>
      <div className="justify-end">
        {" "}
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
 
  );
};

export default Navbar;
