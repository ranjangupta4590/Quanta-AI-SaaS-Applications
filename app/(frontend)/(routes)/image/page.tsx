"use client";

import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUp, ImageIcon } from "lucide-react";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { amountOptions, formSchema, resolutionOptions } from "./authorize";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ImagePage = () => {
  const router = useRouter();
  const { user } = useUser();
  const [images, setImages] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "512x512",
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
      setImages([]);

      const response = await axios.post("/api/image", values);
      const image_url = response.data.map(
        (image: { url: string }) => image.url
      );

      setImages(image_url);

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
        <div className="flex-grow overflow-y-auto mt-14">
          <Heading
            title="Image Generation"
            description="Generate images with Quanta"
            icon={ImageIcon}
            iconColor="text-pink-700"
            bgColor="bg-pink-700/10"
          />

          <div className="space-y-6 mt-4 px-4 lg:px-8 relative z-10">
            <div className="flex flex-col-reverse gap-y-4 mb-32">images</div>
          </div>
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
                flex flex-col
                gap-2
                justify-between
                h-full
                z-10
                md:flex-col
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
            {/* <div className=" md:flex space-y-2 md:justify-end "> */}
            <div className=" grid grid-cols-1 md:grid-cols-3 gap-2 ">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="">
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {amountOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="resolution"
                render={({ field }) => (
                  <FormItem className="">
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {resolutionOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <Button
                className=" p-3 justify-center w-full "
                type="submit"
                disabled={isLoading}
                size="icon"
              >
                Generate
                {/* <ArrowUp /> */}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default ImagePage;
