import Link from "next/link";

export const metadata = { title: "Top • NinePlans" };

export default function TopPage() {
  const tiles = [
    { href: "/top/viewed", title: "Most Viewed", desc: "What everyone’s reading" },
    { href: "/top/liked", title: "Most Liked", desc: "Community favorites" },
    { href: "/top/commented", title: "Most Commented", desc: "Biggest discussions" },
  ];
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {tiles.map((t) => (
        <Link key={t.href} href={t.href} className="card hover:bg-white/5 transition">
          <div className="text-lg font-semibold">{t.title}</div>
          <div className="text-sm text-zinc-400">{t.desc}</div>
        </Link>
      ))}
    </div>
  );
}
