"use client";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";

export default function ProfileClient() {
  const { user } = useAuth();
  if (!user)
    return (
      <div className="p-6">
        Please <Link href="/login" className="underline">login</Link>.
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-4">
        <img
          src={user.photoURL || "/avatar.png"}
          className="h-20 w-20 rounded-full object-cover"
          alt=""
        />
        <div>
          <h1 className="text-3xl font-semibold">
            {user.displayName || "User"}
          </h1>
          <Link className="underline text-zinc-300" href="/profile/settings">
            Edit profile
          </Link>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
        Nothing here yet.
      </div>
    </div>
  );
}
