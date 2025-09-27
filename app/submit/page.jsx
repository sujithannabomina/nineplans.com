// app/submit/page.jsx
'use client';
export const dynamic = 'force-dynamic';

import { useSession } from 'next-auth/react';
import { useState } from 'react';

const CATEGORIES = [
  'confessions','posts','product reviews','movie reviews','place reviews',
  'post ideas','post ads','Business info','Sports','Science','Automobile',
  'Education','Anime','Games'
];

export default function SubmitPage() {
  const { data: session, status } = useSession();
  const [form, setForm] = useState({ title: '', body: '', category: CATEGORIES[0] });

  if (status === 'loading') return <div className="p-4">Loading…</div>;
  if (!session) return <div className="p-4">Please log in to submit.</div>;

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: form.title,
        body: form.body,
        category: form.category,
        authorId: session.user?.id || session.user?.uid || session.user?.email || 'unknown',
      }),
    });
    const json = await res.json();
    alert(res.ok ? `Submitted: ${json.id}` : `Error: ${json.error || 'Unknown'}`);
  };

  return (
    <div className="p-6 max-w-xl">
      <h1 className="text-xl font-semibold mb-4">Submit a Post</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input
          className="w-full border rounded p-2"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <textarea
          className="w-full border rounded p-2 h-32"
          placeholder="Body"
          value={form.body}
          onChange={(e) => setForm({ ...form, body: e.target.value })}
          required
        />
        <select
          className="w-full border rounded p-2"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <button className="border px-4 py-2 rounded" type="submit">Publish</button>
      </form>
    </div>
  );
}
