/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  headers: async () => {
    const security = [
      // NOTE: CSP kept permissive to avoid breaking ads; tighten later as you integrate
      {
        key: "Content-Security-Policy",
        value: [
          "default-src 'self' https: data: blob:;",
          "img-src 'self' https: data: blob:;",
          "script-src 'self' 'unsafe-inline' 'unsafe-eval' https:;",
          "style-src 'self' 'unsafe-inline' https:;",
          "font-src 'self' https: data:;",
          "connect-src 'self' https:;",
          "frame-src https:;",
          "object-src 'none';",
        ].join(" "),
      },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "geolocation=(), camera=(), microphone=()" },
      { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
      { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
    ];
    return [{ source: "/(.*)", headers: security }];
  },
};

module.exports = nextConfig;
