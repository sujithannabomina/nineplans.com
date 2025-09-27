// middleware.js
import { NextResponse } from "next/server";

// Public files regex used to bypass rewrites
const PUBLIC_FILE = /\.(?:png|jpg|jpeg|svg|gif|webp|ico|txt|xml|js|css|map)$/i;

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // Skip public assets and Next internals
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Add any headers/hardening you want here (example only)
  const res = NextResponse.next();
  res.headers.set("X-Frame-Options", "SAMEORIGIN");
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set("Permissions-Policy", "geolocation=(), microphone=()");
  return res;
}

export const config = {
  matcher: ["/((?!_next/|.*\\..*|api/).*)"]
};
