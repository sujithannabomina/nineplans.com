// app/top/page.jsx
import Link from "next/link";
import PageShell from "@/components/PageShell";

export const metadata = { title: "Top • NinePlans" };

const Tile = ({ href, title, description }) => (
  <Link
    href={href}
    className="block rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 hover:bg-zinc-900 transition"
  >
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-sm text-zinc-400">{description}</p>
  </Link>
);

export default function TopPage() {
  return (
    <PageShell>
      <div className="grid gap-6 md:grid-cols-2">
        <Tile href="/top/viewed" title="Most Viewed" description="What everyone’s reading" />
        <Tile href="/top/liked" title="Most Liked" description="Community favorites" />
        <Tile href="/top/commented" title="Most Commented" description="Biggest discussions" />
        <Tile href="/top/saved" title="Most Saved" description="Bookmarked the most" />
      </div>
    </PageShell>
  );
}
