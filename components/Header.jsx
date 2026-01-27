// components/Header.jsx
"use client";

import { useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Plus, Search, User, LogOut } from "lucide-react";
import Logo from "@/components/Logo";
import useAuth from "@/hooks/useAuth";

export default function Header({ query, onQueryChange }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, login, logout } = useAuth();

  const showSearch = useMemo(() => {
    // show search only on main feeds (keep original behavior)
    if (!pathname) return true;
    return pathname === "/" || pathname.startsWith("/c/");
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
        {/* Left: brand */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <Logo />
          </Link>
        </div>

        {/* Middle: search */}
        <div className="flex-1">
          {showSearch ? (
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <input
                value={query ?? ""}
                onChange={(e) => onQueryChange?.(e.target.value)}
                placeholder="Search posts, categories, tags..."
                className="w-full rounded-full border border-neutral-200 bg-white px-10 py-2 text-sm outline-none ring-0 focus:border-neutral-300"
              />
            </div>
          ) : null}
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => router.push("/submit")}
            className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-50"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Create</span>
          </button>

          {user ? (
            <>
              <Link
                href="/profile"
                className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-50"
              >
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Profile</span>
              </Link>

              <button
                onClick={logout}
                className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            <button
              onClick={login}
              className="inline-flex items-center rounded-full bg-black px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
            >
              Continue with Google
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
