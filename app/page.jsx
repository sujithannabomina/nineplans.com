// app/page.jsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Shell from "@/components/Shell";
import Link from "next/link";
import { listenFeed } from "@/lib/firestore";

function PostCard({ post }) {
  return (
    <Link
      href={`/post/${post.id}`}
      className="block rounded-2xl border bg-white p-4 shadow-sm hover:shadow-md transition"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-base font-semibold">{post.title}</div>
          <div className="mt-1 text-sm text-gray-600 line-clamp-3">
            {post.body}
          </div>
        </div>
        <div className="text-xs text-gray-500">
          {post.categoryName || "General Posts"}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
        <div>
          {post.isAnonymous ? (
            <span className="rounded-full bg-gray-100 px-2 py-1">Anonymous</span>
          ) : (
            <span className="rounded-full bg-gray-100 px-2 py-1">
              {post.authorAlias || "User"}
            </span>
          )}
        </div>
        <div className="flex gap-3">
          <span>👍 {post.upvotes || 0}</span>
          <span>💬 {post.commentsCount || 0}</span>
          <span>👀 {post.views || 0}</span>
        </div>
      </div>
    </Link>
  );
}

export default function HomePage() {
  const sp = useSearchParams();
  const feed = sp.get("feed") || "latest";
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsub = listenFeed({ mode: feed }, setPosts);
    return () => unsub?.();
  }, [feed]);

  const title = useMemo(() => {
    if (feed === "trending") return "Trending";
    return "Latest";
  }, [feed]);

  return (
    <Shell>
      <div className="rounded-2xl border bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg font-semibold">{title}</div>
            <div className="text-sm text-gray-600">Fresh posts from the community.</div>
          </div>
          <Link
            href="/submit"
            className="rounded-xl bg-black px-4 py-2 text-sm text-white hover:bg-gray-900"
          >
            + Create
          </Link>
        </div>
      </div>

      <div className="mt-4 space-y-4">
        {posts?.length ? (
          posts.map((p) => <PostCard key={p.id} post={p} />)
        ) : (
          <div className="rounded-2xl border bg-white p-6 text-sm text-gray-600 shadow-sm">
            Loading… <div className="text-xs text-gray-500">Fetching fresh posts.</div>
          </div>
        )}
      </div>
    </Shell>
  );
}
