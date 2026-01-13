'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Home, Flame, Clock, Hash, Bookmark, Settings, ArrowUpRight } from "lucide-react";
import { listenTopCategories } from "@/lib/firestore";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import useAuth from "@/hooks/useAuth";

export default function LeftNav({ tab = "latest" }) {
  const pathname = usePathname();
  const { user } = useAuth();
  const [cats, setCats] = useState([]);

  useEffect(() => listenTopCategories(setCats), []);

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/?tab=trending", label: "Trending", icon: Flame },
    { href: "/?tab=latest", label: "Latest", icon: Clock },
  ];

  const isHome = pathname === "/";

  const getHrefTab = (href) => {
    const idx = href.indexOf("tab=");
    if (idx === -1) return null;
    return href.slice(idx + 4);
  };

  const isActiveNav = (href) => {
    if (!isHome) return href === pathname;
    const hrefTab = getHrefTab(href);
    if (!hrefTab) return tab === "latest" || tab === "home" || !tab;
    return hrefTab === tab;
  };

  return (
    <aside className="hidden lg:block w-[260px] shrink-0">
      <div className="sticky top-[72px] space-y-3">
        <div className="card p-3">
          <div className="text-xs font-semibold text-black/70 px-2 pb-2">Explore</div>
          <div className="space-y-1">
            {navItems.map((it) => {
              const Icon = it.icon;
              return (
                <Link
                  key={it.href}
                  href={it.href}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-black/80 hover:bg-black hover:text-white transition",
                    isActiveNav(it.href) ? "bg-black text-white" : ""
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {it.label}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="card p-3">
          <div className="text-xs font-semibold text-black/70 px-2 pb-2 flex items-center gap-2">
            <Hash className="h-3.5 w-3.5" /> Top categories
          </div>

          <div className="space-y-1">
            {(cats || []).slice(0, 10).map((c) => (
              <Link
                key={c.slug}
                href={`/c/${c.slug}`}
                className={cn(
                  "flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium text-black/80 hover:bg-black hover:text-white transition",
                  pathname === `/c/${c.slug}` ? "bg-black text-white" : ""
                )}
              >
                <span className="truncate">{c.name || c.slug}</span>
                <span className="text-xs text-black/50 group-hover:text-white/70">
                  {(c.postCount || 0).toLocaleString()}
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-2 px-2">
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 text-xs font-semibold text-black/70 hover:text-black"
            >
              Browse all <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        <div className="card p-3">
          <div className="text-xs font-semibold text-black/70 px-2 pb-2">Library</div>
          <div className="space-y-1">
            <Link
              href="/saved"
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-black/80 hover:bg-black hover:text-white transition",
                pathname === "/saved" ? "bg-black text-white" : ""
              )}
            >
              <Bookmark className="h-4 w-4" />
              Saved
            </Link>

            <Link
              href="/settings"
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-black/80 hover:bg-black hover:text-white transition",
                pathname === "/settings" ? "bg-black text-white" : ""
              )}
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </div>

          {!user ? (
            <div className="mt-3 px-2 text-xs text-black/60">
              Sign in to vote, save and comment.
            </div>
          ) : (
            <div className="mt-3 px-2 text-xs text-black/60">
              Signed in as <span className="font-semibold">{user.displayName || "User"}</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
