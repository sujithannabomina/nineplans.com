"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function WritePostCTA() {
  const { data: session } = useSession();
  const params = useSearchParams();

  const cat =
    params.get("cat") ||
    params.get("category") ||
    params.get("c") ||
    "";

  const targetWhenLoggedIn = cat
    ? `/submit?cat=${encodeURIComponent(cat)}`
    : "/submit";

  const targetWhenAnon = cat
    ? `/login?redirect=${encodeURIComponent(`/submit?cat=${cat}`)}`
    : `/login?redirect=${encodeURIComponent("/submit")}`;

  const href = session ? targetWhenLoggedIn : targetWhenAnon;

  return (
    <div className="my-4 rounded-lg border border-white/10 bg-black/30 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm text-zinc-300">
          Want to share something?{" "}
          <span className="text-zinc-400">
            {session ? "Start a new post." : "Log in to start a post."}
          </span>
        </div>
        <Link
          href={href}
          className="rounded-md bg-sky-600 px-4 py-2 text-sm font-medium hover:bg-sky-500"
        >
          Write a post
        </Link>
      </div>
    </div>
  );
}
