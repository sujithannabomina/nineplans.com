// app/api/post/route.js
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import getAdmin from '@/lib/firebaseAdmin';

function badReq(msg) {
  return NextResponse.json({ error: msg }, { status: 400 });
}

export async function POST(req) {
  try {
    const { adminDb, Timestamp } = getAdmin();

    const payload = await req.json().catch(() => ({}));
    const { title, body, category, authorId } = payload || {};

    if (!title || !body || !category || !authorId) {
      return badReq('title, body, category, authorId are required');
    }

    const now = Timestamp.now();
    const docRef = await adminDb.collection('posts').add({
      title: String(title).trim(),
      body: String(body).trim(),
      category: String(category).trim(),
      authorId: String(authorId).trim(),
      createdAt: now,
      updatedAt: now,
      likes: 0,
      commentsCount: 0,
      views: 0,
      status: 'published',
    });

    return NextResponse.json({ id: docRef.id }, { status: 201 });
  } catch (err) {
    console.error('POST /api/post error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const { adminDb } = getAdmin();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const limitRaw = searchParams.get('limit');
    const limit = Math.min(parseInt(limitRaw || '20', 10) || 20, 100);

    let query = adminDb.collection('posts').orderBy('createdAt', 'desc').limit(limit);
    if (category) {
      // If you don’t have a composite index for category + createdAt, you may need to create one in Firestore.
      query = adminDb
        .collection('posts')
        .where('category', '==', category)
        .orderBy('createdAt', 'desc')
        .limit(limit);
    }

    const snap = await query.get();
    const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

    return NextResponse.json({ data }, { status: 200 });
  } catch (err) {
    console.error('GET /api/post error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
