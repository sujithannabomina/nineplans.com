// app/api/search/route.js
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import getAdmin from '@/lib/firebaseAdmin';

function badReq(msg) {
  return NextResponse.json({ error: msg }, { status: 400 });
}

/**
 * GET /api/search?q=term&category=Sports&limit=20
 * Basic Firestore search (prefix-ish on title/body if you store searchable fields).
 * Consider storing a "keywords" array or integrating with a search service for better results.
 */
export async function GET(req) {
  try {
    const { adminDb } = getAdmin();
    const { searchParams } = new URL(req.url);

    const q = (searchParams.get('q') || '').trim();
    const category = (searchParams.get('category') || '').trim();
    const limit = Math.min(parseInt(searchParams.get('limit') || '20', 10) || 20, 50);

    let query = adminDb.collection('posts').orderBy('createdAt', 'desc').limit(limit);

    if (category) {
      query = adminDb.collection('posts')
        .where('category', '==', category)
        .orderBy('createdAt', 'desc')
        .limit(limit);
    }

    // Simple filter after fetch (inefficient for huge datasets — add indexes/keywords for real usage)
    const snap = await query.get();
    let results = snap.docs.map(d => ({ id: d.id, ...d.data() }));

    if (q) {
      const qLower = q.toLowerCase();
      results = results.filter(p =>
        (p.title || '').toLowerCase().includes(qLower) ||
        (p.body || '').toLowerCase().includes(qLower)
      );
    }

    return NextResponse.json({ data: results });
  } catch (err) {
    console.error('GET /api/search error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
