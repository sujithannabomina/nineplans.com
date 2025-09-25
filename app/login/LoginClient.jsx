'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

export default function LoginClient() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="mt-2 text-zinc-300">Checking your session…</p>
      </div>
    );
  }

  if (session) {
    const user = session.user || {};
    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">You’re signed in</h1>
        <div className="rounded-lg border border-white/10 bg-black/30 p-4">
          <p className="text-zinc-200">
            Logged in as <span className="font-semibold">{user.name || user.email}</span>
          </p>
          {user.email && <p className="text-zinc-400 text-sm">{user.email}</p>}
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="rounded-md border border-white/15 px-4 py-2 text-sm hover:bg-white/10"
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Login</h1>
      <p className="text-zinc-300">
        Sign in to write posts, comment, upvote, and save.
      </p>
      <div className="flex gap-3">
        {/* Opens NextAuth default provider chooser */}
        <button
          onClick={() => signIn()}
          className="rounded-md border border-white/15 px-4 py-2 text-sm hover:bg-white/10"
        >
          Continue
        </button>

        {/* If you prefer a direct provider, keep this too (works only if Google is configured) */}
        <button
          onClick={() => signIn('google', { callbackUrl: '/' })}
          className="rounded-md border border-white/15 px-4 py-2 text-sm hover:bg-white/10"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
}
