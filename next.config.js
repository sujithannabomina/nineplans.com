/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // IMPORTANT: Do not statically export. We want SSR for auth/session stability.
  // Remove any `output: 'export'` you might have previously set.
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
};

module.exports = nextConfig;
