"use client";

import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Code, ArrowUp, ClipboardList } from "lucide-react";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { formSchema } from "./authorize";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import ReactMarkdown from "react-markdown";
import Loading from "@/components/ui/Loading";
import { useProModal } from "@/hooks/proModal";

const CodePage = () => {
  const router = useRouter();
  const { user } = useUser();
  const proModal = useProModal();
  
  const [copied, setCopied] = useState("Copy");
  const [messages, setMessages] = useState<any[]>([]);

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
      const response = await axios.post("/api/code", {
        prompt: values.prompt,
      });

      const botReply = response.data;

      setMessages((prevMessages) => [
        botReply,
        { role: "user", content: values.prompt },
        ...prevMessages,
      ]);
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

  return (
    <>
      <div className="flex flex-col h-screen">
        <div className="flex-grow overflow-y-auto mt-14">
          <Heading
            title="Code Generation"
            description="Start Coding with Quanta"
            icon={Code}
            iconColor="text-green-500"
            bgColor="bg-green-700/10"
          />

          <div className="space-y-6 mt-4 px-4 lg:px-8 relative z-10">
            <div className="flex flex-col-reverse gap-y-4 mb-32">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`p-6 w-full flex items-start gap-x-8 flex-col gap-y-3 rounded-lg ${
                    message.role === "user"
                      ? "bg-white border border-black/10"
                      : "bg-muted"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {message.role === "user" ? userAvatar() : botAvatar()}
                    <span className="text-md font-bold ml-2 mt-2">
                      {message.role === "user" ? "You" : "Quanta"}
                    </span>
                  </div>
                  {/* {message.role === "user" ? userAvatar() : botAvatar()} */}
                  <div className="flex flex-col w-full relative ">
                    {/* <span className="text-md font-bold pt-1">
                    {message.role === "user" ? "You" : "Quanta"}
                  </span> */}
                    <ReactMarkdown
                      components={{
                        pre: ({ node, ...props }) => (
                          <div className="relative overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg z-0">
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(
                                  props.children.props.children.toString()
                                );
                                setCopied("Copied!");
                                setTimeout(() => setCopied("Copy"), 500);
                              }}
                              className="absolute flex  top-2 right-2 bg-gray-400 hover:bg-gray-400 text-gray-800 px-2 py-1/2 gap-1 rounded"
                            >
                              <ClipboardList className="h-4 w-4 mt-1" />
                              {copied}
                            </button>
                            <pre {...props} />
                          </div>
                        ),
                        code: ({ node, ...props }) => (
                          <code
                            className="bg-black/10 rounded-lg p-1"
                            {...props}
                          />
                        ),
                      }}
                      className="text-sm overflow-hidden leading-7"
                    >
                      {message.content || ""}
                    </ReactMarkdown>
                    {/* <p className="text-sm">{message.content}</p> */}
                  </div>
                </div>
              ))}
            </div>
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
                {isLoading?<Loading/>:<ArrowUp />}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default CodePage;
