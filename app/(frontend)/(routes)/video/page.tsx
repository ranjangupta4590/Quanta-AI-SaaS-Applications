"use client";

import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUp, Video } from "lucide-react";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { formSchema } from "./authorize";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const VideoPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const [video, setVideo] = useState<string[]>([]);
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const userAvatar = () => {
    return (
      <div className="h-5 w-5 flex">
        <Avatar className="h-8 w-8">
          <AvatarImage src={user?.imageUrl} alt="User/img" />
        </Avatar>
      </div>
    );
  };

  const botAvatar = () => {
    return (
      <div className="h-5 w-5 flex">
        <Avatar className="h-8 w-8">
          <AvatarImage src="bot.jpg" alt="Bot/img" />
        </Avatar>
      </div>
    );
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setVideo([]);

      const response = await axios.post("/api/video", values);
      const image_url = response.data.map(
        (image: { url: string }) => image.url
      );

      setVideo([response.data[0]]);

      form.reset();
    } catch (error) {
      console.error(error);
    } finally {
      router.refresh();
    }
  };

  return (
    <>
      <div className="flex flex-col h-screen">
        <div className="flex-grow overflow-y-auto mt-14 mb-34  z-20">
          <Heading
            title="Video Generation"
            description="Generate Video with Quanta AI"
            icon={Video}
            iconColor="text-orange-700"
            bgColor="bg-orange-700/10"
          />

          <div className="mt-4 px-4 lg:px-8 ">
            <video
              className="w-full mt-8 lg:mb-32  rounded-lg border-black"
              controls
              autoPlay
            >
              {/* <source src={video}/> */}
            </video>
          </div>
        </div>
        <div className="fixed bottom-0 bg-white w-full flex justify-center  items-end md:pr-80  p-4 z-20">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="
                bg-gray-300
                  rounded-lg 
                  border-2
                  border-gray-500
                  w-full 
                  p-2
                  px-3 
                  md:px-6 
                  focus-within:shadow-sm
                  flex flex-row
                  gap-2
                  justify-between
                  h-full
                  z-10
                "
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl className="m-0 p-0">
                      <textarea
                        className="w-full justify-center bg-gray-300 border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent resize-none"
                        disabled={isLoading}
                        placeholder="Enter your prompt..."
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className=" flex justify-center">
                <Button
                  className=" p-3 "
                  type="submit"
                  disabled={isLoading}
                  size="icon"
                >
                  {/* Generate */}
                  <ArrowUp />
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default VideoPage;
