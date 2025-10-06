// app/post/[id]/page.jsx
export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { adminDB } from '@/lib/firebaseAdmin';
import LeftNav from '@/components/LeftNav';
import RightRail from '@/components/RightRail';
import ViewTracker from '@/components/ViewTracker';
import EngagementButtons from '@/components/EngagementButtons';
import Comments from '@/components/Comments';

async function getPost(id) {
  const snap = await adminDB.collection('posts').doc(id).get();
  if (!snap.exists) return null;
  return { id: snap.id, ...snap.data() };
}

export default async function PostDetailPage({ params }) {
  const { id } = params || {};
  const post = await getPost(id);
  if (!post) return notFound();

  return (
    <div className="container mx-auto px-3 lg:px-6 py-4">
      <div className="grid grid-cols-12 gap-4">
        {/* Left */}
        <aside className="hidden lg:block col-span-12 lg:col-span-3">
          <LeftNav />
        </aside>

        {/* Main */}
        <main className="col-span-12 lg:col-span-6">
          <article className="prose max-w-none">
            <h1 className="text-2xl font-bold mb-2">{post.title || 'Untitled'}</h1>
            <div className="text-sm text-gray-500 mb-4">
              {post.category ? <Link className="hover:underline" href={`/c/${encodeURIComponent(post.category)}`}>#{post.category}</Link> : null}
              {post.aliasName ? ` · by ${post.aliasName}` : (post.authorName ? ` · by ${post.authorName}` : '')}
            </div>

            {post.images?.length ? (
              <div className="grid grid-cols-2 gap-3 mb-4">
                {post.images.slice(0, 5).map((src, i) => (
                  <img key={i} src={src} alt="" className="rounded-xl w-full h-auto object-cover" />
                ))}
              </div>
            ) : null}

            <div className="whitespace-pre-wrap">{post.content || ''}</div>

            <div className="mt-4 flex items-center justify-between">
              <div className="text-xs text-gray-500">
                👁 {post.viewCount || 0} · ❤️ {post.likeCount || 0} · 💾 {post.saveCount || 0} · 💬 {post.commentCount || 0}
              </div>
              <EngagementButtons postId={post.id} counts={{ likeCount: post.likeCount || 0, saveCount: post.saveCount || 0 }} />
            </div>
          </article>

          <Comments postId={post.id} />
          <ViewTracker postId={post.id} />
        </main>

        {/* Right */}
        <aside className="hidden lg:block col-span-12 lg:col-span-3">
          <RightRail />
        </aside>
      </div>
    </div>
  );
}
