// lib/firebaseAdmin.js
import { getApps, getApp, initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

function resolvePrivateKey() {
  // Prefer base64 on Vercel
  const b64 = process.env.FIREBASE_PRIVATE_KEY_BASE64;
  if (b64 && b64.trim()) {
    return Buffer.from(b64, 'base64').toString('utf8');
  }
  // Fallback to \n-escaped env
  const raw = process.env.FIREBASE_PRIVATE_KEY || '';
  return raw.replace(/\\n/g, '\n');
}

let app;
if (!getApps().length) {
  app = initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: resolvePrivateKey(),
    }),
  });
} else {
  app = getApp();
}

export const adminDb = getFirestore(app);
export const adminAuth = getAuth(app);
export { Timestamp };

// Convenience getter if you prefer a single import
export default function getAdmin() {
  return { adminDb, adminAuth, Timestamp };
}
