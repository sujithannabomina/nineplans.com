// app/api/profile/route.js
import { NextResponse } from 'next/server';

// This stub keeps the route valid (no Prisma/NextAuth imports)
// The UI now stores alias in localStorage, so this API is not used.

export async function GET() {
  return NextResponse.json({ alias: null }, { status: 200 });
}

export async function POST() {
  return NextResponse.json(
    { error: 'Alias is managed client-side in Settings.' },
    { status: 200 }
  );
}
