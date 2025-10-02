// components/MobileMenu.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { CATEGORIES, STATIC_PAGES } from "./CategoryLinks";
import { signIn, signOut, useSession } from "next-auth/react";

export default function MobileMenu() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [showCats, setShowCats] = useState(false);

  return (
    <>
      <button
        aria-label="Open menu"
        className="lg:hidden inline-flex items-center justify-center rounded-md border border-zinc-800 px-3 py-2 text-sm hover:bg-zinc-900"
        onClick={() => setOpen(true)}
      >
        ☰
      </button>

      {open && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-[88%] max-w-[420px] bg-zinc-950 border-l border-zinc-800 p-5 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold">Menu</span>
              <button
                className="rounded-md border border-zinc-800 px-3 py-1 text-sm hover:bg-zinc-900"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </div>

            {/* Primary */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              {[
                { href: "/", label: "Home" },
                { href: "/top", label: "Top" },
                { href: "/search", label: "Search" },
                { href: "/submit", label: "Submit" },
              ].map((i) => (
                <Link
                  key={i.href}
                  href={i.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-3 text-center hover:bg-zinc-900"
                >
                  {i.label}
                </Link>
              ))}
            </div>

            {/* Profile / Auth */}
            <div className="space-y-2 mb-6">
              <Link
                href={session ? "/profile" : "/login"}
                onClick={() => setOpen(false)}
                className="block rounded-md border border-zinc-800 px-3 py-2 hover:bg-zinc-900"
              >
                {session ? "Profile" : "Log in"}
              </Link>
              {session ? (
                <button
                  onClick={() => signOut()}
                  className="w-full rounded-md border border-red-700/40 bg-red-900/20 px-3 py-2 text-red-200 hover:bg-red-900/30"
                >
                  Sign out
                </button>
              ) : (
                <button
                  onClick={() => signIn("google")}
                  className="w-full rounded-md border border-blue-700/40 bg-blue-900/20 px-3 py-2 text-blue-200 hover:bg-blue-900/30"
                >
                  Sign in with Google
                </button>
              )}
            </div>

            {/* Static pages */}
            <div className="space-y-2 mb-6">
              <div className="text-xs font-semibold text-zinc-400">PAGES</div>
              <div className="grid grid-cols-2 gap-2">
                {STATIC_PAGES.map((p) => (
                  <Link
                    key={p.href}
                    href={p.href}
                    onClick={() => setOpen(false)}
                    className="rounded-md border border-zinc-800 px-3 py-2 hover:bg-zinc-900"
                  >
                    {p.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Categories (collapsed by default to avoid taking over screen) */}
            <div className="mb-10">
              <button
                className="w-full flex items-center justify-between rounded-md border border-zinc-800 px-3 py-2 hover:bg-zinc-900"
                onClick={() => setShowCats((v) => !v)}
              >
                <span>Browse categories</span>
                <span className="text-zinc-400">{showCats ? "▲" : "▼"}</span>
              </button>
              {showCats && (
                <ul className="mt-3 max-h-[50vh] overflow-y-auto space-y-2">
                  {CATEGORIES.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/c/${c.slug}`}
                        onClick={() => setOpen(false)}
                        className="block rounded-md border border-zinc-800 px-3 py-2 hover:bg-zinc-900"
                      >
                        {c.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
