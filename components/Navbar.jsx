// components/Navbar.jsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import MobileBar from "./MobileBar";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-black/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-3 lg:px-4 h-16">
          {/* Hamburger (mobile only) */}
          <button
            aria-label="Open menu"
            className="lg:hidden rounded-md p-2 text-zinc-300 hover:bg-white/10"
            onClick={() => setOpen(true)}
          >
            {/* simple icon */}
            <div className="space-y-1">
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
            </div>
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo-circle-1024.png"
              alt="NinePlans"
              width={28}
              height={28}
              className="rounded-full"
              priority
            />
            <span className="hidden sm:block text-sm font-semibold tracking-wide">
              NINEPLANS
            </span>
          </Link>

          {/* Primary nav */}
          <nav className="ml-auto hidden md:flex items-center gap-2 text-sm">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/submit">Submit</NavLink>
            <NavLink href="/top">Top</NavLink>
            <NavLink href="/search">Search</NavLink>
            {/* Keep your existing login/avatar component on the far right if you have it */}
          </nav>
        </div>
      </header>

      {/* Mobile drawer */}
      <MobileBar open={open} onClose={() => setOpen(false)} />
    </>
  );
}

function NavLink({ href, children }) {
  return (
    <Link
      href={href}
      className="rounded-md px-3 py-2 text-zinc-300 hover:text-white hover:bg-white/10"
    >
      {children}
    </Link>
  );
}
