// components/MobileMenu.jsx
'use client';

import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';

const categories = [
  'Confessions','Posts','Product Reviews','Movie Reviews','Place Reviews','Post Ideas','Post Ads','Business Info',
  'Sports','Science','Automobile','Education','Anime','Technology','Travel','Food','Health','Finance','Fashion',
  'Books','Music','Gaming','Photography','Art','History','Relationships','Career','Pets','Gardening','DIY',
  'Parenting','Fitness'
];

const staticPages = [
  { href: '/community', label: 'Community' },
  { href: '/faq', label: 'FAQ' },
  { href: '/rules', label: 'Rules' },
  { href: '/policy', label: 'Policy' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
  { href: '/trademark', label: 'Trademark' },
];

export default function MobileMenu({ open, onClose }) {
  const { data: session } = useSession();

  return (
    <div
      className={`fixed inset-0 z-50 lg:hidden ${open ? '' : 'pointer-events-none'}`}
      aria-hidden={!open}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`absolute left-0 top-0 h-full w-[88%] max-w-sm bg-neutral-950 p-4 shadow-xl transition-transform
        ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="mb-3 flex items-center justify-between">
          <span className="font-semibold">Menu</span>
          <button
            aria-label="Close menu"
            className="rounded-md p-2 hover:bg-neutral-800"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-2 gap-2 text-sm">
          <Link href="/" onClick={onClose} className="rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2 text-center hover:bg-neutral-800">Home</Link>
          <Link href="/top" onClick={onClose} className="rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2 text-center hover:bg-neutral-800">Top</Link>
          <Link href="/search" onClick={onClose} className="rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2 text-center hover:bg-neutral-800">Search</Link>
          <Link href="/submit" onClick={onClose} className="rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2 text-center hover:bg-neutral-800">Submit</Link>
        </div>

        {/* Auth action */}
        <div className="mt-3">
          {session ? (
            <div className="flex gap-2">
              <Link
                href="/profile"
                onClick={onClose}
                className="flex-1 rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2 text-center text-sm hover:bg-neutral-800"
              >
                Profile
              </Link>
              <button
                onClick={() => { signOut(); onClose(); }}
                className="flex-1 rounded-md bg-red-600 px-3 py-2 text-sm hover:bg-red-500"
              >
                Sign out
              </button>
            </div>
          ) : (
            <button
              onClick={() => { signIn('google'); onClose(); }}
              className="w-full rounded-md bg-sky-600 px-3 py-2 text-sm font-medium hover:bg-sky-500"
            >
              Sign in with Google
            </button>
          )}
        </div>

        <hr className="my-4 border-neutral-800" />

        {/* Static pages (two-column compact) */}
        <div className="grid grid-cols-2 gap-2 text-sm">
          {staticPages.map(p => (
            <Link key={p.href} href={p.href} onClick={onClose} className="rounded-md px-2 py-1.5 hover:bg-neutral-900">
              {p.label}
            </Link>
          ))}
        </div>

        <hr className="my-4 border-neutral-800" />

        {/* Categories (collapsible so content isn't pushed down) */}
        <details className="group">
          <summary className="cursor-pointer list-none rounded-md bg-neutral-900 px-3 py-2 text-sm hover:bg-neutral-800">
            Categories
            <span className="float-right text-neutral-400 group-open:rotate-180 transition-transform">▾</span>
          </summary>
          <nav className="mt-2 max-h-[45vh] overflow-y-auto pr-2">
            <ul className="space-y-1 text-sm">
              {categories.map((label) => {
                const slug = label.toLowerCase().replace(/\s+/g, '-');
                return (
                  <li key={slug}>
                    <Link
                      href={`/c/${slug}`}
                      onClick={onClose}
                      className="block rounded-md px-3 py-2 hover:bg-neutral-900"
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </details>
      </div>
    </div>
  );
}
