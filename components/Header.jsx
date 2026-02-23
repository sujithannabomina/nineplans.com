"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, Plus, User, LogOut, Menu, X } from "lucide-react";
import useAuth from "@/hooks/useAuth";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, login, logout, loading } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-3 sm:px-4 h-16">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <span className="text-black font-black text-sm">9</span>
          </div>
          <span className="font-bold text-lg text-white hidden sm:block">NinePlans</span>
        </Link>

        {/* Anonymous tagline - desktop */}
        <div className="hidden md:flex items-center">
          <span className="text-xs text-white/40 border border-white/10 rounded-full px-3 py-1">
            Post anonymous
          </span>
        </div>

        {/* Search bar */}
        <div className="flex-1 max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 pointer-events-none" />
            <input
              placeholder="Search posts, categories..."
              className="w-full h-9 rounded-full border border-white/10 bg-white/5 pl-9 pr-4 text-sm text-white placeholder-white/30 outline-none focus:border-white/30 focus:bg-white/8 transition"
            />
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Create post button */}
          <button
            onClick={() => router.push("/submit")}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-sm font-medium text-white hover:bg-white/10 transition"
          >
            <Plus className="h-4 w-4" />
            <span>Create</span>
          </button>

          {loading ? (
            <div className="h-8 w-20 rounded-full bg-white/10 animate-pulse" />
          ) : user ? (
            <>
              <Link
                href="/profile"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-sm font-medium text-white hover:bg-white/10 transition"
              >
                {user.photoURL ? (
                  <img src={user.photoURL} alt="" className="h-5 w-5 rounded-full" />
                ) : (
                  <User className="h-4 w-4" />
                )}
                <span className="hidden sm:block max-w-[80px] truncate">
                  {user.displayName?.split(" ")[0] || "Profile"}
                </span>
              </Link>
              <button
                onClick={logout}
                className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/5 px-2.5 py-1.5 text-sm text-white/70 hover:text-white hover:bg-white/10 transition"
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </>
          ) : (
            <button
              onClick={login}
              className="inline-flex items-center rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-black hover:bg-neutral-200 transition"
            >
              Sign in
            </button>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="lg:hidden inline-flex items-center justify-center h-9 w-9 rounded-full border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-black px-4 py-4 space-y-2">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block rounded-xl px-3 py-2 text-sm text-white hover:bg-white/10">🏠 Home</Link>
          <Link href="/?feed=trending" onClick={() => setMobileMenuOpen(false)} className="block rounded-xl px-3 py-2 text-sm text-white/70 hover:bg-white/10">🔥 Trending</Link>
          <Link href="/?feed=latest" onClick={() => setMobileMenuOpen(false)} className="block rounded-xl px-3 py-2 text-sm text-white/70 hover:bg-white/10">🆕 Latest</Link>
          <Link href="/submit" onClick={() => setMobileMenuOpen(false)} className="block rounded-xl px-3 py-2 text-sm text-white/70 hover:bg-white/10">✏️ Create Post</Link>
          <Link href="/categories" onClick={() => setMobileMenuOpen(false)} className="block rounded-xl px-3 py-2 text-sm text-white/70 hover:bg-white/10">📂 Categories</Link>
          <div className="border-t border-white/10 pt-2">
            <Link href="/rules" onClick={() => setMobileMenuOpen(false)} className="block rounded-xl px-3 py-2 text-sm text-white/50 hover:bg-white/10">Rules</Link>
            <Link href="/faq" onClick={() => setMobileMenuOpen(false)} className="block rounded-xl px-3 py-2 text-sm text-white/50 hover:bg-white/10">FAQ</Link>
          </div>
        </div>
      )}
    </header>
  );
}
