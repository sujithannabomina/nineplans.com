// lib/firebaseAdmin.js
// Server-only Firebase Admin for Next.js App Router API routes.
// IMPORTANT: Any route that imports this must run on Node, not Edge:
//   export const runtime = "nodejs";

import { getApps, initializeApp, cert, applicationDefault } from "firebase-admin/app";
import { getFirestore, FieldValue, Timestamp } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

// Prefer explicit service-account creds via env; fall back to ADC for local dev.
const projectId =
  process.env.FIREBASE_PROJECT_ID ||
  process.env.GOOGLE_CLOUD_PROJECT ||
  "nineplans"; // optional fallback

if (!getApps().length) {
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (clientEmail && privateKey) {
    initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        // Vercel stores \n as literal characters; convert to real newlines:
        privateKey: privateKey.replace(/\\n/g, "\n"),
      }),
      projectId,
    });
  } else {
    // Works with `gcloud auth application-default login` locally
    initializeApp({ credential: applicationDefault(), projectId });
  }
}

export const db = getFirestore();
export const adminAuth = getAuth();
export { FieldValue, Timestamp };
