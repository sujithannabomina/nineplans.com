// app/api/admin/backfill-counters/route.js
// ONE-TIME helper: initialize missing counters on posts
// Protect with a secret header so outsiders can't run it.
import { NextResponse } from 'next/server';
import { adminDB } from '@/lib/firebaseAdmin';

export async function POST(req) {
  const key = process.env.BACKFILL_SECRET || '';
  const provided = req.headers.get('x-admin-key') || '';
  if (!key || provided !== key) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const snap = await adminDB.collection('posts').limit(1000).get();
    let updated = 0;

    const batch = adminDB.batch();
    snap.forEach((doc) => {
      const d = doc.data() || {};
      const patch = {};
      if (typeof d.viewCount !== 'number') patch.viewCount = 0;
      if (typeof d.likeCount !== 'number') patch.likeCount = 0;
      if (typeof d.saveCount !== 'number') patch.saveCount = 0;
      if (typeof d.commentCount !== 'number') patch.commentCount = 0;
      if (Object.keys(patch).length) {
        batch.update(doc.ref, patch);
        updated++;
      }
    });

    if (updated) await batch.commit();
    return NextResponse.json({ ok: true, updated });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: String(e?.message || e) }, { status: 500 });
  }
}
