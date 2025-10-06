// lib/firebaseAdmin.js
// Firebase Admin (server-side) bootstrap for Firestore + Storage + Auth.
// Uses env vars from .env.local. Safe to import in API routes and RSC.

import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
import { getAuth as getAdminAuth } from 'firebase-admin/auth';

// --- Required env (see .env.local) ---
const projectId = process.env.FIREBASE_PROJECT_ID || 'nineplans';
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY
  ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
  : undefined;

// IMPORTANT: Admin SDK expects the **bucket name**, not a URL.
// For your project this is "nineplans.appspot.com".
const storageBucket = (() => {
  const raw =
    process.env.FIREBASE_STORAGE_BUCKET ||
    'nineplans.appspot.com'; // sane default for your project
  // Normalize if someone pastes a URL/domain by accident.
  return raw
    .replace(/^https?:\/\//, '')
    .replace(/^(firebasestorage\.googleapis\.com|storage\.googleapis\.com)\//, '')
    .replace(/^(.*?)(?:\/.*)?$/, '$1'); // keep just the bucket id
})();

if (!clientEmail || !privateKey) {
  console.warn(
    '[firebaseAdmin] Missing FIREBASE_CLIENT_EMAIL or FIREBASE_PRIVATE_KEY. ' +
      'Firestore/Storage calls will fail on Vercel until service-account vars are set.'
  );
}

const app =
  getApps()[0] ||
  initializeApp(
    clientEmail && privateKey
      ? {
          credential: cert({ projectId, clientEmail, privateKey }),
          storageBucket,
        }
      : {
          // Allows local dev without creds to at least import module;
          // DB calls will error until creds are provided.
          storageBucket,
          projectId,
        }
  );

export const adminDB = getFirestore(app);
export const adminStorage = getStorage(app).bucket(storageBucket);
export const adminAuth = getAdminAuth(app);

// Small helper for consistent normalization (used in alias keys, etc.)
export const norm = (s = '') => s.trim().toLowerCase();
