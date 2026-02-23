"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PostCard from "@/components/PostCard";
import { listenFeed } from "@/lib/firestore";

export default function HomeFeed({ feed = "latest" }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const unsub = listenFeed({ mode: feed }, (list) => {
      setPosts(Array.isArray(list) ? list : []);
      setLoading(false);
    });
    return () => unsub?.();
  }, [feed]);

  const title = feed === "trending" ? "🔥 Trending" : "🆕 Latest";

  return (
    <div>
      {/* Feed header */}
      <div className="card p-4 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg font-bold text-white">{title}</div>
            <div className="text-sm text-white/50">Fresh posts from the community.</div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/?feed=latest"
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                feed !== "trending" ? "bg-white text-black" : "border border-white/20 text-white/70 hover:bg-white/10"
              }`}
            >
              Latest
            </Link>
            <Link
              href="/?feed=trending"
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                feed === "trending" ? "bg-white text-black" : "border border-white/20 text-white/70 hover:bg-white/10"
              }`}
            >
              Trending
            </Link>
          </div>
        </div>
      </div>

      {/* Post list */}
      <div className="space-y-3">
        {loading ? (
          [...Array(4)].map((_, i) => (
            <div key={i} className="card p-5">
              <div className="flex gap-3">
                <div className="flex flex-col items-center gap-1 w-8">
                  <div className="h-6 w-6 rounded bg-white/5 animate-pulse" />
                  <div className="h-4 w-4 rounded bg-white/5 animate-pulse" />
                  <div className="h-6 w-6 rounded bg-white/5 animate-pulse" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-1/3 rounded bg-white/5 animate-pulse" />
                  <div className="h-5 w-3/4 rounded bg-white/5 animate-pulse" />
                  <div className="h-3 w-full rounded bg-white/5 animate-pulse" />
                  <div className="h-3 w-2/3 rounded bg-white/5 animate-pulse" />
                </div>
              </div>
            </div>
          ))
        ) : posts.length ? (
          posts.map((p) => <PostCard key={p.id} post={p} />)
        ) : (
          <div className="card p-8 text-center">
            <div className="text-3xl mb-3">📭</div>
            <div className="text-base font-semibold text-white">No posts yet</div>
            <div className="text-sm text-white/50 mt-1 mb-4">Be the first to share something with the community.</div>
            <Link
              href="/submit"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-black hover:bg-neutral-200 transition"
            >
              + Create Post
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
