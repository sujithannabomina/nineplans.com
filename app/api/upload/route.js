// app/api/upload/route.js
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { adminStorage } from '@/lib/firebaseAdmin';
import { authOptions } from '../auth/[...nextauth]/route';

export const runtime = 'nodejs';

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    }

    const form = await req.formData();
    const file = form.get('file');
    if (!file || !file.name || !file.size) {
      return NextResponse.json({ error: 'no_file' }, { status: 400 });
    }
    if (!/^image\/(png|jpe?g|gif|webp)$/i.test(file.type)) {
      return NextResponse.json({ error: 'unsupported_type' }, { status: 415 });
    }
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'too_large' }, { status: 413 });
    }

    const uidSafe = Buffer.from(session.user.email).toString('hex').slice(0, 32);
    const ext = (file.name.split('.').pop() || 'bin').toLowerCase().replace(/[^a-z0-9]/g, '');
    const path = `uploads/users/${uidSafe}/${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;

    const buffer = Buffer.from(await file.arrayBuffer());
    const gcsFile = adminStorage.file(path);

    await gcsFile.save(buffer, {
      resumable: false,
      public: true,
      contentType: file.type,
      metadata: { cacheControl: 'public, max-age=31536000' },
    });

    const url = `https://storage.googleapis.com/${adminStorage.name}/${encodeURIComponent(path)}`;
    return NextResponse.json({ url, path }, { status: 200 });
  } catch (e) {
    console.error('[upload] error', e);
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}
