// Server-side Firebase Admin initializer (Node.js runtime only)

import { getApps, getApp, initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore, Timestamp, FieldValue } from "firebase-admin/firestore";

// Guard against undefined envs early for clearer errors at boot
const required = ["FIREBASE_PROJECT_ID", "FIREBASE_CLIENT_EMAIL", "FIREBASE_PRIVATE_KEY"];
for (const key of required) {
  if (!process.env[key]) {
    // Don't throw at import time in Next build; throw when actually used
    // so static build can proceed. We'll check again on first use.
  }
}

function ensureApp() {
  if (getApps().length) return getApp();

  // Re-check with a friendly error if missing
  const { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } = process.env;
  if (!FIREBASE_PROJECT_ID || !FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY) {
    throw new Error(
      "Firebase Admin credentials are missing. Ensure FIREBASE_PROJECT_ID, " +
      "FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY are set in .env.local / Vercel."
    );
  }

  return initializeApp({
    credential: cert({
      projectId: FIREBASE_PROJECT_ID,
      clientEmail: FIREBASE_CLIENT_EMAIL,
      // Vercel stores multiline secrets as \n — convert to real newlines:
      privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  });
}

const app = ensureApp();

// Canonical exports
export const db = getFirestore(app);
export const auth = getAuth(app);

// Aliases to match existing imports in your routes
export const adminDb = db;
export const adminAuth = auth;

// Useful Firestore helpers
export { Timestamp, FieldValue };
