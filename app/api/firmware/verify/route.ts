import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

const FIREBASE_PROJECT_ID = process.env.FB_PROJ_ID;
const ROOM_ID = '0'; // Testing room ID

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();

    if (!code || code.length !== 12) {
      return NextResponse.json(
        { success: false, error: 'Invalid code format' },
        { status: 400 }
      );
    }

    // Query Firestore to check if code exists and is valid
    const firestoreUrl = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents/activecodes/${code}`;

    const response = await fetch(firestoreUrl);

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { success: false, error: 'Code not found or expired' },
          { status: 404 }
        );
      }
      
      const errorText = await response.text();
      return NextResponse.json(
        { success: false, error: 'Verification failed', details: errorText },
        { status: 500 }
      );
    }

    const data = await response.json();
    
    // Check if code has expired
    const expiresAt = new Date(data.fields.expiresAt.timestampValue);
    const now = new Date();

    if (now > expiresAt) {
      // Delete expired code
      await fetch(firestoreUrl, { method: 'DELETE' });
      
      return NextResponse.json(
        { success: false, error: 'Code has expired' },
        { status: 410 }
      );
    }

    const userId = data.fields.userId.stringValue;
    
    // Code is valid - delete it after successful scan (one-time use)
    await fetch(firestoreUrl, { method: 'DELETE' });

    // Create room session document (active for 15 minutes)
    const sessionExpiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
    const roomSessionUrl = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents/rooms/${ROOM_ID}`;
    
    const sessionData = {
      fields: {
        userId: { stringValue: userId },
        code: { stringValue: code },
        activatedAt: { timestampValue: new Date().toISOString() },
        expiresAt: { timestampValue: sessionExpiresAt.toISOString() },
        roomId: { stringValue: ROOM_ID },
      }
    };

    await fetch(roomSessionUrl, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sessionData),
    });

    // Log the access
    const accessLogUrl = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents/accesslogs`;
    
    await fetch(accessLogUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fields: {
          userId: { stringValue: userId },
          code: { stringValue: code },
          roomId: { stringValue: ROOM_ID },
          accessedAt: { timestampValue: new Date().toISOString() },
          status: { stringValue: 'granted' },
        }
      }),
    });

    return NextResponse.json({
      success: true,
      userName: userId,
      roomId: ROOM_ID,
      expiresAt: sessionExpiresAt.toISOString(),
      message: 'Access granted',
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Verification error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
