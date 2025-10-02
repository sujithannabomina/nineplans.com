// app/policy/page.jsx
import PageShell from "@/components/PageShell";

export const metadata = { title: "Content & Advertising Policy • NinePlans" };

export default function PolicyPage() {
  return (
    <PageShell>
      <h1 className="text-3xl font-bold mb-6">Content & Advertising Policy</h1>
      <ul className="list-disc pl-6 space-y-3 text-zinc-300">
        <li>No hate speech, harassment, doxxing, or illegal content.</li>
        <li>Keep reviews and opinions honest; disclose material connections.</li>
        <li>Ads and self-promotion must follow local laws and be clearly labeled.</li>
        <li>Severe or repeated violations may result in restrictions or removal.</li>
      </ul>
    </PageShell>
  );
}
