// components/LeftNav.jsx
"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { CATEGORIES, STATIC_PAGES } from "@/lib/constants";

export default function LeftNav() {
  const { data: session } = useSession();

  return (
    <aside className="hidden lg:block w-64 shrink-0 border-r border-neutral-800 sticky top-[70px] h-[calc(100vh-70px)] overflow-y-auto p-3">
      <div className="text-xs uppercase text-neutral-400 mb-2">Navigate</div>

      {session && (
        <div className="mb-4">
          <Link href="/profile" className="block px-3 py-2 rounded-md border border-neutral-800 hover:bg-neutral-900">
            Profile
          </Link>
        </div>
      )}

      <div className="text-xs uppercase text-neutral-400 mb-2">Categories</div>
      <ul className="space-y-2 mb-4">
        {CATEGORIES.map((c) => (
          <li key={c}>
            <Link
              href={`/c/${encodeURIComponent(c.toLowerCase().replaceAll(" ", "-"))}`}
              className="block px-3 py-2 rounded-md border border-neutral-800 hover:bg-neutral-900"
            >
              {c}
            </Link>
          </li>
        ))}
      </ul>

      <hr className="border-neutral-800 my-4" />

      <ul className="space-y-2">
        {STATIC_PAGES.map((p) => (
          <li key={p.href}>
            <Link
              href={p.href}
              className="block px-3 py-2 rounded-md border border-neutral-800 hover:bg-neutral-900"
            >
              {p.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
