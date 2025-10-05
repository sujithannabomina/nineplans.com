// app/submit/page.jsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import LeftNav, { CATEGORIES } from '@/components/LeftNav';
import RightRailAd from '@/components/RightRailAd';

const LS_KEY = 'np_alias';

export default function SubmitPage() {
  const { status } = useSession(); // 'authenticated' | 'unauthenticated' | 'loading'
  const [alias, setAlias] = useState('');
  const [postAs, setPostAs] = useState('user'); // 'user' | 'alias'
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [text, setText] = useState('');

  useEffect(() => {
    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem(LS_KEY) : '';
      if (saved) setAlias(saved);
    } catch {}
  }, []);

  const noAlias = useMemo(() => !alias || alias.trim() === '', [alias]);

  if (status !== 'authenticated') {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[16rem_1fr_20rem] gap-6">
          <LeftNav />
          <main>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
              <h2 className="text-xl font-semibold mb-2">Log in to write a post</h2>
              <p className="text-sm text-zinc-400 mb-4">
                You can still post using an Alias after logging in.
              </p>
              <button
                onClick={() => signIn('google')}
                className="rounded-md bg-blue-600 hover:bg-blue-500 px-4 py-2 text-sm font-medium"
              >
                Sign in with Google
              </button>
            </div>
          </main>
          <RightRailAd />
        </div>
      </div>
    );
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (postAs === 'alias' && noAlias) return;

    const payload = {
      content: text,
      category,
      authorType: postAs === 'alias' ? 'alias' : 'user',
      alias: postAs === 'alias' ? alias.trim() : null,
    };

    // Your existing endpoint
    const res = await fetch('/api/post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    // Handle as you already do…
    if (res.ok) {
      setText('');
      // navigate or show toast, etc.
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-[16rem_1fr_20rem] gap-6">
        <LeftNav />

        <main>
          <form onSubmit={onSubmit} className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Post as */}
              <div>
                <label className="block text-sm text-zinc-400 mb-2">Post as</label>
                <select
                  value={postAs}
                  onChange={(e) => setPostAs(e.target.value)}
                  className="w-full rounded-md bg-zinc-800 border border-zinc-700 px-3 py-2 outline-none focus:border-zinc-500"
                >
                  <option value="user">Account name (User)</option>
                  <option value="alias">Alias</option>
                </select>
                {postAs === 'alias' && noAlias && (
                  <p className="mt-2 text-xs text-amber-400">
                    You don't have an alias. <a className="underline" href="/profile/settings">Create one in Settings</a>.
                  </p>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm text-zinc-400 mb-2">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-md bg-zinc-800 border border-zinc-700 px-3 py-2 outline-none focus:border-zinc-500"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Post body */}
            <div>
              <label className="block text-sm text-zinc-400 mb-2">Your post</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={8}
                className="w-full rounded-md bg-zinc-800 border border-zinc-700 px-3 py-2 outline-none focus:border-zinc-500"
                placeholder="Write your post. Links allowed. No images/videos in comments."
              />
            </div>

            <button
              type="submit"
              disabled={postAs === 'alias' && noAlias}
              className="rounded-md bg-blue-600 hover:bg-blue-500 disabled:opacity-60 px-4 py-2 text-sm font-medium"
            >
              Post
            </button>
          </form>
        </main>

        <RightRailAd />
      </div>
    </div>
  );
}
