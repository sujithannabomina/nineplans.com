// app/api/profile/route.js
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = (searchParams.get('userId') || '').trim();
    if (!userId) {
      return NextResponse.json({ ok: false, error: 'Missing userId' }, { status: 400 });
    }

    const userDoc = await adminDb.collection('users').doc(userId).get();
    const user = userDoc.exists ? userDoc.data() : null;

    // Basic aggregates: counts for posts/likes/comments
    const [postsSnap, likesSnap, commentsSnap] = await Promise.all([
      adminDb.collection('posts').where('userId', '==', userId).limit(50).get(),
      adminDb.collection('likes').where('userId', '==', userId).limit(50).get(),
      adminDb.collection('comments').where('userId', '==', userId).limit(50).get(),
    ]);

    const posts = postsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
    const likes = likesSnap.docs.map(d => ({ id: d.id, ...d.data() }));
    const comments = commentsSnap.docs.map(d => ({ id: d.id, ...d.data() }));

    return NextResponse.json({
      ok: true,
      userId,
      user,
      counts: {
        posts: posts.length,
        likes: likes.length,
        comments: comments.length,
      },
      posts,
      likes,
      comments,
    });
  } catch (err) {
    console.error('GET /api/profile error:', err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
