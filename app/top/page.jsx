import Link from "next/link";

export const metadata = { title: "Top • NinePlans" };

function Card({ href, title, desc }) {
  return (
    <Link
      href={href}
      className="block rounded-xl border border-white/10 bg-white/5 p-5 hover:bg-white/7"
    >
      <div className="text-lg font-semibold">{title}</div>
      <div className="text-white/60 text-sm mt-1">{desc}</div>
    </Link>
  );
}

export default function TopPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Top</h1>
      <div className="space-y-4">
        <Card href="/top/liked" title="Most Liked" desc="Posts with the most likes" />
        <Card href="/top/commented" title="Most Commented" desc="Hottest discussions" />
        <Card href="/top/viewed" title="Most Viewed" desc="Most read this week" />
      </div>
    </div>
  );
}
