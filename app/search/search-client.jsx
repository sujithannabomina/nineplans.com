// app/search/search-client.jsx
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const CATEGORIES = [
  'confessions','posts','product reviews','movie reviews','place reviews',
  'post ideas','post ads','Business info','Sports','Science','Automobile',
  'Education','Anime','Games'
];

export default function SearchClient() {
  const sp = useSearchParams();
  const [q, setQ] = useState(sp.get('q') || '');
  const [category, setCategory] = useState(sp.get('category') || '');
  const [results, setResults] = useState([]);

  const runSearch = async () => {
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    if (category) params.set('category', category);
    const res = await fetch(`/api/search?${params.toString()}`);
    const json = await res.json();
    setResults(json.data || []);
  };

  useEffect(() => {
    runSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-6">
      <div className="flex gap-2 mb-4">
        <input
          className="border rounded p-2 flex-1"
          placeholder="Search…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <select
          className="border rounded p-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All categories</option>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <button className="border rounded px-3" onClick={runSearch}>Search</button>
      </div>

      {results.length === 0 ? (
        <p>No results.</p>
      ) : (
        <ul className="space-y-3">
          {results.map((r) => (
            <li key={r.id} className="border rounded p-3">
              <div className="text-sm opacity-70 mb-1">{r.category}</div>
              <div className="font-semibold">{r.title}</div>
              <div className="text-sm line-clamp-2">{r.body}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
