// components/Header.jsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ProfileLink from './ProfileLink';

const nav = [
  { href: '/', label: 'Home' },
  { href: '/top', label: 'Top' },
  { href: '/search', label: 'Search' },
  { href: '/submit', label: 'Submit' },
];

const TAGLINE = 'You can write confessions anonymously, even when you’re logged in.';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-900/70 bg-black/70 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full border border-zinc-600 ring-1 ring-cyan-400/40" />
              <span className="font-semibold tracking-wide">NinePlans</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6 ml-4 text-sm">
              {nav.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  className={`hover:text-white ${
                    pathname === n.href ? 'text-white' : 'text-zinc-400'
                  }`}
                >
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <ProfileLink />
            <Link
              href="/submit"
              className="hidden sm:inline-flex rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium hover:bg-blue-500"
            >
              Write a post
            </Link>
          </div>
        </div>

        {/* Subtle tagline under the bar (no layout disruption) */}
        <div className="hidden md:block pb-3">
          <p className="text-xs text-zinc-400">{TAGLINE}</p>
        </div>
      </div>
    </header>
  );
}
