import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { getApiLimitCount } from "@/lib/apiLimit";
import { checkSubscription } from "@/lib/proSubscription";

const DashboardLayout =async ({children}: {children: React.ReactNode}) => {
    
    const apiLimitCount= await getApiLimitCount();
    const isPro=await checkSubscription();
    
    return (
      <div className="h-full relative">
        <div className="hidden bg-gray-900 h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80]">
          
          <div><Sidebar isPro={isPro} apiLimitCount={apiLimitCount} /></div>
        </div>
        
        <main className="md:pl-72">
        <Navbar/>
        {children}
        </main>
      </div>
     );
  }
   
  export default DashboardLayout;