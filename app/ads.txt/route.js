export function GET() {
  // Put your real ads.txt lines here after AdSense approval.
  const body = `# ads.txt for NinePlans (placeholder)`;
  return new Response(body, { headers: { "Content-Type": "text/plain" } });
}
