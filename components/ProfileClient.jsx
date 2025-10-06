// components/ProfileClient.jsx
'use client';

import { useEffect, useState } from 'react';
import PostCard from './PostCard';

export default function ProfileClient() {
  const [posts, setPosts] = useState([]);

  const load = () =>
    fetch('/api/post?mine=1', { cache: 'no-store' })
      .then(r => (r.ok ? r.json() : null))
      .then(d => setPosts(d?.items || []))
      .catch(() => {});

  useEffect(() => { load(); }, []);

  return (
    <section className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-gray-800 bg-black/40 p-4">
          <h3 className="font-semibold mb-2">Your posts</h3>
          {posts.length === 0 ? (
            <div className="text-gray-400">No posts yet.</div>
          ) : (
            <div className="space-y-3">
              {posts.map(p => <PostCard key={p.id} post={p} onDeleted={load} />)}
            </div>
          )}
        </div>
        <div className="rounded-xl border border-gray-800 bg-black/40 p-4">
          <h3 className="font-semibold mb-2">Saved</h3>
          <div className="text-gray-400">No saved posts yet.</div>
        </div>
      </div>
      <div className="rounded-xl border border-gray-800 bg-black/40 p-4">
        <h3 className="font-semibold mb-2">Comments</h3>
        <div className="text-gray-400">No comments yet.</div>
      </div>
    </section>
  );
}
