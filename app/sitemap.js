// Firebase-free sitemap. Add DB-driven URLs later if needed.
export default async function sitemap() {
  const base = 'https://nineplans.com';

  const staticPaths = [
    '/', '/top', '/submit', '/community',
    '/faq', '/policy', '/rules', '/privacy', '/terms', '/trademark',
  ];

  const now = new Date();

  return staticPaths.map((p) => ({
    url: p === '/' ? base : `${base}${p}`,
    lastModified: now,
    changeFrequency: 'daily',
    priority: p === '/' ? 1.0 : 0.7,
  }));
}
