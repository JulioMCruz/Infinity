import { NextResponse } from 'next/server'
import nodeFetch from 'node-fetch'
import https from 'https'

export async function GET() {
  try {
    // const agent = new https.Agent({
    //   rejectUnauthorized: false
    // })

    console.log("*******************************");
    console.log("*** calling SERVER_ENDPOINT ***");
    console.log(`${process.env.SERVER_ENDPOINT}/agents`);
    
    const response = await nodeFetch(`${process.env.SERVER_ENDPOINT}/agents`)
    
    if (!response.ok) throw new Error('Failed to fetch agents')
    const data = await response.json()
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching agents:', error)
    return NextResponse.json(
      { error: 'Failed to fetch agents' },
      { status: 500 }
    )
  }
} 