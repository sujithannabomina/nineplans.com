// components/LeftNav.jsx
import Link from "next/link";
import { CATEGORIES } from "@/lib/site";

export default function LeftNav() {
  const cats = CATEGORIES ?? [];

  return (
    <aside className="hidden w-64 shrink-0 border-r border-zinc-800 p-4 md:block">
      <h2 className="mb-3 text-xs font-semibold tracking-wide text-zinc-400">
        CATEGORIES
      </h2>
      <nav className="grid gap-2">
        {cats.map((c) => {
          const name = typeof c === "string" ? c : c.name;
          const href = `/post?cat=${encodeURIComponent(name)}`;
          return (
            <Link
              key={name}
              href={href}
              className="rounded-md px-2 py-1 text-sm text-zinc-200 hover:bg-zinc-900"
            >
              {name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
