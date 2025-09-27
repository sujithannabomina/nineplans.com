// app/api/post/route.js
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { adminDb, Timestamp } from '@/lib/firebaseAdmin';

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      title = '',
      text = '',
      category = 'confessions',
      alias = 'Anonymous',
      userId = null, // optional
    } = body || {};

    if (!title.trim() || !text.trim()) {
      return NextResponse.json({ ok: false, error: 'Missing title or text' }, { status: 400 });
    }

    const now = Timestamp.now();
    const doc = {
      title: title.trim(),
      text: text.trim(),
      category: category.trim().toLowerCase(),
      alias: alias.trim() || 'Anonymous',
      userId: userId || null,
      createdAt: now,
      updatedAt: now,
      likes: 0,
      commentsCount: 0,
      views: 0,
      // simple keyword field to enable basic contains-any search
      keywords: Array.from(
        new Set(
          (title + ' ' + text)
            .toLowerCase()
            .replace(/[^a-z0-9\s]+/g, ' ')
            .split(/\s+/)
            .filter(Boolean)
        )
      ),
    };

    const ref = await adminDb.collection('posts').add(doc);
    return NextResponse.json({ ok: true, id: ref.id });
  } catch (err) {
    console.error('POST /api/post error:', err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
