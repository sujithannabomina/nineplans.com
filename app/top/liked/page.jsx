// app/top/liked/page.jsx
import PageShell from "@/components/PageShell";

export const metadata = { title: "Most Liked • NinePlans" };

export default function TopLikedPage() {
  return (
    <PageShell>
      <h1 className="text-2xl font-bold mb-4">Most Liked</h1>
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
        <p className="text-zinc-400">No posts yet. Be the first to write one.</p>
      </div>
    </PageShell>
  );
}
