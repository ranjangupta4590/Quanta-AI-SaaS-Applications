"use client";

import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageSquare,ArrowUp } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { formSchema } from "./authorize";

const Chats = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div>
      <Heading
        title="Conversation"
        description="Start chatting with Quanta"
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />

<div className="px-4 lg:px-8 flex-grow h-full">
<div className="space-y-6"> Message Content</div>
        <div className="flex justify-center items-end h-full">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="
                rounded-lg 
                border-2
                w-full 
                p-2
                px-3 
                md:px-6 
                focus-within:shadow-sm
                flex flex-row
                gap-2
                justify-between
                h-full
              "
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl className="m-0 p-0">
                      <textarea
                        className="w-full justify-center border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent resize-none"
                        disabled={isLoading}
                        placeholder="Enter your prompt..."
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex justify-center"> 
              <Button
                className=" p-3 "
                type="submit"
                disabled={isLoading}
                size="icon"
              >
                {/* Generate */}
                <ArrowUp/>
              </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Chats;