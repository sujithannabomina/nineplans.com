// app/api/profile/route.js
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import getAdmin from '@/lib/firebaseAdmin';

function badReq(msg) {
  return NextResponse.json({ error: msg }, { status: 400 });
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const uid = searchParams.get('uid');
    if (!uid) return badReq('uid is required');

    const { adminDb } = getAdmin();

    const userDoc = await adminDb.collection('users').doc(uid).get();
    if (!userDoc.exists) {
      return NextResponse.json({ exists: false }, { status: 200 });
    }

    const profile = userDoc.data();

    // Minimal interaction summary (optional)
    const [likesSnap, postsSnap, commentsSnap, sharesSnap] = await Promise.all([
      adminDb.collection('likes').where('userId', '==', uid).limit(1).get(),
      adminDb.collection('posts').where('authorId', '==', uid).limit(1).get(),
      adminDb.collection('comments').where('userId', '==', uid).limit(1).get(),
      adminDb.collection('shares').where('userId', '==', uid).limit(1).get(),
    ]);

    return NextResponse.json({
      exists: true,
      profile,
      summary: {
        hasLikes: !likesSnap.empty,
        hasPosts: !postsSnap.empty,
        hasComments: !commentsSnap.empty,
        hasShares: !sharesSnap.empty,
      },
    });
  } catch (err) {
    console.error('GET /api/profile error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
