// app/c/[slug]/page.jsx
"use client";

import { useEffect, useState } from "react";
import Shell from "@/components/Shell";
import { listenFeed } from "@/lib/firestore";
import Link from "next/link";

function PostCard({ post }) {
  return (
    <Link
      href={`/post/${post.id}`}
      className="block rounded-2xl border bg-white p-4 shadow-sm hover:shadow-md transition"
    >
      <div className="text-base font-semibold">{post.title}</div>
      <div className="mt-1 text-sm text-gray-600 line-clamp-3">{post.body}</div>
      <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
        <span>{post.isAnonymous ? "Anonymous" : (post.authorAlias || "User")}</span>
        <span>👍 {post.upvotes || 0} • 💬 {post.commentsCount || 0}</span>
      </div>
    </Link>
  );
}

export default function CategoryPage({ params }) {
  const slug = params?.slug;
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsub = listenFeed({ mode: "latest", categorySlug: slug }, setPosts);
    return () => unsub?.();
  }, [slug]);

  return (
    <Shell>
      <div className="rounded-2xl border bg-white p-4 shadow-sm">
        <div className="text-lg font-semibold">Category</div>
        <div className="text-sm text-gray-600">Showing posts in: <span className="font-medium">{slug}</span></div>
      </div>

      <div className="mt-4 space-y-4">
        {posts?.length ? posts.map((p) => <PostCard key={p.id} post={p} />) : (
          <div className="rounded-2xl border bg-white p-6 text-sm text-gray-600 shadow-sm">
            No posts yet in this category.
          </div>
        )}
      </div>
    </Shell>
  );
}
