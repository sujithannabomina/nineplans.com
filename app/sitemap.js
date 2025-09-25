// Firebase-free sitemap. Add DB-driven URLs later if needed.
export default async function sitemap() {
  const base = "https://nineplans.com";

  const staticPaths = [
    "/",
    "/submit",
    "/top",
    "/search",
    "/login",
    "/profile",
    "/community",
    "/faq",
    "/policy",
    "/privacy",
    "/rules",
    "/terms",
  ];

  const now = new Date().toISOString();

  return staticPaths.map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: p === "/" ? "daily" : "weekly",
    priority: p === "/" ? 1.0 : 0.7,
  }));
}
