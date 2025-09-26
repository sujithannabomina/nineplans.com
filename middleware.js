// middleware.ts (or middleware.js)
import { NextResponse, type NextRequest } from "next/server";

const PUBLIC_FILE = /\.(?:png|jpg|jpeg|svg|gif|webp|ico|txt|xml|js|css|map)$/i;

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip Next internals, API routes, and obvious public files
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname === "/ads.txt" ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Security headers (tune if you add new third-party hosts)
  const res = NextResponse.next();
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set(
    "Permissions-Policy",
    "geolocation=(), camera=(), microphone=(), interest-cohort=()"
  );
  // Allow self + Google Ads/Analytics if you use them. Adjust as needed.
  res.headers.set(
    "Content-Security-Policy",
    [
      "default-src 'self' https:",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://www.googletagservices.com https://googleads.g.doubleclick.net https://www.googletagmanager.com",
      "style-src 'self' 'unsafe-inline' https:",
      "img-src 'self' https: data: blob:",
      "font-src 'self' https: data:",
      "connect-src 'self' https:",
      "media-src 'self' https: data:",
      "frame-ancestors 'none'",
      "form-action 'self'",
      "base-uri 'self'",
    ].join("; ")
  );
  return res;
}

// ⬇️ IMPORTANT: no capturing groups here.
export const config = {
  matcher: [
    // Run on “everything” except Next internals and a few obvious static files.
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|ads.txt).*)",
  ],
};
