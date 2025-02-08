import { NextRequest, NextResponse } from 'next/server';
import NillionAccess from '@/lib/nillion/provider';

export async function POST(request: NextRequest) {
  try {
    const { wallet } = await request.json();

    if (!wallet) {
      return NextResponse.json(
        { error: 'Wallet address is required' },
        { status: 400 }
      );
    }

    const userProfile = await NillionAccess.readUserProfile(wallet);

    return NextResponse.json({ profile: userProfile }, { status: 200 });

  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user profile' },
      { status: 500 }
    );
  }
} 