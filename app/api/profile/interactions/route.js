// app/api/profile/interactions/route.js
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import getAdmin from '@/lib/firebaseAdmin';

function badReq(msg) {
  return NextResponse.json({ error: msg }, { status: 400 });
}

/**
 * GET /api/profile/interactions?uid=USER_ID&limit=20
 * Returns lists of post IDs the user interacted with.
 */
export async function GET(req) {
  try {
    const { adminDb } = getAdmin();
    const { searchParams } = new URL(req.url);

    const uid = searchParams.get('uid');
    if (!uid) return badReq('uid is required');

    const limit = Math.min(parseInt(searchParams.get('limit') || '20', 10) || 20, 100);

    const [likes, comments, shares, saved, posts] = await Promise.all([
      adminDb.collection('likes').where('userId', '==', uid).orderBy('createdAt', 'desc').limit(limit).get(),
      adminDb.collection('comments').where('userId', '==', uid).orderBy('createdAt', 'desc').limit(limit).get(),
      adminDb.collection('shares').where('userId', '==', uid).orderBy('createdAt', 'desc').limit(limit).get(),
      adminDb.collection('saved').where('userId', '==', uid).orderBy('createdAt', 'desc').limit(limit).get(),
      adminDb.collection('posts').where('authorId', '==', uid).orderBy('createdAt', 'desc').limit(limit).get(),
    ]);

    const mapList = (snap, field = 'postId') => snap.docs.map(d => ({ id: d.id, ...d.data() }))

    return NextResponse.json({
      liked: mapList(likes),
      commented: mapList(comments),
      shared: mapList(shares),
      saved: mapList(saved),
      posted: posts.docs.map(d => ({ id: d.id, ...d.data() })),
    });
  } catch (err) {
    console.error('GET /api/profile/interactions error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
