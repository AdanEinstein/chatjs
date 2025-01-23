import Chat from "@/components/chat";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="h-screen">
      <div className="flex justify-center my-4">
        <Chat />
      </div>
    </div>
  );
}
