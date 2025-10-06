// app/api/post/[id]/save/route.js
import { NextResponse } from 'next/server';
import { adminDB } from '@/lib/firebaseAdmin';
import { FieldValue } from 'firebase-admin/firestore';

export async function POST(_req, { params }) {
  const postId = params?.id;
  if (!postId) return NextResponse.json({ error: 'Missing post id' }, { status: 400 });

  const headersList = _req.headers;
  const uid = headersList.get('x-np-uid') || null;
  const email = headersList.get('x-np-email') || null;

  try {
    const postRef = adminDB.collection('posts').doc(postId);

    if (uid) {
      const ixRef = adminDB.collection('interactions').doc(`${uid}_${postId}`);
      await adminDB.runTransaction(async (tx) => {
        const [postSnap, ixSnap] = await Promise.all([tx.get(postRef), tx.get(ixRef)]);
        if (!postSnap.exists) throw new Error('Post not found');

        const already = ixSnap.exists && !!ixSnap.data().saved;
        tx.update(postRef, {
          saveCount: FieldValue.increment(already ? -1 : 1),
          updatedAt: FieldValue.serverTimestamp(),
        });
        tx.set(
          ixRef,
          {
            uid,
            email: email || null,
            postId,
            saved: !already,
            liked: ixSnap.exists ? !!ixSnap.data().liked : false,
            updatedAt: FieldValue.serverTimestamp(),
            createdAt: ixSnap.exists ? ixSnap.data().createdAt || FieldValue.serverTimestamp() : FieldValue.serverTimestamp(),
          },
          { merge: true }
        );
      });
    } else {
      await postRef.update({
        saveCount: FieldValue.increment(1),
        updatedAt: FieldValue.serverTimestamp(),
      });
    }

    const fresh = await postRef.get();
    return NextResponse.json({ ok: true, counts: fresh.exists ? fresh.data().saveCount || 0 : 0 });
  } catch (err) {
    console.error('SAVE ERR', err);
    return NextResponse.json({ error: String(err.message || err) }, { status: 500 });
  }
}
