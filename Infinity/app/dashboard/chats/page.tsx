import { ChatInterface } from "@/components/dashboard/chat/chat-interface"

export default function ChatsPage() {
  return (
    <div className="h-[calc(100vh-5rem)] md:h-[calc(100vh-4rem)] pt-4 md:pt-6 pb-4 md:pb-6 flex flex-col">
      <ChatInterface />
    </div>
  )
}

