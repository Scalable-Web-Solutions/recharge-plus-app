// lib/firebaseAdmin.ts
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { FieldValue, getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FB_PROJ_ID,
      clientEmail: process.env.FB_CLIENT_EMAIL,
      privateKey: process.env.FB_PRIV_KEY?.replace(/\\n/g, '\n'),
    })
  });
}

export const serverTimestamp = FieldValue.serverTimestamp;
export const adminDb = getFirestore();
export const adminStorage = getStorage();