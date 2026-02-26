// components/Header.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Plus, User, LogOut, Menu, X } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import Logo from "@/components/Logo";

export default function Header() {
  const router = useRouter();
  const { user, login, logout, loading } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-black/92 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-3 sm:px-4 h-16">

        {/* Fix #1: uses Logo.jsx which loads your real /public logos */}
        <Logo />

        {/* Anonymous tagline */}
        <div className="hidden md:flex items-center shrink-0">
          <span className="text-[11px] text-neutral-600 border border-neutral-800 rounded-full px-2.5 py-0.5">
            Post anonymous
          </span>
        </div>

        {/* Search bar */}
        <div className="flex-1 max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-600 pointer-events-none" />
            <input
              placeholder="Search posts, categories..."
              className="w-full h-9 rounded-full border border-neutral-800 bg-neutral-900/60 pl-9 pr-4 text-sm text-neutral-300 placeholder-neutral-600 outline-none focus:border-neutral-600 transition"
            />
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Fix #4: softer border/bg - neutral-700/800 instead of white/20 */}
          <button
            onClick={() => router.push("/submit")}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-neutral-700 bg-neutral-900 px-3 py-1.5 text-sm font-medium text-neutral-300 hover:border-neutral-500 hover:text-neutral-100 transition"
          >
            <Plus className="h-3.5 w-3.5" />
            Create
          </button>

          {loading ? (
            <div className="h-8 w-20 rounded-full bg-neutral-800 animate-pulse" />
          ) : user ? (
            <>
              <Link
                href="/profile"
                className="inline-flex items-center gap-1.5 rounded-full border border-neutral-700 bg-neutral-900 px-3 py-1.5 text-sm font-medium text-neutral-300 hover:border-neutral-500 hover:text-neutral-100 transition"
              >
                {user.photoURL ? (
                  <img src={user.photoURL} alt="" className="h-5 w-5 rounded-full" />
                ) : (
                  <User className="h-3.5 w-3.5" />
                )}
                <span className="hidden sm:block max-w-[80px] truncate">
                  {user.displayName?.split(" ")[0] || "Profile"}
                </span>
              </Link>
              <button
                onClick={logout}
                title="Logout"
                className="inline-flex items-center justify-center h-8 w-8 rounded-full border border-neutral-800 text-neutral-500 hover:border-neutral-600 hover:text-neutral-300 transition"
              >
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </>
          ) : (
            /* Fix #4: neutral-100 instead of pure white */
            <button
              onClick={login}
              className="inline-flex items-center rounded-full bg-neutral-100 px-4 py-1.5 text-sm font-semibold text-neutral-900 hover:bg-neutral-200 transition"
            >
              Sign in
            </button>
          )}

          <button
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="lg:hidden inline-flex items-center justify-center h-9 w-9 rounded-full border border-neutral-800 text-neutral-500 hover:text-neutral-300 hover:border-neutral-600 transition"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-800 bg-[#0d0d0d] px-4 py-3 space-y-0.5">
          {[
            ["/", "🏠", "Home"],
            ["/?feed=trending", "🔥", "Trending"],
            ["/?feed=latest", "🆕", "Latest"],
            ["/submit", "✏️", "Create Post"],
            ["/categories", "📂", "Categories"],
            ["/rules", "📋", "Rules"],
            ["/faq", "❓", "FAQ"],
          ].map(([href, icon, label]) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200 transition"
            >
              <span>{icon}</span>
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}