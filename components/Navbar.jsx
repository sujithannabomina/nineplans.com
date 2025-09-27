// components/Navbar.jsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";

const nav = [
  { href: "/", label: "Home" },
  { href: "/top", label: "Top" },
  { href: "/search", label: "Search" },
  { href: "/submit", label: "Submit" },
];

function isActive(pathname, href) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-900/70 bg-zinc-950/90 backdrop-blur">
      <div className="container flex h-14 items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {/* Uses your logo from /public (logo.svg or logo.png). Falls back to text. */}
          <Link href="/" className="flex items-center gap-2">
            {/* Try svg first; if missing, Next/Image gracefully fails to load */}
            <Image
              src="/logo.svg"
              alt="NinePlans"
              width={28}
              height={28}
              className="rounded-md"
              onError={(e) => {
                // If /logo.svg isn't there, swap to /logo.png
                const img = e.currentTarget;
                if (!img.dataset.fallback) {
                  img.dataset.fallback = "1";
                  img.src = "/logo.png";
                }
              }}
            />
            <span className="text-lg font-semibold tracking-tight">NinePlans</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-md px-3 py-2 text-sm ${
                  isActive(pathname, item.href)
                    ? "bg-zinc-800 text-zinc-100"
                    : "text-zinc-300 hover:bg-zinc-800/70 hover:text-zinc-100"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {session?.user ? (
            <>
              <Link
                href="/profile"
                className="btn-ghost text-sm text-zinc-200 hover:text-white"
              >
                Profile
              </Link>
              <button
                className="btn-ghost text-sm text-zinc-300 hover:text-white"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Sign out
              </button>
              <Link href="/submit" className="btn-primary text-sm">
                Write a post
              </Link>
            </>
          ) : (
            <>
              <button
                className="btn-ghost text-sm text-zinc-300 hover:text-white"
                onClick={() => signIn(undefined, { callbackUrl: "/submit" })}
              >
                Log in
              </button>
              <Link href="/submit" className="btn-primary text-sm">
                Write a post
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
