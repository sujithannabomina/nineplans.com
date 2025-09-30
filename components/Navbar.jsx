// components/Navbar.jsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { TAGLINE, STATIC_PAGES } from "@/lib/constants";

export default function Navbar() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-neutral-800 bg-neutral-950 sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6">
        <div className="h-14 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* Hamburger (mobile) */}
            <button
              className="lg:hidden inline-flex items-center justify-center rounded-md border border-neutral-800 px-3 py-2 text-sm"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              ☰
            </button>

            {/* Logo + Brand */}
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.svg"
                alt="NinePlans"
                width={28}
                height={28}
                priority
              />
              <span className="text-lg font-semibold">NinePlans</span>
            </Link>
          </div>

          {/* Primary nav (desktop) */}
          <nav className="hidden lg:flex items-center gap-4 text-sm">
            <Link className="hover:underline" href="/">Home</Link>
            <Link className="hover:underline" href="/top">Top</Link>
            <Link className="hover:underline" href="/search">Search</Link>
            <Link className="hover:underline" href="/submit">Submit</Link>
          </nav>

          {/* Auth controls */}
          <div className="flex items-center gap-2">
            {session ? (
              <>
                <Link className="hidden sm:inline-block btn" href="/profile">
                  Profile
                </Link>
                <Link className="hidden sm:inline-block btn" href="/profile/settings">
                  Settings
                </Link>
                <button
                  className="btn-danger"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  Sign out
                </button>
                <Link className="hidden sm:inline-block btn-primary" href="/submit">
                  Write a post
                </Link>
              </>
            ) : (
              <>
                <button
                  className="btn"
                  onClick={() => signIn("google", { callbackUrl: "/" })}
                >
                  Log in
                </button>
                <Link className="hidden sm:inline-block btn-primary" href="/login">
                  Write a post
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Tagline */}
        <div className="py-2 text-xs text-neutral-300">{TAGLINE}</div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <aside className="absolute left-0 top-0 h-full w-[85%] max-w-[360px] bg-neutral-950 border-r border-neutral-800 p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2">
                <Image src="/logo.svg" alt="NinePlans" width={24} height={24} />
                <span className="font-semibold">NinePlans</span>
              </Link>
              <button className="btn" onClick={() => setOpen(false)}>✕</button>
            </div>

            <div className="space-y-6">
              <div>
                <div className="text-xs uppercase text-neutral-400 mb-2">Main</div>
                <div className="flex flex-col gap-2">
                  <Link href="/" onClick={() => setOpen(false)} className="nav-link">Home</Link>
                  <Link href="/top" onClick={() => setOpen(false)} className="nav-link">Top</Link>
                  <Link href="/search" onClick={() => setOpen(false)} className="nav-link">Search</Link>
                  <Link href="/submit" onClick={() => setOpen(false)} className="nav-link">Submit</Link>
                </div>
              </div>

              <div>
                <div className="text-xs uppercase text-neutral-400 mb-2">Pages</div>
                <div className="flex flex-col gap-2">
                  {STATIC_PAGES.map(p => (
                    <Link key={p.href} href={p.href} onClick={() => setOpen(false)} className="nav-link">
                      {p.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="border-t border-neutral-800 pt-4">
                {session ? (
                  <div className="flex flex-col gap-2">
                    <Link href="/profile" onClick={() => setOpen(false)} className="nav-link">Profile</Link>
                    <Link href="/profile/settings" onClick={() => setOpen(false)} className="nav-link">Settings</Link>
                    <button className="btn-danger w-full" onClick={() => signOut({ callbackUrl: "/" })}>
                      Sign out
                    </button>
                  </div>
                ) : (
                  <button
                    className="btn-primary w-full"
                    onClick={() => signIn("google", { callbackUrl: "/" })}
                  >
                    Continue with Google
                  </button>
                )}
              </div>
            </div>
          </aside>
        </div>
      )}
    </header>
  );
}

/* Small utility classes used above (scoped to this file by Next.js) */
const _ = `
.btn { border:1px solid #27272a; padding:.4rem .7rem; border-radius:.5rem; }
.btn-primary { background:#1d4ed8; padding:.45rem .75rem; border-radius:.5rem; }
.btn-danger { background:#dc2626; padding:.45rem .75rem; border-radius:.5rem; }
.nav-link { padding:.45rem .5rem; border-radius:.5rem; border:1px solid #27272a; }
`;
