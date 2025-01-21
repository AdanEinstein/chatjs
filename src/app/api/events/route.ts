import EventEmitter from "events";

const refreshEvent = new EventEmitter();

export async function GET(req: Request) {
    const stream = new ReadableStream({
        start(controller) {
            const listener = (body: string) => {
                controller.enqueue(`data: ${JSON.stringify({ message: body })}\n\n`);
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
    const formData = await req.formData();
    refreshEvent.emit("refresh", formData.get('data'))
    return new Response("Event Emitted", { status: 200 });
}