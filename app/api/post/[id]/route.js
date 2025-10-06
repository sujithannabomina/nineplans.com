// app/api/post/[id]/route.js
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { adminDB, adminStorage } from '@/lib/firebaseAdmin';
import { authOptions } from '../../auth/[...nextauth]/route';

export const runtime = 'nodejs';

export async function GET(_req, { params }) {
  const snap = await adminDB.collection('posts').doc(params.id).get();
  if (!snap.exists) return NextResponse.json({ error: 'not_found' }, { status: 404 });
  return NextResponse.json({ id: snap.id, ...snap.data() }, { status: 200 });
}

export async function PUT(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  const ref = adminDB.collection('posts').doc(params.id);
  const snap = await ref.get();
  if (!snap.exists) return NextResponse.json({ error: 'not_found' }, { status: 404 });
  if (snap.data().userId !== session.user.email) return NextResponse.json({ error: 'forbidden' }, { status: 403 });

  const { content, category, images = null, imagePaths = null } = await req.json().catch(() => ({}));
  const update = { updatedAt: new Date() };
  if (typeof content === 'string') update.content = content.trim();
  if (typeof category === 'string') update.category = category.trim();
  if (Array.isArray(images)) update.images = images;
  if (Array.isArray(imagePaths)) update.imagePaths = imagePaths;

  await ref.update(update);
  return NextResponse.json({ ok: true }, { status: 200 });
}

export async function DELETE(_req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  const ref = adminDB.collection('posts').doc(params.id);
  const snap = await ref.get();
  if (!snap.exists) return NextResponse.json({ error: 'not_found' }, { status: 404 });

  const data = snap.data();
  if (data.userId !== session.user.email) return NextResponse.json({ error: 'forbidden' }, { status: 403 });

  const paths = Array.isArray(data.imagePaths) ? data.imagePaths : [];
  await Promise.allSettled(paths.map(p => adminStorage.file(p).delete().catch(() => null)));

  const comQ = await adminDB.collection('comments').where('postId', '==', params.id).get();
  const batch = adminDB.batch();
  comQ.forEach(d => batch.delete(d.ref));
  batch.delete(ref);
  await batch.commit();

  return NextResponse.json({ ok: true }, { status: 200 });
}
