'use client'

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null)
  const eventSourceRef = useRef<EventSource>(null);
  const [messages, setMessages] = useState<string[]>([])

  useEffect(() => {
    if (!eventSourceRef?.current) 
      eventSourceRef.current = new EventSource("/api/events")

    
    eventSourceRef.current.onmessage = (event) => {
      console.log("Received event:", event);
      setMessages((prev) => [...prev, event.data]);
    };

    return () => eventSourceRef?.current?.close();
  }, [setMessages])

  async function doRefresh() {
    const formData = new FormData()
    formData.append('data', `${inputRef.current?.value}`)
    await fetch("/api/events", { method: "POST", body: formData })
  }

  return (
    <>
      <h1>Server Send Events</h1>
      <input ref={inputRef} type="text" onKeyUp={key => {
        if (key.code == "Enter") doRefresh()
      }} />

      <h2>Messages:</h2>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </>
  );
}
