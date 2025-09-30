"use client";

import { useSession, signOut } from "next-auth/react";

export default function SettingsPage() {
  const { data: session } = useSession();

  return (
    <div className="space-y-6">
      <div className="card flex items-center justify-between">
        <div>
          <div className="text-xl font-semibold">
            {session?.user?.name || "Settings"}
          </div>
          <div className="text-sm text-neutral-400">{session?.user?.email}</div>
        </div>
        <div className="flex items-center gap-2">
          <a href="/profile" className="rounded-md bg-neutral-800 px-3 py-2 text-sm hover:bg-neutral-700">
            Profile
          </a>
          <button
            className="rounded-md bg-red-600 px-3 py-2 text-sm hover:bg-red-500"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Sign out
          </button>
        </div>
      </div>

      {/* Placeholder tiles – replace with your real settings form anytime */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="card">
          <div className="mb-2 font-medium">Alias</div>
          <div className="text-sm text-neutral-400">Use an alias to post anonymously.</div>
        </div>
        <div className="card">
          <div className="mb-2 font-medium">Notifications</div>
          <div className="text-sm text-neutral-400">Notification preferences coming soon.</div>
        </div>
      </div>
    </div>
  );
}
