'use client';

import { useSearchParams } from 'next/navigation';
import { CATEGORIES } from './CategoryLinks';
import { useState, useMemo } from 'react';

export default function SubmitClient() {
  const params = useSearchParams();
  const initialCat = params.get('cat') || 'Confessions';

  const [category, setCategory] = useState(initialCat);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const catOptions = useMemo(
    () => ['Confessions', ...CATEGORIES.filter(c => c.name !== 'Confessions').map(c => c.name)],
    []
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold">Submit</h1>

      <div className="grid gap-4 rounded-lg border border-zinc-800 bg-zinc-950 p-4">
        <div className="grid sm:grid-cols-3 gap-3">
          <div className="sm:col-span-1">
            <label className="text-sm text-zinc-400">Post as</label>
            <select className="mt-1 w-full rounded border border-zinc-700 bg-black p-2 text-sm">
              <option>Alias</option>
              <option>Real name</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="text-sm text-zinc-400">Category</label>
            <select
              className="mt-1 w-full rounded border border-zinc-700 bg-black p-2 text-sm"
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              {catOptions.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="text-sm text-zinc-400">Title</label>
          <input
            className="mt-1 w-full rounded border border-zinc-700 bg-black p-2 text-sm"
            placeholder="Keep it concise (max 140 chars)"
            value={title}
            onChange={e => setTitle(e.target.value)}
            maxLength={140}
          />
        </div>

        <div>
          <label className="text-sm text-zinc-400">Your post</label>
          <textarea
            className="mt-1 h-48 w-full resize-y rounded border border-zinc-700 bg-black p-2 text-sm"
            placeholder="Write your post. Links allowed. No images/videos in comments."
            value={body}
            onChange={e => setBody(e.target.value)}
          />
        </div>

        <div className="text-sm text-zinc-400">
          Images (up to 4): <span className="text-zinc-500">Coming soon</span>
        </div>

        <div>
          <button
            className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black hover:opacity-90"
            onClick={() => alert('Posting is not wired to a database yet. UI & auth are production-ready.')}
          >
            Post
          </button>
        </div>

        <div className="text-xs text-zinc-500 space-y-1">
          <div>• Posting as <b>Alias</b>. Set your alias in Profile → Settings.</div>
          <div>• No images/videos in comments. Up to 4 images in a post.</div>
        </div>
      </div>
    </div>
  );
}
