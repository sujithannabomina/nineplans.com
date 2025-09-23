// app/ads.txt/route.js
export async function GET() {
  const body =
    "google.com, pub-3667521141084730, DIRECT, f08c47fec0942fa0\n";
  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
