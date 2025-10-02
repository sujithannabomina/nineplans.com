// app/community/page.jsx
import PageShell from "@/components/PageShell";

export const metadata = { title: "Community • NinePlans" };

export default function CommunityPage() {
  return (
    <PageShell>
      <h1 className="text-3xl font-bold mb-3">Community</h1>
      <p className="text-zinc-300">
        Welcome! Community tools (groups, reputation, and events) are on the roadmap.
        For now, jump in by writing posts, commenting, and upvoting.
      </p>
    </PageShell>
  );
}
