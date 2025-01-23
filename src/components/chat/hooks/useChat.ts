import { Message } from "@/types/globals";
import { KeyboardEvent, useEffect, useRef, useState, useTransition } from "react";
import { schema, SchemaType } from "../types";
import { useForm, UseFormHandleSubmit } from "react-hook-form";
import addNotification from 'react-push-notification';
import { zodResolver } from "@hookform/resolvers/zod";


export default function useChat() {
  const eventSourceRef = useRef<EventSource>(null);
  const [messages, setMessages] = useState<Message[]>([])
  const [pending, startTransition] = useTransition()
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema)
  })

  useEffect(() => {
    if (!eventSourceRef?.current)
      eventSourceRef.current = new EventSource("/api/events")
    eventSourceRef.current.onmessage = (event) => {
      const parsedMessage = JSON.parse(event.data) as Message;
      setMessages((prev) => [...prev, parsedMessage]);
      if (parsedMessage.user != form.getValues('user'))
        addNotification({
          title: 'New Message',
          message: `${parsedMessage.user}: ${parsedMessage.message}`,
          native: true
        })
    };
    return () => eventSourceRef?.current?.close();
  }, [setMessages, form])

  function sendMessage(data: SchemaType) {
    startTransition(async () => {
      await fetch("/api/events", { method: "POST", body: JSON.stringify(data) })
      form.setValue("message", "")
      form.setFocus("message")
    })
  }

  function handleKeyUp(callback: UseFormHandleSubmit<SchemaType>) {
    return (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.code != 'Enter' || event.keyCode !== 13) return
      callback(sendMessage)(event)
    }
  }

  return { messages, pending, handleKeyUp, form, sendMessage }
}