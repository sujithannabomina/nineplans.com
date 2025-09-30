"use client";

import useSWR from "swr";
import { useSession, signOut } from "next-auth/react";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function ProfilePage() {
  const { data: session } = useSession();
  const { data } = useSWR(session ? "/api/profile" : null, fetcher);

  return (
    <div className="space-y-6">
      <div className="card flex items-center justify-between">
        <div>
          <div className="text-xl font-semibold">
            {data?.displayName || session?.user?.name || "Your profile"}
          </div>
          <div className="text-sm text-neutral-400">
            {data?.email || session?.user?.email || ""}
          </div>
        </div>
        {session && (
          <div className="flex items-center gap-2">
            <a href="/profile/settings" className="rounded-md bg-neutral-800 px-3 py-2 text-sm hover:bg-neutral-700">
              Settings
            </a>
            <button
              className="rounded-md bg-red-600 px-3 py-2 text-sm hover:bg-red-500"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Sign out
            </button>
          </div>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="card">
          <div className="mb-2 font-medium">Your posts</div>
          <div className="text-sm text-neutral-400">No posts yet.</div>
        </div>
        <div className="card">
          <div className="mb-2 font-medium">Liked</div>
          <div className="text-sm text-neutral-400">No likes yet.</div>
        </div>
        <div className="card">
          <div className="mb-2 font-medium">Saved</div>
          <div className="text-sm text-neutral-400">No saved posts yet.</div>
        </div>
        <div className="card">
          <div className="mb-2 font-medium">Comments</div>
          <div className="text-sm text-neutral-400">No comments yet.</div>
        </div>
      </div>
    </div>
  );
}
