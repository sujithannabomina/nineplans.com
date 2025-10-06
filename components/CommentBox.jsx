// components/CommentBox.jsx
'use client';

import { useEffect, useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then(r => r.json());

export default function CommentBox({ postId }) {
  const { data: session, status } = useSession();
  const [postAs, setPostAs] = useState('USER');
  const [alias, setAlias] = useState('');
  const [text, setText] = useState('');
  const { mutate } = useSWR(`/api/comments?postId=${postId}`, fetcher);

  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/profile').then(r => r.json()).then(d => setAlias(d?.alias || '')).catch(() => {});
    }
  }, [status]);

  const submit = async (e) => {
    e.preventDefault();
    if (status !== 'authenticated') return signIn('google');
    if (!text.trim()) return;

    const res = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId, content: text, postAs }),
    });
    if (res.ok) {
      setText('');
      mutate();
    }
  };

  return (
    <form onSubmit={submit} className="rounded-xl border border-gray-800 bg-black/40 p-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Comment as</label>
          <select
            value={postAs}
            onChange={e => setPostAs(e.target.value)}
            className="w-full rounded-md bg-gray-900 border border-gray-800 px-3 py-2"
          >
            <option value="USER">Account name (User)</option>
            <option value="ALIAS" disabled={!alias}>Alias</option>
          </select>
          {postAs === 'ALIAS' && !alias && (
            <p className="text-amber-400 text-xs mt-2">No alias yet — <a href="/profile/settings" className="underline">create one</a>.</p>
          )}
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm text-gray-400 mb-1">Your comment</label>
          <textarea
            rows={3}
            value={text}
            onChange={e => setText(e.target.value)}
            className="w-full rounded-md bg-gray-900 border border-gray-800 px-3 py-2"
            placeholder="Write a comment"
          />
        </div>
      </div>
      <div className="mt-3">
        <button className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-500" type="submit">
          Comment
        </button>
      </div>
    </form>
  );
}
