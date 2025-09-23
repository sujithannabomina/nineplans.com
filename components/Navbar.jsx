// components/Navbar.jsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import MobileBar from "./MobileBar";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-900 bg-black/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-3">
        {/* Mobile menu */}
        <div className="lg:hidden">
          <MobileBar />
        </div>

        {/* Logo + Brand */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo-circle-1024.png"
            alt="NinePlans"
            width={28}
            height={28}
            className="rounded-full"
            priority
          />
          <span className="hidden text-sm font-semibold tracking-wide sm:inline">
            NINEPLANS
          </span>
        </Link>

        {/* Primary nav */}
        <nav className="ml-auto hidden items-center gap-6 lg:flex">
          <Link href="/" className="text-sm text-zinc-200 hover:text-white">
            Home
          </Link>
          <Link href="/submit" className="text-sm text-zinc-200 hover:text-white">
            Submit
          </Link>
          <Link href="/top" className="text-sm text-zinc-200 hover:text-white">
            Top
          </Link>
          <Link href="/search" className="text-sm text-zinc-200 hover:text-white">
            Search
          </Link>
        </nav>

        {/* Auth pill */}
        <div className="ml-2">
          {session ? (
            <div className="flex items-center gap-2">
              <Link
                href="/profile"
                className="hidden rounded-full border border-zinc-800 px-3 py-1 text-sm hover:bg-zinc-900 sm:inline"
              >
                {session.user?.name ?? "Profile"}
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="rounded-full border border-zinc-800 px-3 py-1 text-sm hover:bg-zinc-900"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="rounded-full border border-zinc-800 px-3 py-1 text-sm hover:bg-zinc-900"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Single banner (removed duplicate below the bar) */}
      <div className="border-t border-zinc-900 bg-zinc-950/50 text-center text-xs text-zinc-400">
        <div className="mx-auto max-w-6xl px-3 py-2">
          You can write confessions anonymously, even when you&apos;re logged in.
        </div>
      </div>
    </header>
  );
}
