import { LucideIcon } from "lucide-react";

interface HeadingProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor?: string;
  bgColor?: string;
}
const Heading = ({
  title,
  description,
  icon: LucideIcon,
  iconColor,
  bgColor,
}: HeadingProps) => {

  return (
    <>
      <div className="px-4 my-4 lg:px-8 flex items-center gap-x-3 mb-8">
        <div className={`p-2 w-fit rounded-md ${bgColor}`}>
          <LucideIcon className={`w-8 h-8 ${iconColor}`} />
        </div>
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </>
  );
};

export default Heading;
