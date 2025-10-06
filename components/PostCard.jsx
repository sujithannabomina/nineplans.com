// components/PostCard.jsx
// Server component – renders a list item with buttons
import Link from 'next/link';
import EngagementButtons from './EngagementButtons';

export default function PostCard({ post }) {
  return (
    <article className="border rounded-xl p-4 hover:bg-gray-50 transition">
      <Link href={`/post/${post.id}`} className="block" prefetch>
        <h3 className="font-semibold line-clamp-1">{post.title || 'Untitled'}</h3>
        <p className="text-sm text-gray-600 line-clamp-2 mt-1">
          {post.excerpt || post.content?.slice(0, 160) || ''}
        </p>
        <div className="text-xs text-gray-500 mt-2">
          {post.category ? <span>#{post.category} · </span> : null}
          {post.aliasName ? `by ${post.aliasName}` : (post.authorName ? `by ${post.authorName}` : 'by someone')}
        </div>
      </Link>

      <div className="flex items-center justify-between mt-3">
        <div className="text-xs text-gray-500">
          👁 {post.viewCount || 0} · ❤️ {post.likeCount || 0} · 💾 {post.saveCount || 0} · 💬 {post.commentCount || 0}
        </div>
        <EngagementButtons
          postId={post.id}
          counts={{ likeCount: post.likeCount || 0, saveCount: post.saveCount || 0 }}
        />
      </div>
    </article>
  );
}
