"use client"

import { useState, useRef, useEffect } from "react"
import { ArrowUp } from "lucide-react"
import { type Message, MessageList } from "./message-list"
import { cn } from "@/lib/utils"
import { usePrivy } from '@privy-io/react-auth'


const NEXT_PUBLIC_SERVER_ENDPOINT = process.env.NEXT_PUBLIC_SERVER_ENDPOINT
const NEXT_PUBLIC_AGENT_ID = process.env.NEXT_PUBLIC_AGENT_ID1

const initialMessages: Message[] = [
  {
    role: "assistant",
    content:
      "Hello there! Sure thing, let's kick things off by nailing down some details about your business. First off, what's the name of your business?",
  },
]

export function ChatInterface({ agentId }: { agentId: string }) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { login, authenticated, ready, user,logout } = usePrivy()


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async (message: string) => {
    try {
      const response = await fetch(
        `/api/agents/${agentId}/message`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: message,
            user: user?.wallet?.address,
          }),
        }
      )

      if (!response.ok) {
        throw new Error("Failed to send message")
      }

      const data = await response.json()
      return data[0] // Get first response from array
    } catch (error) {
      console.error("Error sending message:", error)
      throw error
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    // Add user message
    const newMessages = [...messages, { role: "user" as const, content: input }]
    setMessages(newMessages)
    setInput("")
    setIsLoading(true)

    try {
      const response = await sendMessage(input)
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "assistant",
          content: response.text,
        },
      ])
    } catch (error) {
      console.error("Error handling message:", error)
      // Add error message to chat
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "assistant",
          content: "Sorry, I encountered an error processing your message.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      <div className="flex-1 overflow-y-auto rounded-lg bg-[#513593] p-4 mb-4 md:mb-6">
        <MessageList messages={messages} />
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="mt-auto mb-5 md:mb-0 flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="w-full bg-[#513593] rounded-lg pl-4 pr-10 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            className={cn(
              "absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg",
              "bg-[#9c72fe] hover:bg-purple-600 transition-colors",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
            disabled={!input.trim() || isLoading}
          >
            <ArrowUp className="w-4 h-4 text-white" />
          </button>
        </div>
      </form>
    </div>
  )
}

