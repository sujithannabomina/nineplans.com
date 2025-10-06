// app/api/comments/[id]/route.js
// GET one, PATCH (edit), DELETE (remove) a comment.
// Also keeps posts/{postId}.commentCount in sync on delete.

import { NextResponse } from 'next/server';
import { adminDB } from '@/lib/firebaseAdmin';
import { FieldValue } from 'firebase-admin/firestore';

function uidFromHeaders(req) {
  const uid = req.headers.get('x-np-uid') || '';
  const email = req.headers.get('x-np-email') || '';
  return { uid, email };
}

async function loadComment(commentId) {
  const ref = adminDB.collection('comments').doc(commentId);
  const snap = await ref.get();
  return { ref, exists: snap.exists, data: snap.data() || null };
}

export async function GET(_req, { params }) {
  const id = params?.id;
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  try {
    const { exists, data } = await loadComment(id);
    if (!exists) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ id, ...data });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: String(e?.message || e) }, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  const id = params?.id;
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  const { uid, email } = uidFromHeaders(req);
  if (!uid && !email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  let body = {};
  try { body = await req.json(); } catch {}
  const text = typeof body?.text === 'string' ? body.text.trim() : '';
  if (!text) return NextResponse.json({ error: 'Empty comment' }, { status: 400 });

  try {
    const { ref, exists, data } = await loadComment(id);
    if (!exists) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const authorOk =
      (uid && (uid === data?.uid || uid === data?.email)) ||
      (email && email === data?.email);
    if (!authorOk) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    await ref.update({ text, updatedAt: FieldValue.serverTimestamp() });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: String(e?.message || e) }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const id = params?.id;
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  const { uid, email } = uidFromHeaders(req);
  if (!uid && !email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { ref, exists, data } = await loadComment(id);
    if (!exists) return NextResponse.json({ ok: true });

    const authorOk =
      (uid && (uid === data?.uid || uid === data?.email)) ||
      (email && email === data?.email);
    if (!authorOk) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    await ref.delete();

    if (data?.postId) {
      await adminDB.collection('posts').doc(data.postId).update({
        commentCount: FieldValue.increment(-1),
        updatedAt: FieldValue.serverTimestamp(),
      });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: String(e?.message || e) }, { status: 500 });
  }
}
