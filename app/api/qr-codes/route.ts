import { NextRequest, NextResponse } from 'next/server';
import { stackServerApp } from '@/stack/server';

export const runtime = 'nodejs';

const FIREBASE_PROJECT_ID = process.env.FB_PROJ_ID;

export async function POST(request: NextRequest) {
  try {
    // Verify user on server side - prevents forgery
    const user = await stackServerApp.getUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { bookingCode } = await request.json();

    if (!bookingCode) {
      return NextResponse.json(
        { error: 'Missing bookingCode' },
        { status: 400 }
      );
    }

    // Use server-verified userId instead of client-provided one
    const userId = user.id;

    const firestoreUrl = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents/activecodes/${bookingCode}`;
    
    const expiresAt = new Date(Date.now() + 60000);
    
    const documentData = {
      fields: {
        userId: { stringValue: userId },
        bookingCode: { stringValue: bookingCode },
        createdAt: { timestampValue: new Date().toISOString() },
        expiresAt: { timestampValue: expiresAt.toISOString() },
      }
    };

    const response = await fetch(firestoreUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(documentData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: 'Failed to create document', details: errorText },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, bookingCode });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create active code', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Verify user on server side
    const user = await stackServerApp.getUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const bookingCode = searchParams.get('code');

    if (!bookingCode) {
      return NextResponse.json(
        { error: 'Missing bookingCode' },
        { status: 400 }
      );
    }

    const firestoreUrl = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents/activecodes/${bookingCode}`;

    const response = await fetch(firestoreUrl, {
      method: 'DELETE',
    });

    if (!response.ok && response.status !== 404) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: 'Failed to delete document', details: errorText },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete expired code', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
