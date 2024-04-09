"use client";

// import Heading from "@/components/Heading";
// import { Button } from "@/components/ui/button";
// import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { MessageSquare, ArrowUp } from "lucide-react";

// import { useForm } from "react-hook-form";
// import * as z from "zod";
// import { formSchema } from "./authorize";
// import { useRouter } from "next/navigation";
// import { useState } from "react";

// // import ChatCompletionRequestMessage  from "openai";
// // import { ChatCompletionMessageParam } from "openai/resources/chat/completions";
// import axios from "axios";
// import { useUser } from "@clerk/nextjs";
// import { Avatar, AvatarImage } from "@/components/ui/avatar";

// const Chats = () => {
//   const router = useRouter();
//   const { user } = useUser();
//   const [messages, setMessages] = useState<any[]>([]);

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       prompt: "",
//     },
//   });

//   const isLoading = form.formState.isSubmitting;

//   const userAvatar = () => {
//     return (
//       <div className="h-8 w-8">
//         <Avatar>
//           <AvatarImage src={user?.imageUrl} alt="User/img" />
//         </Avatar>
//         {/* console.log(user) */}
//       </div>
//     );
//   };

//   const botAvatar = () => {
//     return (
//       <div className="h-8 w-8">
//         <Avatar>
//           <AvatarImage src={user?.imageUrl} alt="User/img" />
//         </Avatar>
//       </div>
//     );
//   };

//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//     try {
//       const response = await axios.post("/api/chats", {
//         prompt: values.prompt,
//       });

//       const botReply = response.data;

//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { role: "user", content: values.prompt },
//         botReply,
//       ]);
//       form.reset();
//     } catch (error) {
//       console.error(error);
//     } finally {
//       router.refresh();
//     }
//   };

//   return (
//     <div>
//       <Heading
//         title="Conversation"
//         description="Start chatting with Quanta"
//         icon={MessageSquare}
//         iconColor="text-violet-500"
//         bgColor="bg-violet-500/10"
//       />

//       <div className="px-4 lg:px-8 flex-grow h-full">
//         <div className="flex justify-center items-end h-full">
//           <Form {...form}>
//             <form
//               onSubmit={form.handleSubmit(onSubmit)}
//               className="
//                 rounded-lg
//                 border-2
//                 w-full
//                 p-2
//                 px-3
//                 md:px-6
//                 focus-within:shadow-sm
//                 flex flex-row
//                 gap-2
//                 justify-between
//                 h-full
//               "
//             >
//               <FormField
//                 name="prompt"
//                 render={({ field }) => (
//                   <FormItem className="w-full">
//                     <FormControl className="m-0 p-0">
//                       <textarea
//                         className="w-full justify-center border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent resize-none"
//                         disabled={isLoading}
//                         placeholder="Enter your prompt..."
//                         {...field}
//                       />
//                     </FormControl>
//                   </FormItem>
//                 )}
//               />
//               <div className="flex justify-center">
//                 <Button
//                   className=" p-3 "
//                   type="submit"
//                   disabled={isLoading}
//                   size="icon"
//                 >
//                   {/* Generate */}
//                   <ArrowUp />
//                 </Button>
//               </div>
//             </form>
//           </Form>
//         </div>

//         <div className="space-y-6 mt-4">
//         {isLoading && (
//             <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
//               Loading...
//             </div>
//           )}
//           {messages.length === 0 && !isLoading && (
//             // <Empty label="No conversation started." />
//             <p>No Prompt  yet...</p>
//           )}
//           <div className="flex flex-col-reverse gap-y-4">
//             {messages.map((message, index) => (
//               <div
//                 key={index}
//                 className={`p-8 w-full flex items-start gap-x-8 rounded-lg",
//                   ${
//                     message.role === "user"
//                       ? "bg-white border border-black/10"
//                       : "bg-muted"
//                   }`}
//               >
//                 {message.role === "user" ? userAvatar() : botAvatar()}
//                 <p className="text-sm">{message.content}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chats;

import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageSquare, ArrowUp } from "lucide-react";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { formSchema } from "./authorize";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const Chats = () => {
  const router = useRouter();
  const { user } = useUser();
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
      <div className="h-7 w-7">
        <Avatar>
          <AvatarImage src={user?.imageUrl} alt="User/img" />
        </Avatar>
      </div>
    );
  };

  const botAvatar = () => {
    return (
      <div className="h-8 w-8">
        <Avatar>
          <AvatarImage src='bot.jpg' alt="Bot/img" />
        </Avatar>
      </div>
    );
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/chats", {
        prompt: values.prompt,
      });

      const botReply = response.data;

      setMessages((prevMessages) => [
        botReply ,
        { role: "user", content: values.prompt },
        ...prevMessages,
      ]);
      form.reset();
    } catch (error) {
      console.error(error);
    } finally {
      router.refresh();
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow overflow-y-auto mt-14">
        <Heading
          title="Conversation"
          description="Start chatting with Quanta"
          icon={MessageSquare}
          iconColor="text-violet-500"
          bgColor="bg-violet-500/10"
        />

        <div className="space-y-6 mt-4 px-4 lg:px-8">
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`p-8 w-full flex items-start gap-x-8 rounded-lg ${
                  message.role === "user"
                    ? "bg-white border border-black/10"
                    : "bg-muted"
                }`}
              >
                {message.role === "user" ? userAvatar() : botAvatar()}
                <p className="text-sm">{message.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0  w-full flex justify-center  items-end md:pr-80  p-4">
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
  );
};

export default Chats;
