import ChatRedirect from "@/components/ChatRedirect";


export const metadata = {
  title: 'Chat with Us | Migra Aflux',
  description: 'Connect with our agents via WhatsApp for property inquiries and support'
};

export default function ChatPage() {
  return (
    <div className=" bg-white h-screen text-black mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8 text-center">Contact Our Agents</h1>
      <ChatRedirect />
    </div>
  );
}