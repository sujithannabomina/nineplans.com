"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-black/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Mobile hamburger */}
            <button
              aria-label="Open menu"
              className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/15"
              onClick={() => setOpen(true)}
            >
              <span className="i">≡</span>
            </button>

            {/* Brand */}
            <Link href="/" className="flex items-center gap-3">
              {/* Use the working PNG from /public to avoid the broken SVG */}
              <Image
                src="/logo-circle-1024.png"
                alt="NinePlans"
                width={28}
                height={28}
                className="rounded-full"
                priority
              />
              <span className="font-semibold tracking-wide">NINEPLANS</span>
            </Link>
          </div>

          {/* Primary nav (desktop) */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/">Home</Link>
            <Link href="/submit">Submit</Link>
            <Link href="/top">Top</Link>
            <Link href="/search">Search</Link>
          </nav>

          {/* Auth */}
          <div className="flex items-center gap-2">
            {!session?.user ? (
              <button
                onClick={() => signIn("google")}
                className="rounded-full bg-white text-black px-4 py-1.5 text-sm"
              >
                Login
              </button>
            ) : (
              <>
                <Link
                  href="/profile"
                  className="hidden sm:flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-sm"
                >
                  {session.user.image && (
                    <Image
                      src={session.user.image}
                      alt={session.user.name ?? "Profile"}
                      width={22}
                      height={22}
                      className="rounded-full"
                    />
                  )}
                  <span className="max-w-[180px] truncate">
                    {session.user.name ?? "Profile"}
                  </span>
                </Link>
                <button
                  onClick={() => signOut()}
                  className="rounded-full border border-white/15 px-3 py-1.5 text-sm"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-80 max-w-[85%] bg-black border-r border-white/10 p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Image
                  src="/logo-circle-1024.png"
                  alt="NinePlans"
                  width={28}
                  height={28}
                  className="rounded-full"
                />
                <span className="font-semibold">NINEPLANS</span>
              </div>
              <button
                aria-label="Close"
                onClick={() => setOpen(false)}
                className="h-8 w-8 rounded-md border border-white/15"
              >
                ✕
              </button>
            </div>

            <nav className="space-y-1">
              <Link onClick={() => setOpen(false)} href="/" className="block px-2 py-2 rounded hover:bg-white/5">Home</Link>
              <Link onClick={() => setOpen(false)} href="/submit" className="block px-2 py-2 rounded hover:bg-white/5">Submit</Link>
              <Link onClick={() => setOpen(false)} href="/top" className="block px-2 py-2 rounded hover:bg-white/5">Top</Link>
              <Link onClick={() => setOpen(false)} href="/search" className="block px-2 py-2 rounded hover:bg-white/5">Search</Link>
            </nav>

            <div className="mt-6 border-t border-white/10 pt-4">
              <p className="text-xs uppercase text-white/40 mb-2">Categories</p>
              {/* Reuse the same links the left rail uses via /post?cat=... */}
              <div className="grid grid-cols-1 gap-1">
                {[
                  "Confessions","Posts","Product Reviews","Movie Reviews","Place Reviews","Post Ideas",
                  "Post Ads","Business Info","Sports","Science","Automobile","Education","Anime","Games",
                ].map((c) => (
                  <Link
                    key={c}
                    onClick={() => setOpen(false)}
                    href={`/post?cat=${encodeURIComponent(c)}`}
                    className="block px-2 py-2 rounded hover:bg-white/5"
                  >
                    {c}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
