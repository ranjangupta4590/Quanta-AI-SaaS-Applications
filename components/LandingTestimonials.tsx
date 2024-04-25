"use client";

import { useUser } from "@clerk/nextjs";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarImage } from "./ui/avatar";

const testmonials = [
  {
    name: "John Doe",
    title: "CEO & Founder",
    avatar: "",
    company: "XYZ Corp",
    text: "Lorem ipsum dolor sit amet",
  },
  {
    name: "John Doe",
    title: "CEO & Founder",
    avatar: "",
    company: "XYZ Corp",
    text: "Lorem ipsum dolor sit amet",
  },
  {
    name: "John Doe",
    title: "CEO & Founder",
    avatar: "",
    company: "XYZ Corp",
    text: "Lorem ipsum dolor sit amet",
  },
  {
    name: "John Doe",
    title: "CEO & Founder",
    avatar: "",
    company: "XYZ Corp",
    text: "Lorem ipsum dolor sit amet",
  },
  {
    name: "John Doe",
    title: "CEO & Founder",
    avatar: "",
    company: "XYZ Corp",
    text: "Lorem ipsum dolor sit amet",
  },
  {
    name: "John Doe",
    title: "CEO & Founder",
    avatar: "",
    company: "XYZ Corp",
    text: "Lorem ipsum dolor sit amet",
  },
];
const LandingTestimonials = () => {
  const { user } = useUser();
  return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-4xl text-white font-semibold mb-10">
        Testimonials
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {testmonials.map((item, index) => (
          <Card key={index} className="bg-[#192339] border-none text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <div className="flex flex-row gap-3 ">
                  <div className="mt-1">
                    <Avatar>
                      <AvatarImage src={user ? user.imageUrl : "bot.jpg"} alt="User/img" />
                    </Avatar>
                  </div>
                  <div>
                    <p className="text-lg">{item.name}</p>
                    <p className="text-zinc-400 text-sm">{item.title} - {item.company}</p>
                    
                  </div>
                </div>
              </CardTitle>
              <CardContent className="pt-4 px-0">{item.text}</CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LandingTestimonials;
