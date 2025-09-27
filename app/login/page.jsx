// app/login/page.jsx
'use client';
export const dynamic = 'force-dynamic';

import { useSession, signIn, signOut } from 'next-auth/react';

export default function LoginPage() {
  const sessionHook = useSession(); // could be undefined if provider missing in SSR
  const session = sessionHook?.data;
  const status = sessionHook?.status;

  if (status === 'loading') return <div className="p-4">Loading…</div>;

  return (
    <div className="p-6">
      {session ? (
        <>
          <p className="mb-4">Signed in as {session.user?.email}</p>
          <button className="border px-3 py-1 rounded" onClick={() => signOut()}>Sign out</button>
        </>
      ) : (
        <button className="border px-3 py-1 rounded" onClick={() => signIn()}>Sign in</button>
      )}
    </div>
  );
}
