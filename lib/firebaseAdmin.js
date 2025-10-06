// lib/firebaseAdmin.js
import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';

// Vercel/CI often stores newlines as \n in env; fix them.
let privateKey = process.env.FIREBASE_PRIVATE_KEY || '';
if (privateKey.includes('\\n')) privateKey = privateKey.replace(/\\n/g, '\n');

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;

// IMPORTANT: For Admin SDK this must be "<projectId>.appspot.com"
const storageBucketEnv = (process.env.FIREBASE_STORAGE_BUCKET || '').trim();

if (!getApps().length) {
  initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
    // only pass storageBucket if it looks valid to avoid build-time errors
    ...(storageBucketEnv && storageBucketEnv.endsWith('.appspot.com')
      ? { storageBucket: storageBucketEnv }
      : {}),
  });
}

// Firestore / Auth
export const adminAuth = getAuth();
export const adminDb = getFirestore();
// Alias for legacy imports in routes (adminDB vs adminDb)
export const adminDB = adminDb;

// Small helper some routes import
export const norm = (doc) =>
  doc && typeof doc.data === 'function' ? { id: doc.id, ...doc.data() } : doc;

/**
 * Lazy getter for the Storage bucket.
 * Returns:
 *  - bucket instance if configured
 *  - null if bucket name is missing/invalid (callers should guard with `?.`)
 */
export function getAdminBucket() {
  try {
    const storage = getStorage();
    if (storageBucketEnv && storageBucketEnv.endsWith('.appspot.com')) {
      return storage.bucket(storageBucketEnv);
    }
    // If app initialized with storageBucket in initializeApp, this works too:
    return storage.bucket(); // will throw if none configured -> handled by catch
  } catch {
    return null;
  }
}

// Optional convenience export; safe to be null at build time
export const adminStorage = getAdminBucket();
