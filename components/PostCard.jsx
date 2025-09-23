// components/PostCard.jsx
"use client";

import Link from "next/link";

/**
 * Displays a single post card.
 * Expects a "post" object with at least { id, title, category }.
 * All other fields are optional and handled defensively.
 */
export default function PostCard({ post }) {
  if (!post) return null;

  const id = post.id ?? post.slug ?? "";
  const href = id ? `/post/${encodeURIComponent(id)}` : "#";

  const title = String(post.title ?? "Untitled");
  const category = String(post.category ?? "General");

  const snippet = String(post.body ?? post.text ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 240);

  const likes = Number(post.likes ?? 0);
  const comments = Number(post.commentsCount ?? post.comments ?? 0);
  const views = Number(post.views ?? 0);

  return (
    <article className="rounded-lg border border-zinc-800 bg-zinc-950/40 p-4">
      <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-zinc-400">
        <span className="rounded border border-zinc-700 px-2 py-0.5">
          {category}
        </span>
        <span>👍 {likes}</span>
        <span>💬 {comments}</span>
        <span>👁️ {views}</span>
      </div>

      <h3 className="mb-2 text-lg font-semibold leading-snug">
        <Link href={href} className="hover:underline">
          {title}
        </Link>
      </h3>

      {snippet && (
        <p className="mb-3 text-sm leading-relaxed text-zinc-300">{snippet}</p>
      )}

      <div>
        <Link
          href={href}
          className="inline-block rounded-md border border-zinc-700 px-3 py-1 text-sm hover:bg-zinc-900"
        >
          Read more
        </Link>
      </div>
    </article>
  );
}
