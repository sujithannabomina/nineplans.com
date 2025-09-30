// components/LeftNav.jsx
"use client";

import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";

const STATIC = [
  { href: "/", label: "Home" },
  { href: "/top", label: "Top" },
  { href: "/search", label: "Search" },
  { href: "/submit", label: "Submit" },
  { href: "/profile", label: "Profile" },
  { href: "/community", label: "Community" },
  { href: "/faq", label: "FAQ" },
  { href: "/rules", label: "Rules" },
  { href: "/policy", label: "Policy" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/trademark", label: "Trademark" },
];

export default function LeftNav() {
  return (
    <aside className="sticky top-[64px] hidden h-[calc(100vh-64px)] w-56 shrink-0 overflow-y-auto border-r border-neutral-900 px-3 pb-6 pt-4 lg:block">
      <div className="mb-4">
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">
          Navigate
        </h3>
        <nav className="space-y-1">
          {STATIC.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="block rounded-md px-2 py-1.5 text-sm text-neutral-300 hover:bg-neutral-900 hover:text-white"
            >
              {s.label}
            </Link>
          ))}
        </nav>
      </div>

      <div>
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">
          Categories
        </h3>
        <nav className="space-y-1">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              href={`/c/${c.slug}`}
              className="block rounded-md px-2 py-1.5 text-sm text-neutral-300 hover:bg-neutral-900 hover:text-white"
            >
              {c.name}
            </Link>
          ))}
        </nav>
      </div>
      <div className="h-8" />
    </aside>
  );
}
