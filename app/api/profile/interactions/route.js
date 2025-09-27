// app/api/profile/interactions/route.js
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

    // Fetch items the user has interacted with
    const [likedSnap, savedSnap, commentedSnap, viewedSnap, sharedSnap] =
      await Promise.all([
        adminDb.collection('likes').where('userId', '==', userId).limit(100).get(),
        adminDb.collection('saves').where('userId', '==', userId).limit(100).get(),
        adminDb.collection('comments').where('userId', '==', userId).limit(100).get(),
        adminDb.collection('views').where('userId', '==', userId).limit(100).get(),
        adminDb.collection('shares').where('userId', '==', userId).limit(100).get(),
      ]);

    const mapDocs = snap => snap.docs.map(d => ({ id: d.id, ...d.data() }));

    return NextResponse.json({
      ok: true,
      userId,
      liked: mapDocs(likedSnap),
      saved: mapDocs(savedSnap),
      commented: mapDocs(commentedSnap),
      viewed: mapDocs(viewedSnap),
      shared: mapDocs(sharedSnap),
    });
  } catch (err) {
    console.error('GET /api/profile/interactions error:', err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
