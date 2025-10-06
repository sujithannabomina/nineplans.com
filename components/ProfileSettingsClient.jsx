// components/ProfileSettingsClient.jsx
'use client';

import { useEffect, useState } from 'react';

export default function ProfileSettingsClient() {
  const [alias, setAlias] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetch('/api/profile', { cache: 'no-store' })
      .then(r => (r.ok ? r.json() : null))
      .then(d => setAlias(d?.alias || ''))
      .catch(() => {});
  }, []);

  const save = async () => {
    setStatus('');
    const res = await fetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ alias }),
    });
    if (res.ok) setStatus('Saved.');
    else {
      const j = await res.json().catch(() => ({}));
      setStatus(j?.error === 'alias_taken' ? 'Alias already taken.' : 'Could not save. Try again.');
    }
  };

  const clear = async () => {
    setAlias('');
    setStatus('');
  };

  return (
    <div className="rounded-xl border border-gray-800 bg-black/40 p-4">
      <h2 className="text-lg font-semibold mb-2">Alias</h2>
      <p className="text-gray-400 mb-2">
        Choose a public alias. When submitting, select <span className="font-semibold">Post as: Alias</span>.
      </p>
      <div className="flex gap-2">
        <input
          value={alias}
          onChange={e => setAlias(e.target.value)}
          placeholder="e.g. NightOwl"
          className="flex-1 rounded-md bg-gray-900 border border-gray-800 px-3 py-2"
        />
        <button onClick={save} className="px-3 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-500">Save</button>
        <button onClick={clear} className="px-3 py-2 rounded-md border border-gray-700 hover:bg-gray-800">Clear</button>
      </div>
      {status && <div className="text-sm mt-2 text-gray-300">{status}</div>}
    </div>
  );
}
