export default function sitemap() {
  const base = "https://nineplans.com";
  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/rules`, lastModified: new Date() },
    { url: `${base}/privacy`, lastModified: new Date() },
    { url: `${base}/terms`, lastModified: new Date() },
  ];
}
