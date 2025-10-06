// app/api/post/[id]/view/route.js
import { NextResponse } from 'next/server';
import { adminDB } from '@/lib/firebaseAdmin';
import { FieldValue } from 'firebase-admin/firestore';

export async function POST(_req, { params }) {
  const postId = params?.id;
  if (!postId) return NextResponse.json({ error: 'Missing post id' }, { status: 400 });

  try {
    const postRef = adminDB.collection('posts').doc(postId);
    await postRef.update({
      viewCount: FieldValue.increment(1),
      updatedAt: FieldValue.serverTimestamp(),
    });
    const fresh = await postRef.get();
    return NextResponse.json({ ok: true, counts: fresh.exists ? fresh.data().viewCount || 0 : 0 });
  } catch (err) {
    console.error('VIEW ERR', err);
    return NextResponse.json({ error: String(err.message || err) }, { status: 500 });
  }
}
