// app/api/search/route.js
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';

/**
 * GET /api/search?q=...&category=...&order=liked|commented|viewed|newest&limit=20
 */
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const q = (searchParams.get('q') || '').trim().toLowerCase();
    const category = (searchParams.get('category') || '').trim();
    const order = (searchParams.get('order') || 'newest').trim();
    const limitParam = parseInt(searchParams.get('limit') || '20', 10);
    const limit = Math.min(Math.max(limitParam, 1), 50);

    // Map order to a Firestore field (fallback to createdAt if the field isn't present)
    const orderFieldMap = {
      newest: 'createdAt',
      liked: 'likesCount',
      commented: 'commentsCount',
      viewed: 'viewsCount',
    };
    const orderByField = orderFieldMap[order] || 'createdAt';

    let col = adminDb.collection('posts');
    if (category) col = col.where('category', '==', category);

    let snap;
    try {
      snap = await col.orderBy(orderByField, 'desc').limit(limit * 2).get();
    } catch {
      // Fallback if ordering field doesn't exist on some docs
      snap = await col.orderBy('createdAt', 'desc').limit(limit * 2).get();
    }

    let results = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

    if (q) {
      // Lightweight in-memory filter across common text fields
      const fields = ['title', 'content', 'summary', 'tags'];
      results = results.filter((item) =>
        fields.some((f) => {
          const v = item[f];
          if (!v) return false;
          if (Array.isArray(v)) return v.join(' ').toLowerCase().includes(q);
          return String(v).toLowerCase().includes(q);
        })
      );
    }

    // Trim to requested limit
    results = results.slice(0, limit);

    return NextResponse.json({ ok: true, count: results.length, results });
  } catch (err) {
    console.error('[search] error:', err);
    return NextResponse.json(
      { ok: false, error: 'SEARCH_FAILED' },
      { status: 500 }
    );
  }
}
