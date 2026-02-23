export function GET() {
  const body = `User-agent: *\nAllow: /\n\nSitemap: https://nineplans.com/sitemap.xml\n`;
  return new Response(body, { headers: { "Content-Type": "text/plain" } });
}
