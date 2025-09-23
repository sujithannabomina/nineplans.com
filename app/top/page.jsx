// app/top/page.jsx
import Link from "next/link";

export const metadata = { title: "Top • NinePlans" };

const Card = ({ href, title, desc }) => (
  <Link
    href={href}
    className="block rounded-xl border border-zinc-800 bg-zinc-950/40 p-4 hover:bg-zinc-900/40 transition"
  >
    <div className="text-lg font-semibold">{title}</div>
    <div className="text-sm text-zinc-400">{desc}</div>
  </Link>
);

export default function TopPage() {
  return (
    <div className="grid gap-4">
      <h1 className="text-3xl font-bold">Top</h1>
      <div className="grid gap-4">
        <Card href="/top/liked" title="Most Liked" desc="Posts with the most likes" />
        <Card href="/top/commented" title="Most Commented" desc="Hottest discussions" />
        <Card href="/top/viewed" title="Most Viewed" desc="Most read this week" />
        <Card href="/top/saved" title="Saved" desc="Your saved posts" />
      </div>
    </div>
  );
}
