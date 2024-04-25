"use client";

import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowDownToLine, ArrowUp, ImageIcon } from "lucide-react";

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
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { useProModal } from "@/hooks/proModal";

const ImagePage = () => {
  const router = useRouter();
  const { user } = useUser();
  const proModal = useProModal();
  
  const [images, setImages] = useState<string[]>([]);
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

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
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      }
      console.error(error);
    } finally {
      router.refresh();
    }
  };

  const downloadImage = async (url:string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'image.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };
  

  return (
    <>
      <div className="flex flex-col h-screen">
        <div className="flex-grow overflow-y-auto mt-14 mb-34 space-y-8">
          <Heading
            title="Image Generation"
            description="Generate images with Quanta"
            icon={ImageIcon}
            iconColor="text-pink-700"
            bgColor="bg-pink-700/10"
          />

          <div className="space-y-6 mt-4 px-4 lg:px-8 relative z-10 mb-24">
            <div className="flex flex-col-reverse gap-y-4 mb-32">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8 mx-8">
            
                {images.map((src) => (
                  <Card 
                    key={src} 
                    className={`rounded-lg overflow-hidden z-0 relative aspect-square ${hoveredImage === src ? 'opacity-80' : 'opacity-100'}`}
                    onMouseEnter={() => setHoveredImage(src)}
                    onMouseLeave={() => setHoveredImage(null)}
                  >
                    {hoveredImage === src && (
                      <div className="absolute inset-0 flex justify-center items-center z-10 m-4">
                        <button
                          onClick={() => downloadImage(src)}
                          className="border-1 flex rounded-md bg-pink-600 text-white p-2"
                        >
                          <span>Download</span><ArrowDownToLine  />
                        </button>
                      </div>
                    )}
                    <Image alt="Image" src={src} fill />
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 bg-white  w-full flex justify-center  items-end md:pr-80 p-4 z-20 ">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="
              bg-gray-300
                rounded-lg 
                border-2
                border-gray-500
                w-full 
                mr-16
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
                  <FormItem className="w-full h-9">
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
              <div className=" grid grid-cols-1 sm:grid-cols-3 gap-2 ">
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
                  
                  {isLoading?<span className="text-white">...Loading</span>:<span className="text-white">Generate</span>}
                  {/* <ArrowUp /> */}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ImagePage;
