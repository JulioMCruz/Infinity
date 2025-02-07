"use client"

import { useState, useRef, useEffect } from "react"
import { ArrowUp } from "lucide-react"
import { type Message, MessageList } from "./message-list"
import { cn } from "@/lib/utils"

const initialMessages: Message[] = [
  {
    role: "user",
    content: "Hi, can you help me reward my customers?",
  },
  {
    role: "assistant",
    content:
      "Hello there! Sure thing, let's kick things off by nailing down some details about your business. First off, what's the name of your business?",
  },
  {
    role: "user",
    content: "Ether Eats, it's a food truck specialized in latin food",
  },
  {
    role: "assistant",
    content:
      "Cool! Can you help me list a couple examples of products you provide for your customers? The more context you can provide about your business, the better my insights will become.",
  },
  {
    role: "user",
    content: "Sure, we sell tacos, chilaquiles, asado, etc.",
  },
  {
    role: "assistant",
    content:
      "Awesome! Let's set up a simple, scalable points system where your customers get points for every purchase they conduct in your business. What's your merchant wallet address?",
  },
  {
    role: "user",
    content: "it's 0x111....1111",
  },
  {
    role: "assistant",
    content:
      "Ok, I'll scan for deposits every hour and distribute points (1 point per dollar spent) to the sender of every transaction valued over $4.99 USDC, sounds good?",
  },
  {
    role: "user",
    content: "Great!",
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
    const newMessages = [...messages, { role: "user", content: input }]
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

