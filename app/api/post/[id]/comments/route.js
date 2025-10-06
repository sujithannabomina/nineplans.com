// app/api/post/[id]/comments/route.js
import { NextResponse } from 'next/server';
import { adminDB } from '@/lib/firebaseAdmin';
import { FieldValue } from 'firebase-admin/firestore';

export async function GET(_req, { params }) {
  const postId = params?.id;
  if (!postId) return NextResponse.json({ comments: [] });

  const snap = await adminDB
    .collection('comments')
    .where('postId', '==', postId)
    .orderBy('createdAt', 'desc')
    .limit(200)
    .get();

  const comments = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  return NextResponse.json({ comments });
}

export async function POST(req, { params }) {
  const postId = params?.id;
  if (!postId) return NextResponse.json({ error: 'Missing post id' }, { status: 400 });

  const { text } = await req.json();
  if (!text || !String(text).trim()) {
    return NextResponse.json({ error: 'Empty comment' }, { status: 400 });
  }

  const uid = req.headers.get('x-np-uid');
  const email = req.headers.get('x-np-email');
  const useAlias = (req.headers.get('x-np-use-alias') || '1') === '1';

  try {
    // get display name (alias or real)
    let displayName = 'someone';
    if (uid) {
      const profile = await adminDB.collection('profiles').doc(uid).get();
      const p = profile.exists ? profile.data() : null;
      if (useAlias && p?.aliasName) displayName = p.aliasName;
      else displayName = p?.displayName || p?.name || email || 'user';
    }

    // create comment
    const ref = await adminDB.collection('comments').add({
      postId,
      uid: uid || null,
      email: email || null,
      displayName,
      text: String(text),
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });

    // increment post.commentCount
    await adminDB.collection('posts').doc(postId).update({
      commentCount: FieldValue.increment(1),
      updatedAt: FieldValue.serverTimestamp(),
    });

    return NextResponse.json({ ok: true, id: ref.id });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: String(e?.message || e) }, { status: 500 });
  }
}
