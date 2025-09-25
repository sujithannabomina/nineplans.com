// app/ads.txt/route.js
// Serves /ads.txt as plain text from the App Router.
export async function GET() {
  const body = `# ads.txt for nineplans.com
# Add your ad provider entries below, one per line, e.g.:
# google.com, pub-0000000000000000, DIRECT, f08c47fec0942fa0
`;
  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
