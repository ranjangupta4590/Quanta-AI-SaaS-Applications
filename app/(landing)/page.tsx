import LandingHome from "@/components/LandingHome";
import LandingNavbar from "@/components/LandingNavbar";
import LandingTestimonials from "@/components/LandingTestimonials";
import Link from "next/link";
import { SocialIcon } from "react-social-icons";

export default function Landing() {
  return (
    <>
      <div className="h-full">
        <LandingNavbar />
        <LandingHome />
        <LandingTestimonials />
      </div>
      <div className="w-full left-0 right-0 bottom-0 justify-center mx-auto">
        <hr className="w-full h-px" />
        <div className="flex  flex-wrap mx-auto items-center justify-center md:justify-between">
          <div className="p-3">
            <Link href="/" className="flex items-center">
              <div className="relative h-5 w-5 mr-5">
                <span className="text-white font-bold ">LOGO</span>
              </div>
              <h1 className="xsm:hidden text-xl font-bold text-white pl-2">
                Quanta AI
              </h1>
            </Link>
          </div>
          <div className="flex my-auto justify-center text-white mx-auto px-auto">
            <p className="text-xs md:text-sm">All Rights Reserved, Developed by Gupta Developer</p>
          </div>

          <div className="flex gap-2 p-3 mr-10">
            <SocialIcon
              url="www.pinterest.com"
              style={{ height: 40, width: 40 }}
            />
            <SocialIcon
              url="www.linkedin.com"
              style={{ height: 40, width: 40 }}
            />
            <SocialIcon
              url="www.instagram.com"
              style={{ height: 40, width: 40 }}
            />
            <SocialIcon
              url="www.facebook.com"
              style={{ height: 40, width: 40 }}
            />
          </div>
        </div>
        <p></p>
      </div>
    </>
  );
}
