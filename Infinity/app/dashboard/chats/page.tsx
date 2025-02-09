"use client"

import { useState } from "react"
import { ChatInterface } from "@/components/dashboard/chat/chat-interface"
import { AgentList } from "@/components/dashboard/chat/agent-list"

export default function ChatsPage() {
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null)

  return (
    <div className="h-[calc(100vh-5rem)] md:h-[calc(100vh-4rem)] pt-4 md:pt-6 pb-4 md:pb-6 flex flex-col">
      {selectedAgentId ? (
        <div className="flex flex-col h-full">
          <button 
            onClick={() => setSelectedAgentId(null)}
            className="mb-4 text-purple-400 hover:text-purple-300"
          >
            ← Back to Agents
          </button>
          <ChatInterface agentId={selectedAgentId} />
        </div>
      ) : (
        <AgentList onSelectAgent={setSelectedAgentId} />
      )}
    </div>
  )
}

