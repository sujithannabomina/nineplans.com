// middleware.js
import { NextResponse } from "next/server";

// Simple pass-through for static files, add security headers for others
const PUBLIC_FILE = /\.(?:png|jpg|jpeg|svg|gif|webp|ico|txt|xml|js|css|map)$/i;

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // Skip static assets quickly
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/api/") ||
    pathname === "/favicon.ico" ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const res = NextResponse.next();

  // Basic security hardening headers
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set(
    "Permissions-Policy",
    "camera=(), geolocation=(), microphone=()"
  );
  // A conservative CSP; customize if you use 3rd-party scripts/fonts
  res.headers.set(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self' data:",
      "connect-src 'self' https://firestore.googleapis.com https://www.googleapis.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; ")
  );

  return res;
}

// Run on all paths; avoids complex (and error-prone) regex matchers
export const config = {
  matcher: "/:path*",
};
