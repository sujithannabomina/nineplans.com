"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CATEGORY_LIST } from "@/lib/categories";

export default function LeftNav() {
  const pathname = usePathname();

  return (
    // slimmer, desktop-only, scrolls; no "Navigate" (top header already has it)
    <aside className="hidden lg:block w-56 pr-2">
      <div className="sticky top-20 max-h-[calc(100vh-5rem)] overflow-auto leftnav-scroll">
        <h3 className="px-2 pb-2 text-sm font-semibold text-zinc-400">
          Categories
        </h3>
        <nav className="space-y-0.5">
          {CATEGORY_LIST.map((c) => {
            const href = `/c/${c.slug}`;
            const active =
              pathname === href || pathname?.startsWith(`${href}/`);
            return (
              <Link
                key={c.slug}
                href={href}
                className={`block rounded-md px-2 py-1.5 text-sm ${
                  active
                    ? "bg-zinc-800 text-sky-300"
                    : "text-sky-400 hover:bg-zinc-800/60 hover:text-sky-200"
                }`}
              >
                {c.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
