"use client";;
import { Children } from "react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import useChat from "./hooks/useChat";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Notifications } from "react-push-notification";
import { Button } from "../ui/button";

export default function Chat() {
  const { messages, pending, handleKeyUp, form, sendMessage } = useChat()

  return (
    <div className="flex flex-col gap-1 w-4/6">
      <h1 className="my-4 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">ChatJS</h1>
      <Separator />
      <Form {...form}>
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
          className="block md:hidden bg-blue-500 text-white px-4 py-2 rounded mt-2"
          onClick={form.handleSubmit(sendMessage)}
        >
          Send
        </Button>
      </Form>

      <Separator className="my-3" />
      <h2 className="text-xl text-muted-foreground">Messages:</h2>
      {pending ? (
        <Spinner size="sm" className="bg-black dark:bg-white" />
      ) : (
        <ul className="flex flex-col gap-1">
          {Children.toArray(messages.map((msg) => (
            <li className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
              <span className="text-red-500 me-2">
                ({Intl.DateTimeFormat("pt-BR", {
                  hour: "2-digit",
                  minute: "2-digit",
                }).format(new Date(msg.timestamp))})
              </span>
              <span className="text-emerald-500">{msg.user}</span>:
              {msg.message}
            </li>
          )))}
        </ul>
      )}
      <Notifications />
    </div>
  )
}