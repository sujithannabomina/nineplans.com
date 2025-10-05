// app/profile/settings/page.jsx
'use client';

import { useEffect, useState } from 'react';
import LeftNav from '@/components/LeftNav';
import RightRailAd from '@/components/RightRailAd';

export default function SettingsPage() {
  const [alias, setAlias] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const res = await fetch('/api/profile', { cache: 'no-store' });
        if (!res.ok) return;
        const data = await res.json();
        if (!ignore && data?.alias) setAlias(data.alias);
      } catch (_) {
        // ignore
      }
    })();
    return () => { ignore = true; };
  }, []);

  async function saveAlias() {
    setLoading(true);
    setMsg(null);
    try {
      const res = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ alias: alias || '' }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMsg(data?.error || 'Could not save. Try again.');
      } else {
        setMsg('Saved.');
      }
    } catch (e) {
      setMsg('Could not save. Try again.');
    } finally {
      setLoading(false);
    }
  }

  function clearAlias() {
    setAlias('');
    setMsg(null);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-[16rem_1fr_20rem] gap-6">
        <LeftNav />

        <main className="space-y-6">
          <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
            <h2 className="text-lg font-semibold mb-2">Alias</h2>
            <p className="text-sm text-zinc-400 mb-3">
              Choose a public alias. When submitting, select <span className="font-medium">Post as: Alias</span>.
            </p>

            <div className="flex gap-2">
              <input
                className="flex-1 rounded-md bg-zinc-800 border border-zinc-700 px-3 py-2 outline-none focus:border-zinc-500"
                placeholder="e.g. NightOwl"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
                maxLength={24}
              />
              <button
                onClick={saveAlias}
                disabled={loading}
                className="rounded-md bg-blue-600 hover:bg-blue-500 disabled:opacity-60 px-4 py-2 text-sm font-medium"
              >
                {loading ? 'Saving…' : 'Save'}
              </button>
              <button
                onClick={clearAlias}
                className="rounded-md bg-zinc-800 hover:bg-zinc-700 px-4 py-2 text-sm font-medium"
              >
                Clear
              </button>
            </div>

            {msg && (
              <p className={`mt-3 text-sm ${msg === 'Saved.' ? 'text-emerald-400' : 'text-amber-400'}`}>
                {msg}
              </p>
            )}
          </section>

          {/* Your existing cards below */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
              <h3 className="font-semibold mb-2">Your posts</h3>
              <p className="text-sm text-zinc-400">No posts yet.</p>
            </div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
              <h3 className="font-semibold mb-2">Liked</h3>
              <p className="text-sm text-zinc-400">No likes yet.</p>
            </div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
              <h3 className="font-semibold mb-2">Saved</h3>
              <p className="text-sm text-zinc-400">No saved posts yet.</p>
            </div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
              <h3 className="font-semibold mb-2">Comments</h3>
              <p className="text-sm text-zinc-400">No comments yet.</p>
            </div>
          </div>
        </main>

        <RightRailAd />
      </div>
    </div>
  );
}
