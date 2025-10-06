// components/HomeClient.jsx
'use client';

import { useEffect, useState } from 'react';
import PostCard from './PostCard';

export default function HomeClient() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('/api/post', { cache: 'no-store' })
      .then(r => (r.ok ? r.json() : null))
      .then(d => setPosts(d?.items || []))
      .catch(() => {});
  }, []);

  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold mb-2">Recent Posts</h1>
      {posts.length === 0 ? (
        <div className="rounded-md border border-gray-800 p-4 text-gray-400">No posts yet. Be the first to write one.</div>
      ) : (
        posts.map(p => <PostCard key={p.id} post={p} />)
      )}
    </section>
  );
}
