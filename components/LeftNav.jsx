"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Home, Flame, Clock, Hash, Bookmark, Settings, ArrowUpRight } from "lucide-react";
import { listenTopCategories } from "@/lib/firestore";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import useAuth from "@/hooks/useAuth";

export default function LeftNav() {
  const pathname = usePathname();
  const [tab, setTab] = useState("latest");

  useEffect(() => {
    try {
      const t =
        typeof window !== "undefined"
          ? new URLSearchParams(window.location.search).get("tab")
          : null;
      setTab(t || "latest");
    } catch {
      setTab("latest");
    }
  }, [pathname]);

  const { user } = useAuth();
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const unsub = listenTopCategories((arr) => setCats(arr || []));
    return () => unsub?.();
  }, []);

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/?tab=trending", label: "Trending", icon: Flame },
    { href: "/?tab=latest", label: "Latest", icon: Clock },
  ];

  return (
    <aside className="hidden lg:block w-[260px] shrink-0">
      <div className="sticky top-[72px] space-y-3">
        <div className="card p-3">
          <div className="text-xs font-semibold text-black/70 px-2 pb-2">Explore</div>
          <nav className="space-y-1">
            {navItems.map((it) => (
              <Link
                key={it.href}
                href={it.href}
                className={cn(
                  "flex items-center gap-2 rounded-xl px-3 py-2 text-sm no-underline hover:bg-black hover:text-white transition",
                  (it.href === "/" && pathname === "/" && tab === "latest") ||
                    (it.href.includes("tab=") && it.href.endsWith(tab))
                    ? "bg-black text-white"
                    : ""
                )}
              >
                <it.icon className="h-4 w-4" />
                {it.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="card p-3">
          <div className="flex items-center justify-between px-2 pb-2">
            <div className="text-xs font-semibold text-black/70">Categories</div>
            <Hash className="h-4 w-4 text-black/40" />
          </div>

          <div className="space-y-1 max-h-[420px] overflow-auto pr-1">
            {cats.length === 0 ? (
              <div className="h-20 rounded-xl skeleton" />
            ) : (
              cats.map((c) => (
                <Link
                  key={c.slug}
                  href={`/c/${c.slug}`}
                  className={cn(
                    "flex items-center justify-between rounded-xl px-3 py-2 text-sm no-underline hover:bg-black hover:text-white transition",
                    pathname === `/c/${c.slug}` ? "bg-black text-white" : ""
                  )}
                >
                  <span className="truncate">{c.name}</span>
                  <span className="text-[11px] opacity-70">{c.postCount || 0}</span>
                </Link>
              ))
            )}
          </div>
        </div>

        {user ? (
          <div className="card p-3">
            <div className="text-xs font-semibold text-black/70 px-2 pb-2">You</div>
            <div className="space-y-1">
              <Link
                href="/saved"
                className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm no-underline hover:bg-black hover:text-white transition"
              >
                <Bookmark className="h-4 w-4" /> Saved (soon)
              </Link>
              <Link
                href="/profile/settings"
                className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm no-underline hover:bg-black hover:text-white transition"
              >
                <Settings className="h-4 w-4" /> Settings
              </Link>
              <Link
                href="/submit"
                className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm no-underline hover:bg-black hover:text-white transition"
              >
                <ArrowUpRight className="h-4 w-4" /> Create post
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </aside>
  );
}
