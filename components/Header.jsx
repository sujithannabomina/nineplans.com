'use client';

import React from "react";
import Link from "next/link";
import { Search, Bell, LogOut, Plus } from "lucide-react";
import Logo from "@/components/Logo";
import useAuth from "@/hooks/useAuth";

export default function Header({ q, setQ }) {
  const { user, loading, login, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-black/10">
      <div className="mx-auto max-w-6xl px-3 py-3 flex items-center gap-3">
        <Link href="/" className="no-underline">
          <Logo />
        </Link>

        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-black/50" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search posts, categories, tags…"
              className="input pl-9"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/submit" className="btn-outline no-underline hidden sm:inline-flex">
            <Plus className="h-4 w-4" /> Create
          </Link>

          {loading ? (
            <div className="h-10 w-24 rounded-xl skeleton" />
          ) : user ? (
            <>
              <button className="btn-outline" title="Notifications (MVP soon)" aria-label="Notifications">
                <Bell className="h-4 w-4" />
              </button>
              <Link href="/profile/settings" className="btn-outline no-underline">
                <img
                  src={user.photoURL || "https://www.gravatar.com/avatar/?d=mp"}
                  alt=""
                  className="h-5 w-5 rounded-full border border-black/10"
                />
                <span className="hidden sm:inline">{user.primaryAlias}</span>
              </Link>
              <button className="btn" onClick={logout} title="Logout">
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            <button className="btn" onClick={login}>Continue with Google</button>
          )}
        </div>
      </div>
    </header>
  );
}
