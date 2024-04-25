import LandingHome from "@/components/LandingHome";
import LandingNavbar from "@/components/LandingNavbar";
import LandingTestimonials from "@/components/LandingTestimonials";


export default function Landing() {
  return (
  <>
    <div className="h-full">
      <LandingNavbar/>
      <LandingHome/>
      <LandingTestimonials/>
    </div>
   </>
  );
}
