// components/PostCard.jsx
"use client";

import Link from "next/link";

export default function PostCard({ post }) {
  const name = post?.displayName || "User";
  const isAccount = post?.authorType === "account";

  return (
    <article className="rounded border border-neutral-800 bg-neutral-950 p-4">
      <header className="mb-2 flex items-center justify-between text-sm text-neutral-400">
        <div className="flex items-center gap-2">
          {isAccount ? (
            // If you later add public profiles by uid, change href to `/u/${post.uid}`
            <Link href="/profile" className="font-medium text-neutral-200 hover:underline">
              {name}
            </Link>
          ) : (
            <span className="font-medium text-neutral-200">{name}</span>
          )}
          <span className="text-neutral-500">•</span>
          <Link href={`/c/${post.categorySlug}`} className="hover:underline">
            {post.categoryName}
          </Link>
        </div>
      </header>

      <p className="whitespace-pre-wrap text-neutral-200">{post.content}</p>
    </article>
  );
}
