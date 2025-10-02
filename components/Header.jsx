// components/Header.jsx
"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 lg:px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MobileMenu />
          <Link href="/" className="flex items-center gap-3">
            <span className="inline-block h-6 w-6 rounded-full ring-2 ring-sky-500" />
            <span className="font-semibold">NinePlans</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 ml-6">
            <Link href="/" className="text-zinc-200 hover:text-white">Home</Link>
            <Link href="/top" className="text-zinc-200 hover:text-white">Top</Link>
            <Link href="/search" className="text-zinc-200 hover:text-white">Search</Link>
            <Link href="/submit" className="text-zinc-200 hover:text-white">Submit</Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {session ? (
            <>
              <Link
                href="/profile"
                className="hidden sm:inline-flex rounded-md bg-zinc-800 px-3 py-1.5 text-sm hover:bg-zinc-700"
              >
                Profile
              </Link>
              <button
                className="hidden sm:inline-flex rounded-md bg-red-600 px-3 py-1.5 text-sm hover:bg-red-500"
                onClick={() => signOut()}
              >
                Sign out
              </button>
              <Link
                href="/submit"
                className="rounded-md bg-blue-600 px-3 py-1.5 text-sm hover:bg-blue-500"
              >
                Write a post
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-md bg-zinc-800 px-3 py-1.5 text-sm hover:bg-zinc-700"
              >
                Log in
              </Link>
              <Link
                href="/submit"
                className="rounded-md bg-blue-600 px-3 py-1.5 text-sm hover:bg-blue-500"
              >
                Write a post
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
