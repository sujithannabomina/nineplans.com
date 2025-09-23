'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function ProfilePage() {
  const { data: session, status } = useSession();

  if (status === 'loading') return <div className="text-zinc-400">Loading…</div>;
  if (!session) return (
    <div className="text-zinc-300">
      Please <span className="underline"><a href="/api/auth/signin">log in</a></span> to view your profile.
    </div>
  );

  const user = session.user || {};
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-4">
        {user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={user.image} alt="" className="h-20 w-20 rounded-full object-cover" />
        ) : (
          <div className="h-20 w-20 rounded-full bg-zinc-700" />
        )}
        <div>
          <h1 className="text-2xl font-bold">{user.name || 'Your profile'}</h1>
          <div className="text-zinc-400 text-sm">{user.email}</div>
        </div>
      </div>

      <div className="flex gap-3">
        <Link href="/profile/settings" className="rounded-lg border border-zinc-700 px-4 py-2 text-sm hover:bg-zinc-900">
          Settings
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <button className="rounded-lg border border-zinc-800 bg-zinc-950 p-4 text-left">
          <div className="font-semibold">Posts</div>
          <div className="text-sm text-zinc-400">Nothing here yet</div>
        </button>
        <button className="rounded-lg border border-zinc-800 bg-zinc-950 p-4 text-left">
          <div className="font-semibold">Liked</div>
          <div className="text-sm text-zinc-400">Nothing here yet</div>
        </button>
        <button className="rounded-lg border border-zinc-800 bg-zinc-950 p-4 text-left">
          <div className="font-semibold">Commented</div>
          <div className="text-sm text-zinc-400">Nothing here yet</div>
        </button>
        <button className="rounded-lg border border-zinc-800 bg-zinc-950 p-4 text-left">
          <div className="font-semibold">Saved</div>
          <div className="text-sm text-zinc-400">Nothing here yet</div>
        </button>
      </div>
    </div>
  );
}
