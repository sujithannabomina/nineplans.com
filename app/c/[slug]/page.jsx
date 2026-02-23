"use client";

import { useEffect, useState } from "react";
import Shell from "@/components/Shell";
import PostCard from "@/components/PostCard";
import { listenFeed } from "@/lib/firestore";
import Link from "next/link";

const CATEGORY_ICONS = {
  confessions: "🤫", posts: "📝", "product-reviews": "🛍️", "movie-reviews": "🎬",
  "place-reviews": "📍", "post-ideas": "💡", "post-ads": "📢", "business-info": "💼",
  sports: "⚽", science: "🔬", automobile: "🚗", education: "📚", anime: "⛩️",
  games: "🎮", technology: "💻", "health-fitness": "💪", relationships: "❤️",
  "career-jobs": "👔", finance: "💰", "food-reviews": "🍜", travel: "✈️", "photography-art": "📸",
};

function slugToName(slug) {
  return slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

export default function CategoryPage({ params }) {
  const slug = params?.slug;
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const unsub = listenFeed({ mode: "latest", categorySlug: slug }, (list) => {
      setPosts(Array.isArray(list) ? list : []);
      setLoading(false);
    });
    return () => unsub?.();
  }, [slug]);

  const icon = CATEGORY_ICONS[slug] || "📌";
  const name = slugToName(slug || "");

  return (
    <Shell>
      <div className="card p-5 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{icon}</span>
              <h1 className="text-xl font-bold text-white">{name}</h1>
            </div>
            <p className="text-sm text-white/50 mt-1">Posts in this category</p>
          </div>
          <Link
            href={`/submit`}
            className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-neutral-200 transition"
          >
            + Post here
          </Link>
        </div>
      </div>

      <div className="space-y-3">
        {loading ? (
          [...Array(3)].map((_, i) => (
            <div key={i} className="card p-5 space-y-2 animate-pulse">
              <div className="h-4 w-1/3 bg-white/5 rounded" />
              <div className="h-5 w-3/4 bg-white/5 rounded" />
              <div className="h-3 w-full bg-white/5 rounded" />
            </div>
          ))
        ) : posts.length ? (
          posts.map((p) => <PostCard key={p.id} post={p} />)
        ) : (
          <div className="card p-8 text-center">
            <div className="text-3xl mb-3">{icon}</div>
            <div className="text-sm font-semibold text-white">No posts in {name} yet</div>
            <div className="text-sm text-white/50 mt-1 mb-4">Be the first to start the conversation.</div>
            <Link href="/submit" className="inline-flex rounded-full bg-white px-5 py-2 text-sm font-bold text-black hover:bg-neutral-200 transition">
              Create Post →
            </Link>
          </div>
        )}
      </div>
    </Shell>
  );
}
