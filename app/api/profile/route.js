// app/api/profile/route.js
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'; // adjust if your authOptions path differs
import prisma from '@/lib/prisma';
import { validateAlias } from '@/lib/alias';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ alias: null }, { status: 200 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { alias: true },
  });

  return NextResponse.json({ alias: user?.alias || null });
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const raw = (body?.alias ?? '').trim();

  // Allow clearing alias
  if (raw.length === 0) {
    await prisma.user.update({
      where: { email: session.user.email },
      data: { alias: null },
    }).catch(async (e) => {
      // In case user row doesn't exist yet
      await prisma.user.upsert({
        where: { email: session.user.email },
        update: { alias: null },
        create: { email: session.user.email, name: session.user.name || null, alias: null },
      });
    });
    return NextResponse.json({ ok: true, alias: null });
  }

  // Validate + normalize
  const alias = validateAlias(raw);
  if (!alias.ok) {
    return NextResponse.json({ error: alias.error }, { status: 400 });
  }

  // Ensure uniqueness
  const exists = await prisma.user.findFirst({
    where: {
      alias: alias.value,
      NOT: { email: session.user.email },
    },
    select: { id: true },
  });
  if (exists) {
    return NextResponse.json({ error: 'Alias is already taken.' }, { status: 409 });
  }

  // Upsert user + set alias
  await prisma.user.upsert({
    where: { email: session.user.email },
    update: { alias: alias.value, name: session.user.name || undefined },
    create: { email: session.user.email, name: session.user.name || null, alias: alias.value },
  });

  return NextResponse.json({ ok: true, alias: alias.value });
}
