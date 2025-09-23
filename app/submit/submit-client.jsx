'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

const CATS = [
  'Confessions','Posts','Product Reviews','Movie Reviews','Place Reviews',
  'Post Ideas','Post Ads','Business Info','Sports','Science','Automobile',
  'Education','Anime','Games'
];

export default function SubmitClient() {
  const params = useSearchParams();
  const catParam = params.get('cat') || '';
  const initial = useMemo(() => {
    const idx = CATS.findIndex(c => c.toLowerCase() === catParam?.toLowerCase());
    return idx >= 0 ? CATS[idx] : 'Confessions';
  }, [catParam]);

  const [category, setCategory] = useState(initial);

  useEffect(() => {
    setCategory(initial);
  }, [initial]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="text-sm text-zinc-400">Category</div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2"
        >
          {CATS.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4">
        {/* your existing form fields… */}
        <div className="text-zinc-400 text-sm">
          Write your post. Links allowed. No images/videos in comments.
        </div>
      </div>
    </div>
  );
}
