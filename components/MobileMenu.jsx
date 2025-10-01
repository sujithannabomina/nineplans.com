"use client";

import Link from "next/link";

export default function MobileMenu({ open, onClose }) {
  return (
    <div
      className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/60 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />
      {/* Panel */}
      <div
        className={`absolute left-0 top-0 h-full w-[82%] max-w-sm bg-black border-r border-zinc-800 p-4 overflow-y-auto transition-transform ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="mb-3 flex items-center justify-between">
          <span className="font-semibold">NinePlans</span>
          <button
            onClick={onClose}
            className="h-8 w-8 rounded-md border border-zinc-800"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Top actions */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <Link className="rounded-md border border-zinc-800 p-2" href="/">Home</Link>
          <Link className="rounded-md border border-zinc-800 p-2" href="/top">Top</Link>
          <Link className="rounded-md border border-zinc-800 p-2" href="/search">Search</Link>
          <Link className="rounded-md border border-zinc-800 p-2" href="/submit">Submit</Link>
        </div>

        <div className="my-4 h-px bg-zinc-800" />

        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <Link href="/profile" className="text-zinc-300">Profile</Link>
          <Link href="/faq" className="text-zinc-300">FAQ</Link>
          <Link href="/community" className="text-zinc-300">Community</Link>
          <Link href="/policy" className="text-zinc-300">Policy</Link>
          <Link href="/privacy" className="text-zinc-300">Privacy</Link>
          <Link href="/rules" className="text-zinc-300">Rules</Link>
          <Link href="/terms" className="text-zinc-300">Terms</Link>
          <Link href="/trademark" className="text-zinc-300">Trademark</Link>
        </div>

        <div className="mt-6">
          <Link
            href="/login"
            className="inline-flex w-full items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-500"
          >
            Sign in with Google
          </Link>
        </div>

        {/* Categories list (scrolls inside panel, doesn’t push content) */}
        <div className="mt-6">
          <p className="mb-2 text-xs font-semibold text-zinc-400">CATEGORIES</p>
          <div className="space-y-2 text-sm">
            {/* Keep links light to avoid huge menu length feeling on mobile */}
            {[
              "confessions","posts","product-reviews","movie-reviews","place-reviews","post-ideas","post-ads",
              "business-info","sports","science","automobile","education","anime","technology","travel","food",
              "health","finance","fashion","books","music","gaming","photography","art","history","relationships",
              "career","pets","gardening","diy","parenting","fitness"
            ].map((slug) => (
              <Link key={slug} href={`/c/${slug}`} onClick={onClose} className="block text-zinc-300">
                {slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
