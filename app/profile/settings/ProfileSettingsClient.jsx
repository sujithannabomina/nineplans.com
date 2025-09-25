"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function ProfileSettingsClient() {
  const { data: session, status } = useSession();
  const [alias, setAlias] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Load alias from localStorage (simple, works without a backend table)
    const a = typeof window !== "undefined" ? localStorage.getItem("np_alias") : "";
    setAlias(a || "");
  }, []);

  const onSave = () => {
    const value = alias.trim();
    if (typeof window !== "undefined") {
      localStorage.setItem("np_alias", value);
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (status === "loading") {
    return <div className="text-zinc-300">Loading…</div>;
  }

  if (!session) {
    return (
      <div className="rounded-lg border border-white/10 bg-black/30 p-6">
        <h1 className="mb-2 text-2xl font-semibold">Settings</h1>
        <p className="text-zinc-300">
          You’re not logged in. <Link href="/login" className="text-sky-400 underline">Log in</Link> to manage your profile.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="rounded-lg border border-white/10 bg-black/30 p-6">
        <h2 className="text-xl font-semibold">Profile</h2>
        <div className="mt-4 grid gap-4 sm:max-w-md">
          <label className="block">
            <span className="mb-1 block text-sm text-zinc-300">Display name (alias)</span>
            <input
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
              placeholder="Your alias"
              className="w-full rounded-md border border-white/10 bg-zinc-900 px-3 py-2 outline-none ring-0 focus:border-sky-500"
            />
          </label>
          <div className="flex items-center gap-3">
            <button
              onClick={onSave}
              className="rounded-md bg-sky-600 px-4 py-2 text-sm font-medium hover:bg-sky-500"
            >
              Save
            </button>
            {saved && <span className="text-sm text-green-400">Saved.</span>}
          </div>
          <p className="text-xs text-zinc-400">
            Your alias is shown with your posts and comments. You can still post anonymously.
          </p>
        </div>
      </section>

      <section className="rounded-lg border border-white/10 bg-black/30 p-6">
        <h2 className="text-xl font-semibold">Account</h2>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="rounded-md border border-white/10 px-4 py-2 text-sm hover:bg-white/5"
          >
            Sign out
          </button>
          <Link
            href="/profile/delete"
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium hover:bg-red-500"
          >
            Delete account
          </Link>
        </div>
        <p className="mt-2 text-xs text-zinc-400">
          Deleting your account removes your login access. Public posts may remain where allowed by policy.
        </p>
      </section>
    </div>
  );
}
