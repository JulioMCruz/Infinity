import { NextResponse } from 'next/server'
import nodeFetch from 'node-fetch'
import https from 'https'

export async function POST(
  request: Request,
  { params }: { params: { agentId: string } }
) {
  try {
    // const agent = new https.Agent({
    //   rejectUnauthorized: false
    // })
    
    const body = await request.json()
    const response = await nodeFetch(
      `${process.env.SERVER_ENDPOINT}/${params.agentId}/message`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        // agent
      }
    )

    if (!response.ok) throw new Error('Failed to send message')
    const data = await response.json()
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error sending message:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
} 