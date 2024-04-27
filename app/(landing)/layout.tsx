import { PriceModalProvider } from "@/components/ui/PriceModal-provide";


const LandingLayout = ({children}: {children: React.ReactNode;}) => {
    
    return (
      <main className="h-full bg-[#111827] overflow-auto">
        <div className=" mx-auto px-6 h-full w-full">
        <PriceModalProvider/>
          {children}
        </div>
      </main>
     );
  }
   
  export default LandingLayout;