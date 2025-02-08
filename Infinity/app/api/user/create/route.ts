import NillionAccess from '@/lib/nillion/provider'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { profile } = await request.json()
    
    // Create user profile using NillionAccess
    await NillionAccess.createUserProfile(profile)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error creating user profile:', error)
    return NextResponse.json({ error: 'Failed to create user profile' }, { status: 500 })
  }
} 