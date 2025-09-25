import Link from "next/link";

const CATEGORIES = [
  { label: "Confessions", slug: "confessions" },
  { label: "Relationships", slug: "relationships" },
  { label: "Work & Career", slug: "work" },
  { label: "Money", slug: "money" },
  { label: "Family", slug: "family" },
  { label: "Health", slug: "health" },
  { label: "Travel", slug: "travel" },
  { label: "Tech", slug: "tech" },
  { label: "Education", slug: "education" },
  { label: "Other", slug: "other" },
];

const PAGES = [
  { label: "FAQ", href: "/faq" },
  { label: "Community Rules", href: "/rules" },
  { label: "Policy", href: "/policy" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Trademark", href: "/trademark" },
  { label: "Community", href: "/community" },
];

export default function LeftNav() {
  return (
    <nav className="text-sm">
      <div className="mb-3 font-semibold text-zinc-300">Navigate</div>
      <div className="space-y-1 mb-6">
        <Link href="/" className="block px-2 py-1.5 rounded hover:bg-white/5">Home</Link>
        <Link href="/top" className="block px-2 py-1.5 rounded hover:bg-white/5">Top</Link>
        <Link href="/search" className="block px-2 py-1.5 rounded hover:bg-white/5">Search</Link>
        <Link href="/submit" className="block px-2 py-1.5 rounded hover:bg-white/5">Submit</Link>
        <Link href="/profile" className="block px-2 py-1.5 rounded hover:bg-white/5">Profile</Link>
      </div>

      <div className="mb-2 font-semibold text-zinc-300">Categories</div>
      <div className="space-y-0.5 mb-6">
        {CATEGORIES.map((c) => (
          <Link
            key={c.slug}
            href={`/c/${c.slug}`}
            className="block px-2 py-1.5 rounded hover:bg-white/5"
          >
            {c.label}
          </Link>
        ))}
      </div>

      <div className="mb-2 font-semibold text-zinc-300">Pages</div>
      <div className="space-y-0.5">
        {PAGES.map((p) => (
          <Link
            key={p.href}
            href={p.href}
            className="block px-2 py-1.5 rounded hover:bg-white/5"
          >
            {p.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
