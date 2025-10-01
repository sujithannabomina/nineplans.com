// components/Header.jsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const isActive = (p) => pathname === p;

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-800 bg-black/70 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-14 items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <span className="inline-block h-6 w-6 rounded-full border border-sky-400" />
              <span className="font-semibold">NinePlans</span>
            </Link>
            <span className="hidden text-xs text-neutral-400 md:inline">
              You can write confessions anonymously, even when you&apos;re logged in.
            </span>
          </div>

          {/* Primary nav */}
          <nav className="flex items-center gap-6 text-sm">
            <Link className={isActive("/") ? "text-white" : "text-neutral-300 hover:text-white"} href="/">Home</Link>
            <Link className={isActive("/top") ? "text-white" : "text-neutral-300 hover:text-white"} href="/top">Top</Link>
            <Link className={isActive("/search") ? "text-white" : "text-neutral-300 hover:text-white"} href="/search">Search</Link>
            <Link className={isActive("/submit") ? "text-white" : "text-neutral-300 hover:text-white"} href="/submit">Submit</Link>
            <Link href="/login" className="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-500">Write a post</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
