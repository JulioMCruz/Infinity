import { useState, useEffect } from "react"
import { Bot } from "lucide-react"

interface Agent {
  id: string
  name: string
  clients: string[]
}

interface AgentListProps {
  onSelectAgent: (agent: Agent) => void
}

export function AgentList({ onSelectAgent }: AgentListProps) {
  const [agents, setAgents] = useState<Agent[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAgents = async () => {
    try {
      const response = await fetch('/api/agents')
      if (!response.ok) throw new Error('Failed to fetch agents')
      const data = await response.json()
      setAgents(data.agents)
      setError(null)
    } catch (err) {
      setError('Failed to load agents')
      console.error('Error fetching agents:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchAgents()
    const intervalId = setInterval(fetchAgents, 10000)
    return () => clearInterval(intervalId)
  }, [])

  if (isLoading && agents.length === 0) {
    return <div className="text-center p-4">Loading agents...</div>
  }

  if (error && agents.length === 0) {
    return <div className="text-center text-red-500 p-4">{error}</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {agents.map((agent) => (
        <button
          key={agent.id}
          onClick={() => onSelectAgent(agent)}
          className="flex items-center gap-3 p-4 bg-[#513593] rounded-lg hover:bg-[#9c72fe] transition-colors"
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#9c72fe]">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div className="text-left">
            <h3 className="font-medium text-white">{agent.name}</h3>
            <p className="text-sm text-gray-300">Click to start chat</p>
          </div>
        </button>
      ))}
    </div>
  )
} 