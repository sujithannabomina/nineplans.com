"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function ProfileClient() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="text-zinc-300">Loading…</div>;
  }

  if (!session) {
    return (
      <div className="rounded-lg border border-white/10 bg-black/30 p-6">
        <h1 className="mb-2 text-2xl font-semibold">Your Profile</h1>
        <p className="text-zinc-300">
          You’re not logged in.{" "}
          <button
            onClick={() => signIn("google", { callbackUrl: "/profile" })}
            className="text-sky-400 underline"
          >
            Log in with Google
          </button>
          .
        </p>
      </div>
    );
  }

  const user = session.user;
  const alias =
    (typeof window !== "undefined" && localStorage.getItem("np_alias")) || "";

  return (
    <div className="rounded-lg border border-white/10 bg-black/30 p-6">
      <div className="mb-4 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-800 text-lg font-bold">
          {user?.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.image}
              alt={user.name || "Avatar"}
              className="h-12 w-12 rounded-full object-cover"
            />
          ) : (
            <span>{(user?.name || "NP").slice(0, 2).toUpperCase()}</span>
          )}
        </div>
        <div>
          <div className="font-semibold">{alias || user?.name || "User"}</div>
          <div className="text-sm text-zinc-400">{user?.email}</div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Link
          href="/profile/settings"
          className="rounded-md border border-white/10 px-4 py-2 text-sm hover:bg-white/5"
        >
          Settings
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium hover:bg-red-500"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
