// lib/firebaseAdmin.js
// Robust, lazy initialization of Firebase Admin for Next.js (App Router)

import { getApps, getApp, initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore';

/**
 * Normalize private key from env:
 * - Accepts either:
 *   - Literal PEM with real newlines
 *   - JSON-escaped with \n sequences
 *   - Base64 (FIREBASE_PRIVATE_KEY_BASE64)
 * - Strips accidental surrounding quotes and stray spaces
 */
function resolvePrivateKey() {
  let key = process.env.FIREBASE_PRIVATE_KEY || '';

  // If base64 variant is provided, prefer it
  if (!key && process.env.FIREBASE_PRIVATE_KEY_BASE64) {
    const buf = Buffer.from(process.env.FIREBASE_PRIVATE_KEY_BASE64, 'base64');
    key = buf.toString('utf8');
  }

  if (!key) return '';

  // Remove accidental surrounding quotes
  if ((key.startsWith('"') && key.endsWith('"')) || (key.startsWith("'") && key.endsWith("'"))) {
    key = key.slice(1, -1);
  }

  // Convert JSON-escaped newlines into real newlines
  key = key.replace(/\\n/g, '\n');

  // Trim whitespace (helpful if someone pasted with a trailing space)
  key = key.trim();

  return key;
}

/**
 * Lazy getter so nothing runs at import time.
 * This prevents Vercel’s build from choking while collecting page data.
 */
export function getAdmin() {
  const apps = getApps();
  if (apps.length) {
    return {
      adminApp: getApp(),
      adminAuth: getAuth(),
      adminDb: getFirestore(),
      Timestamp,
      FieldValue,
    };
  }

  const projectId = (process.env.FIREBASE_PROJECT_ID || '').trim();
  // Make sure there are no stray spaces in the email (you once had one)
  const clientEmail = (process.env.FIREBASE_CLIENT_EMAIL || '').replace(/\s+/g, '');
  const privateKey = resolvePrivateKey();

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      'Missing Firebase Admin env: check FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY (or _BASE64).'
    );
  }

  initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
  });

  return {
    adminApp: getApp(),
    adminAuth: getAuth(),
    adminDb: getFirestore(),
    Timestamp,
    FieldValue,
  };
}

export default getAdmin;
