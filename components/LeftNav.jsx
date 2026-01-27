// components/LeftNav.jsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { listenCategories } from "@/lib/firestore";

export default function LeftNav() {
  const [cats, setCats] = useState([]);
  const [catsLoaded, setCatsLoaded] = useState(false);

  useEffect(() => {
    const unsub = listenCategories((arr) => {
      setCats(arr || []);
      setCatsLoaded(true);
    });
    return () => unsub?.();
  }, []);

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border bg-white p-4 shadow-sm">
        <div className="text-xs font-semibold uppercase text-gray-500">
          Explore
        </div>

        <div className="mt-3 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-xl bg-black px-3 py-2 text-sm text-white"
          >
            Home
          </Link>
          <Link
            href="/?feed=trending"
            className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-gray-50"
          >
            Trending
          </Link>
          <Link
            href="/?feed=latest"
            className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-gray-50"
          >
            Latest
          </Link>
        </div>
      </div>

      <div className="rounded-2xl border bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold">Categories</div>
          <Link
            href="/categories"
            className="text-xs text-gray-500 hover:underline"
          >
            Browse all
          </Link>
        </div>

        <div className="mt-3 max-h-[320px] space-y-1 overflow-auto pr-1">
          {!catsLoaded ? (
            <div className="text-sm text-gray-500">Loading categories…</div>
          ) : cats?.length ? (
            cats.map((c) => (
              <Link
                key={c.slug || c.id}
                href={`/c/${c.slug || c.id}`}
                className="block rounded-xl px-3 py-2 text-sm hover:bg-gray-50"
              >
                {c.name}
              </Link>
            ))
          ) : (
            <div className="text-sm text-gray-500">
              No categories found. Seed categories once and refresh.
            </div>
          )}
        </div>
      </div>

      <div className="rounded-2xl border bg-white p-4 shadow-sm">
        <div className="text-sm font-semibold">Most</div>
        <div className="mt-2 space-y-2 text-sm">
          <Link
            href="/profile?tab=liked"
            className="block rounded-xl px-3 py-2 hover:bg-gray-50"
          >
            👍 Liked
          </Link>
          <Link
            href="/profile?tab=commented"
            className="block rounded-xl px-3 py-2 hover:bg-gray-50"
          >
            💬 Commented
          </Link>
          <Link
            href="/profile?tab=viewed"
            className="block rounded-xl px-3 py-2 hover:bg-gray-50"
          >
            👀 Viewed
          </Link>
          <Link
            href="/profile?tab=saved"
            className="block rounded-xl px-3 py-2 hover:bg-gray-50"
          >
            🔖 Saved
          </Link>
          <Link
            href="/profile?tab=shared"
            className="block rounded-xl px-3 py-2 hover:bg-gray-50"
          >
            🔁 Shared
          </Link>
        </div>
      </div>

      <div className="rounded-2xl border bg-white p-4 shadow-sm">
        <div className="space-y-2 text-sm">
          <Link
            href="/faq"
            className="block rounded-xl px-3 py-2 hover:bg-gray-50"
          >
            FAQ
          </Link>
          <Link
            href="/rules"
            className="block rounded-xl px-3 py-2 hover:bg-gray-50"
          >
            Rules
          </Link>
          <Link
            href="/policy"
            className="block rounded-xl px-3 py-2 hover:bg-gray-50"
          >
            Policy
          </Link>
          <Link
            href="/contact"
            className="block rounded-xl px-3 py-2 hover:bg-gray-50"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
