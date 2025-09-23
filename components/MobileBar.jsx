// components/MobileBar.jsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CATEGORIES } from "@/lib/site";

export default function MobileBar() {
  const [open, setOpen] = useState(false);

  // Close drawer on route change if you decide to read router events later.
  useEffect(() => {
    if (!open) return;
    const onEsc = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [open]);

  return (
    <>
      <button
        aria-label="Open menu"
        className="lg:hidden rounded-md border border-zinc-800 px-3 py-2 text-sm hover:bg-zinc-900"
        onClick={() => setOpen(true)}
      >
        ☰
      </button>

      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          {/* Backdrop */}
          <button
            className="absolute inset-0 bg-black/60"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          />

          {/* Panel */}
          <div className="absolute left-0 top-0 h-full w-[88%] max-w-xs overflow-y-auto border-r border-zinc-800 bg-zinc-950 p-4 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-lg font-semibold">Menu</span>
              <button
                className="rounded-md border border-zinc-700 px-2 py-1 text-sm"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </div>

            <nav className="space-y-1">
              <Link
                href="/"
                className="block rounded-md px-3 py-2 text-sm hover:bg-zinc-900"
                onClick={() => setOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/submit"
                className="block rounded-md px-3 py-2 text-sm hover:bg-zinc-900"
                onClick={() => setOpen(false)}
              >
                Submit
              </Link>
              <Link
                href="/top"
                className="block rounded-md px-3 py-2 text-sm hover:bg-zinc-900"
                onClick={() => setOpen(false)}
              >
                Top
              </Link>
              <Link
                href="/search"
                className="block rounded-md px-3 py-2 text-sm hover:bg-zinc-900"
                onClick={() => setOpen(false)}
              >
                Search
              </Link>
            </nav>

            <div className="my-4 h-px bg-zinc-800" />

            <div>
              <div className="mb-2 px-2 text-xs uppercase tracking-wide text-zinc-400">
                Categories
              </div>
              <ul className="space-y-1">
                {CATEGORIES.map((c) => (
                  <li key={c}>
                    <Link
                      href={`/post?cat=${encodeURIComponent(c)}`}
                      className="block rounded-md px-3 py-2 text-sm hover:bg-zinc-900"
                      onClick={() => setOpen(false)}
                    >
                      {c}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 text-center text-xs text-zinc-500">
              © {new Date().getFullYear()} NinePlans
            </div>
          </div>
        </div>
      )}
    </>
  );
}
