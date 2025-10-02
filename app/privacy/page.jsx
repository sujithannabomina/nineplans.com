// app/privacy/page.jsx
import PageShell from "@/components/PageShell";
export const metadata = { title: "Privacy • NinePlans" };

export default function PrivacyPage() {
  return (
    <PageShell>
      <h1 className="text-3xl font-bold mb-6">Privacy</h1>
      <p className="text-zinc-300">Your privacy matters. We collect only what’s needed to run the site.</p>
    </PageShell>
  );
}
