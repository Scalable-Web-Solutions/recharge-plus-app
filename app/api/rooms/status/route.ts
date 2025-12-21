import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

const FIREBASE_PROJECT_ID = process.env.FB_PROJ_ID;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const roomId = searchParams.get('roomId') || '0';

    const roomUrl = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents/rooms/${roomId}`;

    const response = await fetch(roomUrl);

    if (!response.ok) {
      if (response.status === 404) {
        // Room document doesn't exist = room is available
        return NextResponse.json({
          isOccupied: false,
          roomId,
        });
      }
      
      return NextResponse.json(
        { error: 'Failed to check room status' },
        { status: 500 }
      );
    }

    const data = await response.json();
    
    // Check if session has expired
    const expiresAt = new Date(data.fields.expiresAt.timestampValue);
    const now = new Date();

    if (now > expiresAt) {
      // Session expired - delete document and return available
      await fetch(roomUrl, { method: 'DELETE' });
      
      return NextResponse.json({
        isOccupied: false,
        roomId,
      });
    }

    // Room is occupied
    return NextResponse.json({
      isOccupied: true,
      roomId,
      userId: data.fields.userId.stringValue,
      activatedAt: data.fields.activatedAt.timestampValue,
      expiresAt: data.fields.expiresAt.timestampValue,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to check room status', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
