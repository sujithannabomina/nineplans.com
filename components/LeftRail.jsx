"use client";

import Link from "next/link";
import { CATEGORIES, STATIC_PAGES } from "./CategoryLinks";

export default function LeftRail() {
  return (
    <nav aria-label="Sidebar" className="sticky top-20 hidden md:block">
      <div className="space-y-6 text-sm">
        {/* Navigate */}
        <section>
          <h3 className="mb-2 text-xs font-semibold tracking-wide text-neutral-400">
            NAVIGATE
          </h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/profile"
                className="block rounded px-2 py-1.5 hover:bg-neutral-900"
              >
                Profile
              </Link>
            </li>
          </ul>
        </section>

        {/* Categories */}
        <section>
          <h3 className="mb-2 text-xs font-semibold tracking-wide text-neutral-400">
            CATEGORIES
          </h3>
          <ul className="max-h-[60vh] space-y-1 overflow-y-auto pr-1">
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/c/${c.slug}`}
                  className="block truncate rounded px-2 py-1.5 hover:bg-neutral-900"
                >
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <hr className="border-neutral-800" />

        {/* Static pages */}
        <section>
          <ul className="space-y-1">
            {STATIC_PAGES.map((p) => (
              <li key={p.href}>
                <Link
                  href={`/${p.href}`}
                  className="block rounded px-2 py-1.5 hover:bg-neutral-900"
                >
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </nav>
  );
}
