// app/profile/settings/page.jsx
'use client';
export const dynamic = 'force-dynamic';

import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function ProfileSettingsPage() {
  const sessionHook = useSession();
  const session = sessionHook?.data;
  const status = sessionHook?.status;

  if (status === 'loading') return <div className="p-4">Loading…</div>;
  if (!session) {
    return (
      <div className="p-6">
        <p className="mb-3">Please log in to view settings.</p>
        <Link className="underline" href="/login">Go to Login</Link>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Profile Settings</h1>
      {/* your actual settings UI here */}
      <pre className="text-sm bg-gray-100 p-3 rounded">{JSON.stringify(session.user, null, 2)}</pre>
    </div>
  );
}
