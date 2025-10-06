// app/api/profile/route.js
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { adminDB, norm } from '@/lib/firebaseAdmin';
import { authOptions } from '../auth/[...nextauth]/route';

export const runtime = 'nodejs';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ alias: '' }, { status: 200 });

  const uid = session.user.email;
  const snap = await adminDB.collection('users').doc(uid).get();
  return NextResponse.json({ alias: snap.exists ? (snap.data()?.alias || '') : '' }, { status: 200 });
}

export async function PUT(req) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  const { alias } = await req.json().catch(() => ({}));
  const clean = (alias || '').trim();
  if (!clean) return NextResponse.json({ error: 'empty_alias' }, { status: 400 });

  const uid = session.user.email;
  const key = norm(clean);

  const userRef = adminDB.collection('users').doc(uid);
  const userSnap = await userRef.get();
  const prevAlias = userSnap.exists ? (userSnap.data()?.alias || '') : '';

  const mapRef = adminDB.collection('aliases').doc(key);
  const mapSnap = await mapRef.get();
  if (mapSnap.exists && mapSnap.data()?.uid !== uid) {
    return NextResponse.json({ error: 'alias_taken' }, { status: 409 });
  }

  const batch = adminDB.batch();

  if (prevAlias && norm(prevAlias) !== key) {
    batch.delete(adminDB.collection('aliases').doc(norm(prevAlias)));
  }

  batch.set(mapRef, { uid, alias: clean });
  batch.set(
    userRef,
    {
      email: uid,
      name: session.user.name || '',
      alias: clean,
      updatedAt: new Date(),
      createdAt: userSnap.exists ? userSnap.data()?.createdAt || new Date() : new Date(),
    },
    { merge: true }
  );

  await batch.commit();
  return NextResponse.json({ ok: true, alias: clean }, { status: 200 });
}
