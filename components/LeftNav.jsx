// components/LeftNav.jsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { listenCategories, seedDefaultCategoriesIfEmpty } from "@/lib/firestore";

export default function LeftNav() {
  const [categories, setCategories] = useState([]);
  const [catLoading, setCatLoading] = useState(true);

  // Seed once + subscribe
  useEffect(() => {
    let unsub = null;

    (async () => {
      try {
        // best-effort seed (if rules block writes, it will fail silently)
        await seedDefaultCategoriesIfEmpty();
      } catch {
        // ignore (UI should not break)
      }

      try {
        unsub = listenCategories((list) => {
          setCategories(Array.isArray(list) ? list : []);
          setCatLoading(false);
        });
      } catch {
        setCategories([]);
        setCatLoading(false);
      }
    })();

    return () => {
      try {
        unsub?.();
      } catch {}
    };
  }, []);

  const hasCats = categories && categories.length > 0;

  // Render only first few in sidebar
  const topCats = useMemo(() => categories.slice(0, 8), [categories]);

  return (
    <div className="space-y-4">
      {/* Explore */}
      <div className="rounded-2xl border bg-white p-4 shadow-sm">
        <div className="text-xs font-semibold text-gray-500">EXPLORE</div>
        <div className="mt-3 space-y-2">
          <Link
            href="/"
            className="block rounded-xl bg-black px-3 py-2 text-sm text-white"
          >
            Home
          </Link>
          <Link
            href="/?feed=trending"
            className="block rounded-xl px-3 py-2 text-sm hover:bg-gray-50"
          >
            Trending
          </Link>
          <Link
            href="/?feed=latest"
            className="block rounded-xl px-3 py-2 text-sm hover:bg-gray-50"
          >
            Latest
          </Link>
        </div>
      </div>

      {/* Categories */}
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

        <div className="mt-3">
          {catLoading ? (
            <div className="text-sm text-gray-600">
              Loading categories…
              <div className="mt-1 text-xs text-gray-500">Fetching list.</div>
            </div>
          ) : hasCats ? (
            <div className="space-y-2">
              {topCats.map((c) => (
                <Link
                  key={c.id}
                  href={`/c/${c.slug}`}
                  className="block rounded-xl border px-3 py-2 text-sm hover:bg-gray-50"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-sm text-gray-600">
              No categories found. Refresh once (seeding runs automatically).
              <div className="mt-2">
                <button
                  onClick={async () => {
                    setCatLoading(true);
                    try {
                      await seedDefaultCategoriesIfEmpty();
                    } catch {}
                    // listener will update; just end loading if nothing happens
                    setTimeout(() => setCatLoading(false), 800);
                  }}
                  className="rounded-xl border px-3 py-2 text-xs hover:bg-gray-50"
                >
                  Refresh
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Most */}
      <div className="rounded-2xl border bg-white p-4 shadow-sm">
        <div className="text-sm font-semibold">Most</div>
        <div className="mt-3 space-y-2 text-sm">
          <Link href="/profile?tab=liked" className="block hover:underline">
            👍 Liked
          </Link>
          <Link href="/profile?tab=commented" className="block hover:underline">
            💬 Commented
          </Link>
          <Link href="/profile?tab=viewed" className="block hover:underline">
            👀 Viewed
          </Link>
          <Link href="/profile?tab=saved" className="block hover:underline">
            🧷 Saved
          </Link>
          <Link href="/profile?tab=shared" className="block hover:underline">
            ↗️ Shared
          </Link>
        </div>
      </div>
    </div>
  );
}
