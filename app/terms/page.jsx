// app/terms/page.jsx
import PageShell from "@/components/PageShell";
export const metadata = { title: "Terms • NinePlans" };

export default function TermsPage() {
  return (
    <PageShell>
      <h1 className="text-3xl font-bold mb-6">Terms</h1>
      <p className="text-zinc-300">Use NinePlans responsibly and follow local laws.</p>
    </PageShell>
  );
}
