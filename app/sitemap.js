export default function sitemap() {
  const base = "https://nineplans.com";
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now },
    { url: `${base}/categories`, lastModified: now },
    { url: `${base}/rules`, lastModified: now },
    { url: `${base}/privacy`, lastModified: now },
    { url: `${base}/terms`, lastModified: now },
    { url: `${base}/policy`, lastModified: now },
    { url: `${base}/faq`, lastModified: now },
    { url: `${base}/contact`, lastModified: now },
    { url: `${base}/login`, lastModified: now },
  ];
}
