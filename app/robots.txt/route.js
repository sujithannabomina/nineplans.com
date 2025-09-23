// app/robots.txt/route.js
export async function GET() {
  return new Response(
    `User-agent: *
Allow: /
Sitemap: https://nineplans.com/sitemap.xml
`,
    { headers: { "Content-Type": "text/plain" } }
  );
}
