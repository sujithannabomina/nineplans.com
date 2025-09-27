// app/api/search/route.js
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = (searchParams.get('q') || '').toLowerCase().trim();
    const category = (searchParams.get('category') || '').toLowerCase().trim();

    let query = adminDb.collection('posts');

    if (category && category !== 'all' && category !== 'all categories') {
      query = query.where('category', '==', category);
    }

    // Prefer keyword search if provided
    if (q) {
      // naive tokenization to use array-contains-any (up to 10 terms)
      const tokens = Array.from(
        new Set(q.replace(/[^a-z0-9\s]+/g, ' ').split(/\s+/).filter(Boolean))
      ).slice(0, 10);

      if (tokens.length) {
        query = query.where('keywords', 'array-contains-any', tokens);
      }
    }

    query = query.orderBy('createdAt', 'desc').limit(50);
    const snap = await query.get();

    const results = snap.docs.map(d => ({
      id: d.id,
      ...d.data(),
      createdAt: d.get('createdAt')?.toDate?.()?.toISOString?.() || null,
      updatedAt: d.get('updatedAt')?.toDate?.()?.toISOString?.() || null,
    }));

    return NextResponse.json({ ok: true, results });
  } catch (err) {
    console.error('GET /api/search error:', err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
