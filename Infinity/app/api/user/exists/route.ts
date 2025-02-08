import NillionAccess from '@/lib/nillion/provider'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { wallet } = await request.json()
    const userExists = await NillionAccess.checkUserExists(wallet)
    return NextResponse.json({ exists: userExists })
  } catch (error) {
    console.error('Error checking user existence:', error)
    return NextResponse.json({ error: 'Failed to check user existence' }, { status: 500 })
  }
} 