// app/api/post/[id]/like/route.js
import { NextResponse } from 'next/server';
import { adminDB } from '@/lib/firebaseAdmin';
import { FieldValue } from 'firebase-admin/firestore';

export async function POST(_req, { params }) {
  const postId = params?.id;
  if (!postId) return NextResponse.json({ error: 'Missing post id' }, { status: 400 });

  // Optional: pass the signed-in id/email from the client – if absent, we still allow the toggle
  // but we cannot prevent duplicates per user.
  // Clients can send: x-np-uid and/or x-np-email headers.
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

        const already = ixSnap.exists && !!ixSnap.data().liked;
        tx.update(postRef, {
          likeCount: FieldValue.increment(already ? -1 : 1),
          updatedAt: FieldValue.serverTimestamp(),
        });
        tx.set(
          ixRef,
          {
            uid,
            email: email || null,
            postId,
            liked: !already,
            // keep saved as-is if present
            saved: ixSnap.exists ? !!ixSnap.data().saved : false,
            updatedAt: FieldValue.serverTimestamp(),
            createdAt: ixSnap.exists ? ixSnap.data().createdAt || FieldValue.serverTimestamp() : FieldValue.serverTimestamp(),
          },
          { merge: true }
        );
      });
    } else {
      // Anonymous: just increment (idempotency not guaranteed)
      await postRef.update({
        likeCount: FieldValue.increment(1),
        updatedAt: FieldValue.serverTimestamp(),
      });
    }

    const fresh = await postRef.get();
    return NextResponse.json({ ok: true, counts: fresh.exists ? fresh.data().likeCount || 0 : 0 });
  } catch (err) {
    console.error('LIKE ERR', err);
    return NextResponse.json({ error: String(err.message || err) }, { status: 500 });
  }
}
