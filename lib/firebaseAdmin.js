// lib/firebaseAdmin.js
import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';

let privateKey = process.env.FIREBASE_PRIVATE_KEY || '';
// Vercel & many CI systems store newlines escaped; fix that here
if (privateKey.includes('\\n')) {
  privateKey = privateKey.replace(/\\n/g, '\n');
}

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey,
    }),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET, // e.g. nineplans.firebasestorage.app or *.appspot.com
  });
}

// Named exports used across API routes
export const adminAuth = getAuth();
export const adminDb = getFirestore();
export const adminStorage = getStorage().bucket();

// Optional default for convenience (not required)
// export default { adminAuth, adminDb, adminStorage };
