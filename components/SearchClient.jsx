// components/SearchClient.jsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

const CATEGORY_OPTIONS = [
  'All categories',
  // Original + new list merged (lowercased where used)
  'Confessions',
  'Posts',
  'Product reviews',
  'Movie reviews',
  'Place reviews',
  'Post ideas',
  'Post ads',
  'Business info',
  'Sports',
  'Science',
  'Automobile',
  'Education',
  'Anime',
  'Games',
  // Existing on the site
  'Relationships',
  'Work & Career',
  'Money',
  'Family',
  'Health',
  'Travel',
  'Tech',
  'Other',
];

function toApiCategory(label) {
  const v = (label || '').toLowerCase();
  if (v.startsWith('all')) return 'all';
  return v;
}

export default function SearchClient() {
  const params = useSearchParams();
  const router = useRouter();
  const initialQ = params.get('q') || '';
  const initialCat = params.get('category') || 'all';

  const [q, setQ] = useState(initialQ);
  const [category, setCategory] = useState(
    CATEGORY_OPTIONS.find(c => toApiCategory(c) === initialCat) || 'All categories'
  );
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const apiCategory = useMemo(() => toApiCategory(category), [category]);

  async function runSearch(nextQ = q, nextCat = apiCategory) {
    setLoading(true);
    try {
      const url = `/api/search?q=${encodeURIComponent(nextQ)}&category=${encodeURIComponent(nextCat)}`;
      const res = await fetch(url, { cache: 'no-store' });
      const json = await res.json();
      setResults(Array.isArray(json.results) ? json.results : []);
      // keep URL in sync (so refresh/share keeps state)
      const search = new URLSearchParams();
      if (nextQ) search.set('q', nextQ);
      if (nextCat && nextCat !== 'all') search.set('category', nextCat);
      const qs = search.toString();
      router.replace(`/search${qs ? `?${qs}` : ''}`);
    } catch (e) {
      console.error('search error', e);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // hydrate with current params
    runSearch(initialQ, initialCat);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Search</h1>

      <div className="flex flex-wrap items-center gap-2">
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && runSearch()}
          placeholder="Search titles & text..."
          className="w-80 rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 outline-none"
        />
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2"
        >
          {CATEGORY_OPTIONS.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <button
          onClick={() => runSearch()}
          disabled={loading}
          className="rounded-md bg-sky-600 px-4 py-2 font-medium disabled:opacity-60"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      <div className="text-sm text-zinc-400">
        Query: {q ? <span className="text-zinc-200">“{q}”</span> : '—'} · Category:{' '}
        <span className="text-zinc-200">{category}</span>
      </div>

      <div className="divide-y divide-zinc-800 rounded-lg border border-zinc-800">
        {results.length === 0 && (
          <div className="p-6 text-zinc-400">No posts yet. Be the first to write one.</div>
        )}
        {results.map(item => (
          <div key={item.id} className="p-6">
            <div className="mb-1 text-lg font-semibold">{item.title}</div>
            {item.category && (
              <div className="mb-2 text-xs uppercase tracking-wide text-zinc-400">
                {item.category}
              </div>
            )}
            <div className="text-zinc-300">{item.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
