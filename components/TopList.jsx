// components/TopList.jsx
// Server Component – lists posts ordered by a metric
import Link from 'next/link';
import { adminDB } from '@/lib/firebaseAdmin';

export const revalidate = 0;

export default async function TopList({ by = 'viewed', limit = 50 }) {
  const metric =
    by === 'liked' ? 'likeCount' :
    by === 'saved' ? 'saveCount' :
    by === 'commented' ? 'commentCount' :
    'viewCount';

  const snap = await adminDB
    .collection('posts')
    .orderBy(metric, 'desc')
    .limit(limit)
    .get();

  const posts = snap.docs.map(d => ({ id: d.id, ...d.data() }));

  if (!posts.length) {
    return <p className="text-sm text-gray-500 px-2">No posts yet.</p>;
  }

  return (
    <ul className="space-y-3">
      {posts.map((p) => (
        <li key={p.id} className="border rounded-xl p-4 hover:bg-gray-50 transition">
          <Link href={`/post/${p.id}`} className="block" prefetch>
            <div className="font-medium line-clamp-1">{p.title || 'Untitled'}</div>
            <div className="text-xs text-gray-500 mt-1">
              {p.category ? <span>#{p.category} · </span> : null}
              {p.aliasName ? `by ${p.aliasName}` : (p.authorName ? `by ${p.authorName}` : 'by someone')}
            </div>
            <div className="text-xs text-gray-500 mt-2">
              👁 {p.viewCount || 0} · ❤️ {p.likeCount || 0} · 💾 {p.saveCount || 0} · 💬 {p.commentCount || 0}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
