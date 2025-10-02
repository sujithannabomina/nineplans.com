// app/top/viewed/page.jsx
import PageShell from "@/components/PageShell";

export const metadata = { title: "Most Viewed • NinePlans" };

export default function TopViewedPage() {
  return (
    <PageShell>
      <h1 className="text-2xl font-bold mb-4">Most Viewed</h1>
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
        <p className="text-zinc-400">No posts yet. Be the first to write one.</p>
      </div>
    </PageShell>
  );
}
