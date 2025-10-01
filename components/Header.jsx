// components/Header.jsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import MobileMenu from './MobileMenu';

export default function Header() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-800 bg-neutral-950/80 backdrop-blur">
      <div className="mx-auto flex h-14 items-center justify-between gap-3 px-4 md:px-6 lg:px-8 max-w-7xl">
        {/* Left: Hamburger (mobile) + Logo */}
        <div className="flex items-center gap-2">
          <button
            aria-label="Open menu"
            className="inline-flex items-center justify-center rounded-md p-2 hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-700 lg:hidden"
            onClick={() => setOpen(true)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>

          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="NinePlans"
              width={28}
              height={28}
              className="rounded-full ring-1 ring-neutral-700"
              priority
            />
            <span className="font-semibold tracking-wide">NinePlans</span>
          </Link>
        </div>

        {/* Center: desktop nav */}
        <nav className="hidden md:flex items-center gap-4 text-sm">
          <Link href="/" className="hover:text-white text-neutral-300">Home</Link>
          <Link href="/top" className="hover:text-white text-neutral-300">Top</Link>
          <Link href="/search" className="hover:text-white text-neutral-300">Search</Link>
          <Link href="/submit" className="hover:text-white text-neutral-300">Submit</Link>
        </nav>

        {/* Right: auth + write */}
        <div className="flex items-center gap-2">
          {session ? (
            <>
              <Link
                href="/profile"
                className="hidden sm:inline-flex rounded-md border border-neutral-800 bg-neutral-900 px-3 py-1.5 text-sm hover:bg-neutral-800"
              >
                Profile
              </Link>
              <button
                onClick={() => signOut()}
                className="hidden sm:inline-flex rounded-md bg-red-600 px-3 py-1.5 text-sm hover:bg-red-500"
              >
                Sign out
              </button>
            </>
          ) : (
            <button
              onClick={() => signIn('google')}
              className="hidden sm:inline-flex rounded-md border border-neutral-800 bg-neutral-900 px-3 py-1.5 text-sm hover:bg-neutral-800"
            >
              Log in
            </button>
          )}
          <Link
            href="/submit"
            className="inline-flex rounded-md bg-sky-600 px-3 py-1.5 text-sm font-medium hover:bg-sky-500"
          >
            Write a post
          </Link>
        </div>
      </div>

      {/* Mobile drawer */}
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
