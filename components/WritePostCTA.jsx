"use client";

import Link from "next/link";

export default function WritePostCTA() {
  return (
    <div className="rounded-lg border border-zinc-800 p-4">
      <p className="mb-3 text-zinc-300">
        Want to share something? Log in to start a post.
      </p>
      <Link
        href="/submit"
        className="inline-block rounded-md bg-sky-600 px-4 py-2 text-white hover:bg-sky-500"
      >
        Write a post
      </Link>
    </div>
  );
}
