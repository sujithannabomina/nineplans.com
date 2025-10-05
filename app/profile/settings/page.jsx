// app/profile/settings/page.jsx
'use client';

import { useEffect, useState } from 'react';
import LeftNav from '@/components/LeftNav';
import RightRailAd from '@/components/RightRailAd';

const LS_KEY = 'np_alias';

export default function SettingsPage() {
  const [alias, setAlias] = useState('');
  const [msg, setMsg] = useState(null);
  const [saving, setSaving] = useState(false);

  // Load saved alias from localStorage
  useEffect(() => {
    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem(LS_KEY) : '';
      if (saved) setAlias(saved);
    } catch {}
  }, []);

  const save = async () => {
    setSaving(true);
    setMsg(null);
    try {
      const value = (alias || '').trim();
      if (value && !/^[A-Za-z0-9][A-Za-z0-9_-]{1,23}$/.test(value)) {
        setMsg('Use 2–24 chars. Letters/numbers, "-" or "_". Start with a letter/number.');
        setSaving(false);
        return;
      }
      if (typeof window !== 'undefined') {
        if (value) localStorage.setItem(LS_KEY, value);
        else localStorage.removeItem(LS_KEY);
      }
      setMsg('Saved.');
    } catch {
      setMsg('Could not save. Try again.');
    } finally {
      setSaving(false);
    }
  };

  const clearAlias = () => {
    setAlias('');
    setMsg(null);
    try { localStorage.removeItem(LS_KEY); } catch {}
  };

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
                onClick={save}
                disabled={saving}
                className="rounded-md bg-blue-600 hover:bg-blue-500 disabled:opacity-60 px-4 py-2 text-sm font-medium"
              >
                {saving ? 'Saving…' : 'Save'}
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

          {/* Your existing four cards */}
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
