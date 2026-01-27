// components/LeftNav.jsx
"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { listenCategories } from "@/lib/firestore";

const DEFAULT_CATEGORIES = [
  { id: "confessions", slug: "confessions", name: "Confessions" },
  { id: "posts", slug: "posts", name: "Posts" },
  { id: "product-reviews", slug: "product-reviews", name: "Product Reviews" },
  { id: "movie-reviews", slug: "movie-reviews", name: "Movie Reviews" },
  { id: "place-reviews", slug: "place-reviews", name: "Place Reviews" },
  { id: "post-ideas", slug: "post-ideas", name: "Post Ideas" },
  { id: "post-ads", slug: "post-ads", name: "Post Ads" },
  { id: "business-info", slug: "business-info", name: "Business Info" },
  { id: "sports", slug: "sports", name: "Sports" },
  { id: "science", slug: "science", name: "Science" },
  { id: "automobile", slug: "automobile", name: "Automobile" },
  { id: "education", slug: "education", name: "Education" },
  { id: "anime", slug: "anime", name: "Anime" },
  { id: "games", slug: "games", name: "Games" },
  { id: "technology", slug: "technology", name: "Technology" },
  { id: "health-fitness", slug: "health-fitness", name: "Health & Fitness" },
  { id: "relationships", slug: "relationships", name: "Relationships" },
  { id: "career-jobs", slug: "career-jobs", name: "Career & Jobs" },
  { id: "finance", slug: "finance", name: "Finance" },
  { id: "food-reviews", slug: "food-reviews", name: "Food Reviews" },
  { id: "travel", slug: "travel", name: "Travel" },
  { id: "photography-art", slug: "photography-art", name: "Photography & Art" },
];

export default function LeftNav() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const unsub = listenCategories((arr) => {
      // If empty or not seeded, keep UI alive with defaults
      if (!arr || arr.length === 0) {
        setCats(DEFAULT_CATEGORIES);
      } else {
        setCats(arr);
      }
    });

    // Safety fallback (if listener fails silently)
    const t = setTimeout(() => {
      setCats((prev) => (prev?.length ? prev : DEFAULT_CATEGORIES));
    }, 1200);

    return () => {
      clearTimeout(t);
      unsub?.();
    };
  }, []);

  const list = useMemo(() => cats?.length ? cats : DEFAULT_CATEGORIES, [cats]);

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
          {list.map((c) => (
            <Link
              key={c.id || c.slug}
              href={`/c/${c.slug}`}
              className="block rounded-xl px-3 py-2 text-sm hover:bg-gray-50"
            >
              {c.name}
            </Link>
          ))}
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
          <Link href="/faq" className="block rounded-xl px-3 py-2 hover:bg-gray-50">
            FAQ
          </Link>
          <Link href="/rules" className="block rounded-xl px-3 py-2 hover:bg-gray-50">
            Rules
          </Link>
          <Link href="/policy" className="block rounded-xl px-3 py-2 hover:bg-gray-50">
            Policy
          </Link>
          <Link href="/contact" className="block rounded-xl px-3 py-2 hover:bg-gray-50">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
