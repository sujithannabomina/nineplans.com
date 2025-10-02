// app/trademark/page.jsx
import PageShell from "@/components/PageShell";
export const metadata = { title: "Trademark • NinePlans" };

export default function TrademarkPage() {
  return (
    <PageShell>
      <h1 className="text-3xl font-bold mb-6">Trademark Policy</h1>
      <p className="text-zinc-300">
        “NinePlans” and related marks are service marks of NinePlans. Referential use is okay if accurate and not misleading.
      </p>
    </PageShell>
  );
}
