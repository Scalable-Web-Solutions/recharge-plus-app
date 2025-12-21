import { NextRequest, NextResponse } from 'next/server';
import { stackServerApp } from '@/stack/server';

export const runtime = 'nodejs';

const FIREBASE_PROJECT_ID = process.env.FB_PROJ_ID;

export async function POST(request: NextRequest) {
  try {
    // Verify user on server side
    const user = await stackServerApp.getUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { roomId = '0' } = await request.json();

    // Delete the room session document
    const roomUrl = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents/rooms/${roomId}`;

    const response = await fetch(roomUrl, {
      method: 'DELETE',
    });

    if (!response.ok && response.status !== 404) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: 'Failed to end session', details: errorText },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to end session', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
