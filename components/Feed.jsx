// components/Feed.jsx
"use client";

import PostCard from "./PostCard";

/**
 * Generic list renderer.
 * Accepts props.posts (preferred) or props.items/props.data.
 * Shows an empty-state when there are no posts.
 */
export default function Feed({
  posts,
  items,
  data,
  emptyText = "No posts yet. Be the first to write one.",
}) {
  const list = (posts || items || data || []).filter(Boolean);

  if (!Array.isArray(list) || list.length === 0) {
    return (
      <div className="rounded-md border border-zinc-800 bg-zinc-950/40 p-4 text-sm text-zinc-400">
        {emptyText}
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      {list.map((post, i) => (
        <PostCard key={post?.id ?? post?.slug ?? i} post={post} />
      ))}
    </div>
  );
}
