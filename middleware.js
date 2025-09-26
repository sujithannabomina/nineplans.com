import { NextResponse } from "next/server";

// naive in-memory rate limit (resets per minute). Fine on Vercel for a start.
const BUCKET = new Map();
const LIMIT = 60; // req/min/IP

export function middleware(req) {
  const url = new URL(req.url);
  const ip =
    req.headers.get("x-real-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "127.0.0.1";

  // Rate limit
  const now = Date.now();
  const windowStart = now - 60_000;
  const entry = BUCKET.get(ip) || [];
  const recent = entry.filter((t) => t > windowStart);
  recent.push(now);
  BUCKET.set(ip, recent);
  if (recent.length > LIMIT) {
    return new NextResponse("Too Many Requests", { status: 429 });
  }

  // Basic API method guard (example)
  if (url.pathname.startsWith("/api/post") && req.method !== "POST") {
    return new NextResponse("Method Not Allowed", { status: 405 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(png|jpg|svg|gif|webp)).*)"],
};
