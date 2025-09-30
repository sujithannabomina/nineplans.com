// components/Navbar.jsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import clsx from "clsx";

const links = [
  { href: "/", label: "Home" },
  { href: "/top", label: "Top" },
  { href: "/search", label: "Search" },
  { href: "/submit", label: "Submit" },
];

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-800 bg-neutral-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          {/* Put your file as /public/logo.png or /public/logo.svg */}
          <div className="relative h-8 w-8 overflow-hidden rounded-full bg-neutral-800">
            {/* If logo missing, this still renders a circle */}
            <Image
              src="/logo.png"
              alt="NinePlans"
              fill
              sizes="32px"
              className="object-contain"
              onError={(e) => {
                // if no logo file, do nothing (keeps the circle)
              }}
            />
          </div>
          <span className="text-lg font-semibold">NinePlans</span>
        </Link>

        <nav className="ml-2 hidden items-center gap-2 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={clsx(
                "rounded-md px-3 py-1.5 text-sm",
                pathname === l.href
                  ? "bg-neutral-800 text-white"
                  : "text-neutral-300 hover:bg-neutral-800 hover:text-white"
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          {/* Tagline */}
          <p className="hidden text-xs text-neutral-400 sm:block">
            You can write confessions anonymously, even when you&apos;re logged in.
          </p>

          {session ? (
            <>
              <Link
                href="/profile"
                className="rounded-md bg-neutral-800 px-3 py-1.5 text-sm text-white hover:bg-neutral-700"
              >
                Profile
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="rounded-md border border-neutral-700 px-3 py-1.5 text-sm text-neutral-200 hover:bg-neutral-800"
              >
                Sign out
              </button>
              <Link
                href="/submit"
                className="rounded-md bg-sky-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-sky-500"
              >
                Write a post
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={() => signIn("google", { callbackUrl: "/submit" })}
                className="rounded-md border border-neutral-700 px-3 py-1.5 text-sm text-neutral-200 hover:bg-neutral-800"
              >
                Log in
              </button>
              <button
                onClick={() => signIn("google", { callbackUrl: "/submit" })}
                className="rounded-md bg-sky-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-sky-500"
              >
                Write a post
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
