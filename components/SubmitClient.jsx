// components/SubmitClient.jsx
'use client';

import useSWR from 'swr';
import { useState } from 'react';
import { useSession, signIn } from 'next-auth/react';

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function SubmitClient() {
  const { data: session, status } = useSession();
  const { data: profile } = useSWR(
    status === 'authenticated' ? '/api/profile' : null,
    fetcher
  );

  // Force login view if not authenticated
  if (status !== 'authenticated') {
    return (
      <div className="rounded-xl border border-zinc-800/70 bg-zinc-950/40 p-6">
        <h2 className="text-lg font-semibold mb-2">Log in to write a post</h2>
        <p className="text-sm text-zinc-400 mb-4">
          You can still post using an Alias after logging in.
        </p>
        <button
          onClick={() => signIn('google', { callbackUrl: '/submit' })}
          className="inline-flex rounded-md bg-blue-600 px-4 py-2 text-sm font-medium hover:bg-blue-500"
        >
          Sign in with Google
        </button>
      </div>
    );
  }

  const [postAs, setPostAs] = useState('user'); // 'user' | 'alias'
  const hasAlias = Boolean(profile?.alias);

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-zinc-800/70 bg-zinc-950/40 p-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-zinc-400">Post as</label>
            <select
              value={postAs}
              onChange={(e) => setPostAs(e.target.value)}
              className="mt-1 w-full rounded-md border border-zinc-700 bg-black px-3 py-2 text-sm"
            >
              <option value="user">Account name (User)</option>
              <option value="alias">Alias</option>
            </select>
            {postAs === 'alias' && (
              <p className="mt-2 text-xs text-zinc-400">
                {hasAlias ? (
                  <>Posting as <span className="font-medium">{profile.alias}</span>.</>
                ) : (
                  <>
                    You don’t have an alias yet. Create one in{' '}
                    <a href="/profile/settings" className="underline">Profile → Settings</a>.
                  </>
                )}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm text-zinc-400">Category</label>
            {/* Your existing category select keeps working */}
            {/* If you already have a dedicated CategorySelect component, keep using it */}
          </div>
        </div>

        <div className="mt-4">
          <label className="text-sm text-zinc-400">Your post</label>
          <textarea
            className="mt-1 w-full min-h-[160px] rounded-md border border-zinc-700 bg-black px-3 py-2 text-sm"
            placeholder="Write your post. Links allowed. No images/videos in comments."
          />
        </div>

        <div className="mt-4">
          <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium hover:bg-blue-500">
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
