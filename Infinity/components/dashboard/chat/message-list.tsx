import { Bot, User } from "lucide-react"
import { cn } from "@/lib/utils"

export interface Message {
  role: "user" | "assistant"
  content: string
}

interface MessageListProps {
  messages: Message[]
}

export function MessageList({ messages }: MessageListProps) {
  return (
    <div className="space-y-4">
      {messages.map((message, i) => (
        <div key={i} className={cn("flex items-start gap-3", message.role === "user" && "flex-row-reverse")}>
          <div className={cn("flex items-center justify-center w-8 h-8 rounded-full", "bg-[#9c72fe]")}>
            {message.role === "assistant" ? (
              <Bot className="w-5 h-5 text-white" />
            ) : (
              <User className="w-5 h-5 text-white" />
            )}
          </div>
          <div
            className={cn(
              "rounded-lg px-4 py-2 max-w-[80%]",
              message.role === "assistant" ? "bg-[#9c72fe]" : "bg-purple-700",
            )}
          >
            <p className="text-white">{message.content}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

