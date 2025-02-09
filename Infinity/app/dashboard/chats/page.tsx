"use client"

import { useState, useEffect } from "react"
import { ChatInterface } from "@/components/dashboard/chat/chat-interface"
import { AgentList } from "@/components/dashboard/chat/agent-list"

interface Agent {
  id: string
  name: string
  clients: string[]
}

export default function ChatsPage() {
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null)
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)

  const handleSelectAgent = async (agent: Agent) => {
    setSelectedAgentId(agent.id)
    setSelectedAgent(agent)
  }

  return (
    <div className="h-[calc(100vh-5rem)] md:h-[calc(100vh-4rem)] pt-4 md:pt-6 pb-4 md:pb-6 flex flex-col">
      {selectedAgentId ? (
        <div className="flex flex-col h-full">
          <div className="mb-6">
            <div className="flex items-center relative">
              <button 
                onClick={() => {
                  setSelectedAgentId(null)
                  setSelectedAgent(null)
                }}
                className="text-purple-400 hover:text-purple-300"
              >
                ← Back to Agents
              </button>
              {selectedAgent && (
                <h1 className="absolute left-1/2 -translate-x-1/2 text-xl font-semibold text-white">
                  Chat with {selectedAgent.name}
                </h1>
              )}
            </div>
          </div>
          <ChatInterface agentId={selectedAgentId} />
        </div>
      ) : (
        <AgentList onSelectAgent={(agent) => handleSelectAgent(agent)} />
      )}
    </div>
  )
}

