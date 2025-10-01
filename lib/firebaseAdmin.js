// lib/firebaseAdmin.js
// Safe, singleton init for Firebase Admin on Vercel/Node.

import admin from "firebase-admin";

const globalWithAdmin = globalThis;
if (!globalWithAdmin._adminApp) {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  let privateKey = process.env.FIREBASE_PRIVATE_KEY || "";

  // Handle Vercel env escaping
  privateKey = privateKey.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    console.warn("[firebase-admin] Missing service account env vars.");
  }

  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey,
      }),
    });
  } catch (e) {
    // Ignore "already exists" in dev/hot reloads
    if (!/already exists/u.test(String(e))) throw e;
  }
  globalWithAdmin._adminApp = admin.app();
}

export const adminApp = globalWithAdmin._adminApp;
export const adminDb = admin.firestore();
