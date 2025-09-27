// lib/firebaseAdmin.js
import 'server-only';

import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

function normalizePrivateKey(key) {
  if (!key) return undefined;
  // Remove accidental surrounding quotes and restore newlines if needed
  let k = key.trim().replace(/^"(.*)"$/s, '$1').replace(/\\n/g, '\n');
  return k;
}

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL?.trim();
const privateKey = normalizePrivateKey(process.env.FIREBASE_PRIVATE_KEY);

let app;

if (!getApps().length) {
  // If all three envs exist, use them; otherwise fall back to ADC (GCP/Vercel integration)
  app = initializeApp(
    projectId && clientEmail && privateKey
      ? { credential: cert({ projectId, clientEmail, privateKey }) }
      : undefined
  );
} else {
  app = getApps()[0];
}

export const adminDb = getFirestore(app);
export const adminAuth = getAuth(app);
export default app;
