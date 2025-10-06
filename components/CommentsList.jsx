// components/CommentsList.jsx
'use client';

import { useSession } from 'next-auth/react';
import useSWR from 'swr';
import { useState } from 'react';

const fetcher = (url) => fetch(url).then(r => r.json());

export default function CommentsList({ postId }) {
  const { data: session } = useSession();
  const { data, mutate } = useSWR(`/api/comments?postId=${postId}`, fetcher, { refreshInterval: 0 });
  const items = data?.items || [];

  const remove = async (id) => {
    if (!confirm('Delete this comment?')) return;
    await fetch(`/api/comments/${id}`, { method: 'DELETE' });
    mutate();
  };

  return (
    <div className="space-y-3">
      {items.length === 0 && (
        <div className="rounded-md border border-gray-800 p-3 text-gray-400">No comments yet.</div>
      )}
      {items.map(c => {
        const isOwner = session?.user?.email && c.userId === session.user.email;
        const name = c.authorType === 'ALIAS' ? c.alias : c.authorName || (c.userId ? c.userId.split('@')[0] : 'User');
        return (
          <div key={c.id} className="rounded-md border border-gray-800 p-3 bg-black/40">
            <div className="text-sm text-gray-400 mb-1">
              <span className="font-medium text-gray-200">{name}</span>
            </div>
            <div className="whitespace-pre-wrap text-gray-100">{c.content}</div>
            {isOwner && (
              <div className="mt-2">
                <button
                  className="px-2 py-1 text-xs rounded bg-red-600 text-white hover:bg-red-500"
                  onClick={() => remove(c.id)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
