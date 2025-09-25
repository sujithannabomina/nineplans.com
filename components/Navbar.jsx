"use client";

import Link from "next/link";
import { useState } from "react";

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

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/10 bg-black/70 backdrop-blur">
      {/* top micro-banner (only one line sitewide) */}
      <div className="text-xs text-zinc-300/80 px-4 py-1">
        You can write confessions anonymously, even when you're logged in.
      </div>

      <nav className="flex items-center justify-between px-4 py-3">
        {/* Left: logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded bg-sky-600 text-white grid place-items-center font-bold">
              NP
            </div>
            <span className="hidden sm:block font-semibold tracking-wide">
              NinePlans
            </span>
          </Link>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/top" className="hover:underline">Top</Link>
          <Link href="/search" className="hover:underline">Search</Link>
          <Link href="/submit" className="button">Submit</Link>
          <Link href="/profile" className="hover:underline">Profile</Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="md:hidden inline-flex items-center justify-center p-2 rounded border border-white/15"
          onClick={() => setOpen((v) => !v)}
        >
          {/* simple icon */}
          <div className="space-y-1">
            <span className="block h-0.5 w-5 bg-white" />
            <span className="block h-0.5 w-5 bg-white" />
            <span className="block h-0.5 w-5 bg-white" />
          </div>
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div
          id="mobile-menu"
          className="md:hidden px-4 pb-4 border-t border-white/10"
        >
          <div className="grid grid-cols-2 gap-2 py-3">
            <Link href="/" onClick={() => setOpen(false)} className="button justify-center">Home</Link>
            <Link href="/top" onClick={() => setOpen(false)} className="button justify-center">Top</Link>
            <Link href="/search" onClick={() => setOpen(false)} className="button justify-center">Search</Link>
            <Link href="/submit" onClick={() => setOpen(false)} className="button justify-center">Submit</Link>
            <Link href="/profile" onClick={() => setOpen(false)} className="button justify-center">Profile</Link>
          </div>

          <div className="mt-3 text-sm text-zinc-400">Categories</div>
          <div className="mt-1 max-h-[50vh] overflow-y-auto pr-2">
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                href={`/c/${c.slug}`}
                onClick={() => setOpen(false)}
                className="block px-2 py-2 rounded hover:bg-white/5"
              >
                {c.label}
              </Link>
            ))}
          </div>

          <div className="mt-4 text-sm text-zinc-400">Pages</div>
          <div className="mt-1 grid grid-cols-2 gap-2">
            <Link href="/faq" onClick={() => setOpen(false)} className="px-2 py-2 rounded hover:bg-white/5">FAQ</Link>
            <Link href="/rules" onClick={() => setOpen(false)} className="px-2 py-2 rounded hover:bg-white/5">Rules</Link>
            <Link href="/policy" onClick={() => setOpen(false)} className="px-2 py-2 rounded hover:bg-white/5">Policy</Link>
            <Link href="/privacy" onClick={() => setOpen(false)} className="px-2 py-2 rounded hover:bg-white/5">Privacy</Link>
            <Link href="/terms" onClick={() => setOpen(false)} className="px-2 py-2 rounded hover:bg-white/5">Terms</Link>
            <Link href="/trademark" onClick={() => setOpen(false)} className="px-2 py-2 rounded hover:bg-white/5">Trademark</Link>
            <Link href="/community" onClick={() => setOpen(false)} className="px-2 py-2 rounded hover:bg-white/5">Community</Link>
          </div>
        </div>
      )}
    </div>
  );
}
