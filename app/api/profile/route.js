// app/api/profile/route.js
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { adminDb, adminAuth } from '@/lib/firebaseAdmin';

/**
 * GET /api/profile
 * Headers: Authorization: Bearer <Firebase ID Token>
 * Optional query: ?limit=10
 */
export async function GET(req) {
  try {
    const authHeader = req.headers.get('authorization') || '';
    const idToken = authHeader.startsWith('Bearer ')
      ? authHeader.slice(7).trim()
      : null;

    if (!idToken) {
      return NextResponse.json(
        { ok: false, error: 'UNAUTHENTICATED' },
        { status: 401 }
      );
    }

    let decoded;
    try {
      decoded = await adminAuth.verifyIdToken(idToken);
    } catch {
      return NextResponse.json(
        { ok: false, error: 'INVALID_TOKEN' },
        { status: 401 }
      );
    }

    const uid = decoded.uid;
    const { searchParams } = new URL(req.url);
    const limitParam = parseInt(searchParams.get('limit') || '10', 10);
    const limit = Math.min(Math.max(limitParam, 1), 50);

    // Helper to fetch post documents by ids
    async function fetchPostsByIds(ids) {
      if (!ids?.length) return [];
      // Fetch in parallel (Firestore Admin)
      const docs = await Promise.all(
        ids.map((id) => adminDb.collection('posts').doc(id).get())
      );
      return docs
        .filter((doc) => doc.exists)
        .map((doc) => ({ id: doc.id, ...doc.data() }));
    }

    // Get user doc (optional—if you store profile data there)
    const userDocRef = adminDb.collection('users').doc(uid);
    const userDocSnap = await userDocRef.get();
    const profile = userDocSnap.exists ? { id: uid, ...userDocSnap.data() } : { id: uid };

    // Authored posts
    let authoredSnap;
    try {
      authoredSnap = await adminDb
        .collection('posts')
        .where('authorId', '==', uid)
        .orderBy('createdAt', 'desc')
        .limit(limit)
        .get();
    } catch {
      // Fallback without orderBy
      authoredSnap = await adminDb
        .collection('posts')
        .where('authorId', '==', uid)
        .limit(limit)
        .get();
    }
    const authoredPosts = authoredSnap.docs.map((d) => ({ id: d.id, ...d.data() }));

    // Interactions subcollections under users/{uid}/...
    async function getInteractionPostIds(sub) {
      // Expected doc fields: { postId, createdAt }
      const ref = userDocRef.collection(sub);
      let snap;
      try {
        snap = await ref.orderBy('createdAt', 'desc').limit(limit).get();
      } catch {
        snap = await ref.limit(limit).get();
      }
      const ids = [];
      snap.forEach((doc) => {
        const data = doc.data() || {};
        if (data.postId) ids.push(data.postId);
      });
      // Deduplicate while preserving order
      return Array.from(new Set(ids));
    }

    const [likedIds, savedIds, commentedIds, sharedIds] = await Promise.all([
      getInteractionPostIds('likes'),
      getInteractionPostIds('saves'),
      getInteractionPostIds('comments'),
      getInteractionPostIds('shares'),
    ]);

    const [likedPosts, savedPosts, commentedPosts, sharedPosts] = await Promise.all([
      fetchPostsByIds(likedIds),
      fetchPostsByIds(savedIds),
      fetchPostsByIds(commentedIds),
      fetchPostsByIds(sharedIds),
    ]);

    return NextResponse.json({
      ok: true,
      profile,
      authoredPosts,
      likedPosts,
      savedPosts,
      commentedPosts,
      sharedPosts,
    });
  } catch (err) {
    console.error('[profile] error:', err);
    return NextResponse.json(
      { ok: false, error: 'PROFILE_FETCH_FAILED' },
      { status: 500 }
    );
  }
}
