"use client"

import { useState, useRef, useEffect } from "react"
import { ArrowUp } from "lucide-react"
import { type Message, MessageList } from "./message-list"
import { cn } from "@/lib/utils"

const initialMessages: Message[] = [
  {
    role: "assistant",
    content:
      "Hello there! Sure thing, let's kick things off by nailing down some details about your business. First off, what's the name of your business?",
  },
]

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom]) // Added scrollToBottom to dependencies

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const newMessages = [...messages, { role: "user" as const, content: input }]
    setMessages(newMessages)
    setInput("")

    // Simulate AI response
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "assistant",
          content: "I understand. Let me help you with that.",
        },
      ])
    }, 1000)
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
          />
          <button
            type="submit"
            className={cn(
              "absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg",
              "bg-[#9c72fe] hover:bg-purple-600 transition-colors",
              "disabled:opacity-50 disabled:cursor-not-allowed",
            )}
            disabled={!input.trim()}
          >
            <ArrowUp className="w-4 h-4 text-white" />
          </button>
        </div>
      </form>
    </div>
  )
}

