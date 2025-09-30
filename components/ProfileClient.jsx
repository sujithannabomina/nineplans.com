// components/ProfileClient.jsx
"use client";

import useSWR from "swr";
import { useSession, signIn, signOut } from "next-auth/react";

const fetcher = (url) =>
  fetch(url).then((r) => (r.ok ? r.json() : Promise.reject(r)));

export default function ProfileClient() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="p-6 text-neutral-400">Loading…</div>;
  }

  if (!session) {
    return (
      <div className="p-6">
        <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-6">
          <p className="mb-3 text-neutral-300">
            You&apos;re not signed in. Sign in to see your posts & activity.
          </p>
          <button
            onClick={() => signIn("google", { callbackUrl: "/profile" })}
            className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-500"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  const { data: profile } = useSWR("/api/profile", fetcher);
  const { data: interactions } = useSWR("/api/profile/interactions", fetcher);

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">
              {profile?.name || session.user?.name || "User"}
            </h2>
            <p className="text-sm text-neutral-400">
              {profile?.email || session.user?.email}
            </p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="rounded-lg border border-neutral-700 px-4 py-1.5 text-sm text-neutral-200 hover:bg-neutral-800"
          >
            Sign out
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card title="Your posts" items={interactions?.posted} empty="No posts yet." />
        <Card title="Liked" items={interactions?.liked} empty="No likes yet." />
        <Card title="Commented" items={interactions?.commented} empty="No comments yet." />
        <Card title="Saved" items={interactions?.saved} empty="No saved posts yet." />
        <Card title="Shared" items={interactions?.shared} empty="No shares yet." />
      </div>
    </div>
  );
}

function Card({ title, items = [], empty }) {
  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-5">
      <h3 className="mb-3 text-base font-semibold">{title}</h3>
      {items.length === 0 ? (
        <p className="text-sm text-neutral-400">{empty}</p>
      ) : (
        <ul className="space-y-2">
          {items.map((it) => (
            <li key={it.id} className="text-sm text-neutral-300">
              <a className="underline hover:text-white" href={`/post/${it.id}`}>
                {it.title || "Untitled"}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
