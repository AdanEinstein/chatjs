"use client";
import { useState, useEffect, Children } from "react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import useChat from "./hooks/useChat";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Notifications } from "react-push-notification";
import { Button } from "../ui/button";

export default function Chat() {
  const { messages, pending, handleKeyUp, form, sendMessage } = useChat();
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      setIsAtBottom(scrolled >= scrollableHeight - 50); // Ajuste o offset conforme necessário
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col gap-1 md:w-4/6 w-10/12">
      <h1 className="my-4 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">ChatJS</h1>
      <Separator className="my-3" />
      <h2 className="text-xl text-muted-foreground">Messages:</h2>
      {pending ? (
        <Spinner size="sm" className="bg-black dark:bg-white" />
      ) : (
        <ul className="flex flex-col gap-1">
          {Children.toArray(
            messages.map((msg) => (
              <li className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                <span className="text-red-500 me-2">
                  ({Intl.DateTimeFormat("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  }).format(new Date(msg.timestamp))})
                </span>
                <span className="text-emerald-500">{msg.user}</span>: {msg.message}
              </li>
            ))
          )}
        </ul>
      )}
      <Separator />
      <Form {...form}>
        {!isAtBottom && (
          <div className="fixed bottom-0 left-0 w-full shadow-md p-4">
            <FormField
              control={form.control}
              name="user"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User:</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message:</FormLabel>
                  <FormControl>
                    <Input {...field} onKeyUp={handleKeyUp(form.handleSubmit)} enterKeyHint="done" />
                  </FormControl>
                  <FormDescription className="md:block hidden">Pressione ENTER para enviar</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="block md:hidden bg-blue-500 text-white px-4 py-2 rounded mt-2 w-full"
              onClick={form.handleSubmit(sendMessage)}
            >
              Send
            </Button>
          </div>
        )}
      </Form>
      <Notifications />
    </div>
  );
}
