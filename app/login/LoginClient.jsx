'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

export default function LoginClient() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div className="text-zinc-400">Loading…</div>;
  }

  if (!session) {
    return (
      <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-6 max-w-md">
        <h1 className="text-xl font-bold mb-2">Login</h1>
        <p className="text-sm text-zinc-300 mb-4">
          Continue with Google. You can still post using an alias from Profile → Settings.
        </p>
        <button
          onClick={() => signIn('google')}
          className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black hover:opacity-90"
        >
          Continue with Google
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-6 max-w-md">
      <h1 className="text-xl font-bold mb-2">You’re signed in</h1>
      <div className="text-sm text-zinc-300 mb-4">{session.user?.email}</div>
      <div className="flex gap-3">
        <a href="/profile" className="rounded-lg border border-zinc-700 px-4 py-2 text-sm hover:bg-zinc-900">
          Go to Profile
        </a>
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="rounded-lg border border-zinc-700 px-4 py-2 text-sm hover:bg-zinc-900"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
