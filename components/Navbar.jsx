"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import clsx from "clsx";

export default function Navbar() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-800 bg-neutral-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          {/* Mobile hamburger */}
          <button
            className="lg:hidden rounded-lg border border-neutral-800 px-3 py-2 text-sm"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            ☰
          </button>

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

          {/* Desktop primary nav */}
          <nav className="ml-6 hidden gap-4 lg:flex">
            <Link href="/" className="text-sm text-neutral-300 hover:text-white">Home</Link>
            <Link href="/top" className="text-sm text-neutral-300 hover:text-white">Top</Link>
            <Link href="/search" className="text-sm text-neutral-300 hover:text-white">Search</Link>
            <Link href="/submit" className="text-sm text-neutral-300 hover:text-white">Submit</Link>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {session?.user ? (
            <>
              <Link href="/profile" className="rounded-md bg-neutral-800 px-3 py-2 text-sm hover:bg-neutral-700">
                Profile
              </Link>
              <button
                className="rounded-md bg-red-600 px-3 py-2 text-sm hover:bg-red-500"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Sign out
              </button>
              <Link
                href="/submit"
                className="hidden rounded-md bg-blue-600 px-3 py-2 text-sm hover:bg-blue-500 md:inline-block"
              >
                Write a post
              </Link>
            </>
          ) : (
            <>
              <button
                className="rounded-md bg-neutral-800 px-3 py-2 text-sm hover:bg-neutral-700"
                onClick={() => signIn("google", { callbackUrl: "/" })}
              >
                Log in
              </button>
              <button
                className="hidden rounded-md bg-blue-600 px-3 py-2 text-sm hover:bg-blue-500 md:inline-block"
                onClick={() => signIn("google", { callbackUrl: "/submit" })}
              >
                Write a post
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={clsx(
          "lg:hidden border-t border-neutral-800 bg-neutral-950",
          open ? "block" : "hidden"
        )}
      >
        <nav className="mx-auto max-w-6xl px-4 py-3 grid grid-cols-2 gap-2">
          <Link href="/" className="nav-item" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/top" className="nav-item" onClick={() => setOpen(false)}>Top</Link>
          <Link href="/search" className="nav-item" onClick={() => setOpen(false)}>Search</Link>
          <Link href="/submit" className="nav-item" onClick={() => setOpen(false)}>Submit</Link>

          <div className="col-span-2 hr" />

          <Link href="/profile" className="nav-item col-span-2" onClick={() => setOpen(false)}>Profile</Link>
          <Link href="/community" className="nav-item" onClick={() => setOpen(false)}>Community</Link>
          <Link href="/faq" className="nav-item" onClick={() => setOpen(false)}>FAQ</Link>
          <Link href="/rules" className="nav-item" onClick={() => setOpen(false)}>Rules</Link>
          <Link href="/policy" className="nav-item" onClick={() => setOpen(false)}>Policy</Link>
          <Link href="/privacy" className="nav-item" onClick={() => setOpen(false)}>Privacy</Link>
          <Link href="/terms" className="nav-item" onClick={() => setOpen(false)}>Terms</Link>
          <Link href="/trademark" className="nav-item" onClick={() => setOpen(false)}>Trademark</Link>

          {session?.user ? (
            <button
              className="col-span-2 rounded-md bg-red-600 px-3 py-2 text-sm hover:bg-red-500"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Sign out
            </button>
          ) : (
            <button
              className="col-span-2 rounded-md bg-blue-600 px-3 py-2 text-sm hover:bg-blue-500"
              onClick={() => signIn("google", { callbackUrl: "/" })}
            >
              Sign in with Google
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
