"use client";

import Link from "next/link";
import MobileCategories from "@/components/MobileCategories";

export default function Navbar() {
  return (
    <header className="border-b border-zinc-800 bg-zinc-950/60 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          {/* Use your logo from /public; plain <img> avoids build errors if file name changes */}
          <img
            src="/logo.png"
            alt="NinePlans"
            className="h-8 w-8 rounded-md bg-zinc-800 object-contain"
          />
          <span className="text-lg font-semibold text-zinc-200">NinePlans</span>
        </Link>

        <nav className="hidden gap-4 text-zinc-200 md:flex">
          <Link href="/" className="hover:text-sky-300">Home</Link>
          <Link href="/top" className="hover:text-sky-300">Top</Link>
          <Link href="/search" className="hover:text-sky-300">Search</Link>
          <Link
            href="/submit"
            className="rounded-md bg-sky-600 px-3 py-1.5 text-white hover:bg-sky-500"
          >
            Submit
          </Link>
          <Link href="/profile" className="hover:text-sky-300">Profile</Link>
        </nav>

        {/* Mobile: Categories launcher + key links */}
        <div className="flex items-center gap-2 md:hidden">
          <MobileCategories />
          <Link
            href="/submit"
            className="rounded-md bg-sky-600 px-3 py-1.5 text-white"
          >
            Submit
          </Link>
        </div>
      </div>
    </header>
  );
}
