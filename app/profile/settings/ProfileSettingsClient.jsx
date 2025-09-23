<<<<<<< HEAD
"use client";

import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";

const ALIAS_KEY = "np_alias";

export default function ProfileSettingsClient() {
  const [alias, setAlias] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(ALIAS_KEY) || "";
      setAlias(saved);
    } catch {}
  }, []);

  const saveAlias = () => {
    try {
      localStorage.setItem(ALIAS_KEY, alias.trim());
      // optional toast could go here
    } catch {}
  };

  const deleteAndSignOut = async () => {
    try {
      localStorage.removeItem(ALIAS_KEY);
    } catch {}
    await signOut({ callbackUrl: "/" });
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Profile settings</h1>

      <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-4">
        <label className="block text-sm font-medium mb-2">Alias</label>
        <input
          value={alias}
          onChange={(e) => setAlias(e.target.value)}
          placeholder="Set an alias used when posting as Alias"
          className="w-full rounded-lg border border-neutral-700 bg-black/40 px-3 py-2 outline-none focus:border-neutral-500"
        />
        <div className="mt-3 flex gap-3">
          <button
            onClick={saveAlias}
            className="rounded-lg bg-white/90 text-black px-4 py-2 font-medium hover:bg-white"
          >
            Save
          </button>
          <Link
            href="/profile"
            className="rounded-lg border border-neutral-700 px-4 py-2 font-medium"
          >
            Back to profile
          </Link>
        </div>
      </div>

      <div className="rounded-xl border border-red-900 bg-red-950/40 p-4">
        <h2 className="text-lg font-semibold text-red-200">
          Delete my account (site data)
        </h2>
        <p className="mt-1 text-sm text-red-200/80">
          We only store your alias locally. Click to remove local data and sign
          out.
        </p>
        <button
          onClick={deleteAndSignOut}
          className="mt-3 rounded-lg border border-red-400 px-4 py-2 font-semibold text-red-100 hover:bg-red-900/30"
        >
          Delete &amp; Sign out
        </button>
      </div>
    </div>
  );
}
=======
"use client";

import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";

const ALIAS_KEY = "np_alias";

export default function ProfileSettingsClient() {
  const [alias, setAlias] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(ALIAS_KEY) || "";
      setAlias(saved);
    } catch {}
  }, []);

  const saveAlias = () => {
    try {
      localStorage.setItem(ALIAS_KEY, alias.trim());
      // optional toast could go here
    } catch {}
  };

  const deleteAndSignOut = async () => {
    try {
      localStorage.removeItem(ALIAS_KEY);
    } catch {}
    await signOut({ callbackUrl: "/" });
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Profile settings</h1>

      <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-4">
        <label className="block text-sm font-medium mb-2">Alias</label>
        <input
          value={alias}
          onChange={(e) => setAlias(e.target.value)}
          placeholder="Set an alias used when posting as Alias"
          className="w-full rounded-lg border border-neutral-700 bg-black/40 px-3 py-2 outline-none focus:border-neutral-500"
        />
        <div className="mt-3 flex gap-3">
          <button
            onClick={saveAlias}
            className="rounded-lg bg-white/90 text-black px-4 py-2 font-medium hover:bg-white"
          >
            Save
          </button>
          <Link
            href="/profile"
            className="rounded-lg border border-neutral-700 px-4 py-2 font-medium"
          >
            Back to profile
          </Link>
        </div>
      </div>

      <div className="rounded-xl border border-red-900 bg-red-950/40 p-4">
        <h2 className="text-lg font-semibold text-red-200">
          Delete my account (site data)
        </h2>
        <p className="mt-1 text-sm text-red-200/80">
          We only store your alias locally. Click to remove local data and sign
          out.
        </p>
        <button
          onClick={deleteAndSignOut}
          className="mt-3 rounded-lg border border-red-400 px-4 py-2 font-semibold text-red-100 hover:bg-red-900/30"
        >
          Delete &amp; Sign out
        </button>
      </div>
    </div>
  );
}
>>>>>>> 724b0ef (Initial commit from local working folder)
