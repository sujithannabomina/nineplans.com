// app/profile/page.js
"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading…</div>;
  }
  if (!session) {
    return (
      <div className="max-w-xl">
        <h1 className="text-2xl font-semibold mb-4">Profile</h1>
        <p className="mb-4">You’re not signed in.</p>
        <Link className="btn-primary inline-block" href="/login">
          Sign in
        </Link>
      </div>
    );
  }

  const name = session.user?.name || "User";
  const email = session.user?.email || "";

  return (
    <div className="space-y-6">
      <div className="border border-neutral-800 rounded-xl p-4 flex items-start justify-between">
        <div>
          <h1 className="text-xl font-semibold">{name}</h1>
          <p className="text-neutral-400">{email}</p>
        </div>
        <div className="flex gap-2">
          <Link className="btn" href="/profile/settings">Settings</Link>
          <button className="btn-danger" onClick={() => signOut({ callbackUrl: "/" })}>
            Sign out
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Panel title="Your posts" empty="No posts yet." />
        <Panel title="Liked" empty="No likes yet." />
        <Panel title="Saved" empty="No saved posts yet." />
        <Panel title="Comments" empty="No comments yet." />
      </div>
    </div>
  );
}

function Panel({ title, empty }) {
  return (
    <div className="border border-neutral-800 rounded-xl p-4">
      <div className="font-semibold mb-2">{title}</div>
      <div className="text-neutral-400">{empty}</div>
    </div>
  );
}
