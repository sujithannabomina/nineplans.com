// app/robots.txt/route.js
export async function GET() {
  const body = [
    "User-agent: *",
    "Allow: /",
    "Sitemap: https://nineplans.com/sitemap.xml",
    "Host: nineplans.com",
  ].join("\n");

  return new Response(body, { headers: { "Content-Type": "text/plain" } });
}
