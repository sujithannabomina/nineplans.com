// app/api/comments/route.js
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { adminDB } from '@/lib/firebaseAdmin';
import { authOptions } from '../auth/[...nextauth]/route';

export const runtime = 'nodejs';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const postId = searchParams.get('postId');
  if (!postId) return NextResponse.json({ items: [] }, { status: 200 });

  const q = await adminDB
    .collection('comments')
    .where('postId', '==', postId)
    .orderBy('createdAt', 'asc')
    .get();

  return NextResponse.json({ items: q.docs.map(d => ({ id: d.id, ...d.data() })) }, { status: 200 });
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  const { postId, content, postAs = 'USER' } = await req.json().catch(() => ({}));
  if (!postId || !content?.trim()) return NextResponse.json({ error: 'bad_request' }, { status: 400 });

  let alias = '';
  if (postAs === 'ALIAS') {
    const u = await adminDB.collection('users').doc(session.user.email).get();
    alias = u.exists ? (u.data()?.alias || '') : '';
    if (!alias) return NextResponse.json({ error: 'no_alias' }, { status: 400 });
  }

  const ref = adminDB.collection('comments').doc();
  await ref.set({
    postId,
    userId: session.user.email,
    authorName: session.user.name || '',
    authorType: postAs,
    alias: postAs === 'ALIAS' ? alias : '',
    content: content.trim(),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return NextResponse.json({ id: ref.id }, { status: 201 });
}
