import Heading from "@/components/Heading";
import { SubscriptionButton } from "@/components/subscription-button";
import { checkSubscription } from "@/lib/proSubscription";
import { Settings } from "lucide-react";

const SettingPage = async () => {
  const isPro = await checkSubscription();
  return (
    <>
      <div className="flex flex-col h-screen">
        <div className="flex-grow overflow-y-auto mt-14 mb-34 space-y-8">
          <Heading
            title="Settings"
            description="Manage account settings and privacy options."
            icon={Settings}
            iconColor="text-gray-700"
            bgColor="bg-gray-700/10"
          />
          <div className="px-4 lg:px-8 space-y-4">
            <div className="text-muted-foreground text-sm">
              {isPro
                ? "You are currently using Quanta Plus"
                : "You are currently on free plan!"}
            </div>
            <SubscriptionButton isPro={isPro}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingPage;
