"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import useSWR from "swr";
import Link from "next/link";

const fetcher = (url) =>
  fetch(url, { credentials: "include" }).then((r) => {
    if (!r.ok) throw new Error(`Request failed ${r.status}`);
    return r.json();
  });

export default function ProfileClient() {
  const { data: session, status } = useSession();

  // While NextAuth checks session on the client
  if (status === "loading") {
    return (
      <div className="rounded-lg border border-zinc-700 p-6 text-zinc-300">
        Checking your session…
      </div>
    );
  }

  if (!session) {
    return (
      <div className="rounded-lg border border-zinc-700 p-6">
        <h2 className="mb-2 text-xl font-semibold text-zinc-100">You’re not logged in</h2>
        <p className="mb-4 text-zinc-300">
          Log in to view your posts, likes, comments and saved items.
        </p>
        <button
          onClick={() => signIn("google", { callbackUrl: "/profile" })}
          className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-500"
        >
          Continue with Google
        </button>
      </div>
    );
  }

  // Fetch profile summary + interactions once we have a session
  const { data: profile } = useSWR("/api/profile", fetcher);
  const { data: interactions } = useSWR("/api/profile/interactions", fetcher);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between rounded-lg border border-zinc-700 p-4">
        <div>
          <div className="text-lg font-semibold text-zinc-100">
            {profile?.displayName || session.user?.name || "User"}
          </div>
          <div className="text-sm text-zinc-400">{session.user?.email}</div>
        </div>
        <div className="space-x-2">
          <Link
            href="/profile/settings"
            className="rounded-md border border-zinc-600 px-3 py-1.5 text-sm text-zinc-200 hover:bg-zinc-700"
          >
            Settings
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-500"
          >
            Sign out
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Panel title="Your posts" items={interactions?.posts} empty="No posts yet." />
        <Panel title="Liked" items={interactions?.liked} empty="No likes yet." />
        <Panel title="Saved" items={interactions?.saved} empty="No saved posts yet." />
        <Panel title="Comments" items={interactions?.comments} empty="No comments yet." />
      </div>
    </div>
  );
}

function Panel({ title, items, empty }) {
  return (
    <div className="rounded-lg border border-zinc-700 p-4">
      <h3 className="mb-3 text-base font-semibold text-zinc-100">{title}</h3>
      {!items?.length ? (
        <div className="text-sm text-zinc-400">{empty}</div>
      ) : (
        <ul className="space-y-2">
          {items.map((it) => (
            <li key={it.id} className="text-sm text-zinc-200">
              <Link href={`/post/${it.id}`} className="hover:underline">
                {it.title || it.snippet || it.id}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
