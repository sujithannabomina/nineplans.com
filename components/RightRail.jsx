'use client';

import React from "react";
import Link from "next/link";
import { Plus, Sparkles, Filter, ShieldAlert } from "lucide-react";
import AdSlot from "@/components/AdSlot";
import useAuth from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

export default function RightRail({ tab, setTab }) {
  const { user, loading, login } = useAuth();
  const topSlot = process.env.NEXT_PUBLIC_ADSENSE_SLOT_RIGHT_TOP || "";
  const bottomSlot = process.env.NEXT_PUBLIC_ADSENSE_SLOT_RIGHT_BOTTOM || "";

  const tabs = [
    { id: "trending", label: "Trending" },
    { id: "latest", label: "Latest" },
    { id: "top", label: "Top" },
  ];

  return (
    <aside className="hidden xl:block w-[300px] shrink-0">
      <div className="sticky top-[72px] space-y-3">
        <div className="card p-4">
          {loading ? (
            <div className="h-24 rounded-xl skeleton" />
          ) : user ? (
            <>
              <div className="flex items-center gap-3">
                <img
                  src={user.photoURL || "https://www.gravatar.com/avatar/?d=mp"}
                  alt=""
                  className="h-10 w-10 rounded-2xl border border-black/10"
                />
                <div className="min-w-0">
                  <div className="text-sm font-bold truncate">{user.primaryAlias}</div>
                  <div className="text-xs text-black/60 truncate">{user.email}</div>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <Link href="/submit" className="btn no-underline">
                  <Plus className="h-4 w-4" /> Post
                </Link>
                <Link href="/profile/settings" className="btn-outline no-underline">
                  <Sparkles className="h-4 w-4" /> Profile
                </Link>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="text-black/60">Karma</span>
                <span className="font-semibold">{user.karma || 0}</span>
              </div>
            </>
          ) : (
            <>
              <div className="text-sm font-bold">Join NinePlans</div>
              <div className="text-xs text-black/60 mt-1">Vote, comment, post — while staying alias-first.</div>
              <button className="btn mt-3 w-full" onClick={login}>Continue with Google</button>
            </>
          )}
        </div>

        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-bold flex items-center gap-2">
              <Filter className="h-4 w-4" /> Feed
            </div>
            <div className="text-xs text-black/60">controls</div>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={cn(
                  "rounded-xl border border-black/15 px-3 py-2 text-sm font-medium hover:bg-black hover:text-white transition",
                  tab === t.id ? "bg-black text-white border-black" : ""
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="mt-3 text-xs text-black/60">
            Trending is simple in MVP. Next: engagement-based trending + personalization.
          </div>
        </div>

        <AdSlot slot={topSlot} className="card p-4" />

        <div className="card p-4">
          <div className="flex items-center gap-2 text-sm font-bold">
            <ShieldAlert className="h-4 w-4" /> Rules
          </div>
          <ul className="mt-2 text-xs text-black/70 list-disc pl-4 space-y-1">
            <li>No hate, harassment, or threats.</li>
            <li>No spam, scams, or doxxing.</li>
            <li>Report abuse — moderation is fast.</li>
          </ul>
          <div className="text-xs text-black/60 mt-2">Ads are hidden for “under_review” posts (safer for AdSense).</div>
        </div>

        <AdSlot slot={bottomSlot} className="card p-4" />
      </div>
    </aside>
  );
}
