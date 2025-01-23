import { Message } from "@/types/globals";
import EventEmitter from "events";

const refreshEvent = new EventEmitter();

export async function GET(req: Request) {
    const stream = new ReadableStream({
        start(controller) {
            const listener = (msg: Message) => {
                controller.enqueue(`data: ${JSON.stringify(msg)}\n\n`);
            };

            refreshEvent.on("refresh", listener);

            req.signal.addEventListener("abort", () => {
                refreshEvent.off("refresh", listener);
                controller.close();
            });
        },
    });

    return new Response(stream, {
        headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
        },
    });
}


export async function POST(req: Request) {
    const message = await req.json();
    refreshEvent.emit("refresh", message)
    return new Response("Event Emitted", { status: 200 });
}