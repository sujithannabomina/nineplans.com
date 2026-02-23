export function GET() {
  const body = `# ads.txt for NinePlans\n# Add your AdSense publisher ID here after approval:\n# google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0\n`;
  return new Response(body, { headers: { "Content-Type": "text/plain" } });
}
