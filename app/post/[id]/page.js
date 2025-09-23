<<<<<<< HEAD
import { notFound } from 'next/navigation';
import { getPost, listComments } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function PostPage({ params }) {
  const { id } = params || {};
  const post = await getPost(id);

  if (!post) {
    // No DB yet → show a simple "not found" instead of crashing
    return notFound();
  }

  const comments = await listComments(id);

  return (
    <div className="space-y-5">
      <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
        <div className="text-xs text-zinc-400">#{post.id}</div>
        <h1 className="mt-1 text-2xl font-bold">{post.title}</h1>
        <div className="mt-2 text-sm text-zinc-300 whitespace-pre-wrap">{post.body}</div>

        <div className="mt-3 flex flex-wrap gap-3 text-xs text-zinc-400">
          <span>Category: {post.category}</span>
          <span>Likes: {post.likes ?? 0}</span>
          <span>Views: {post.views ?? 0}</span>
        </div>
      </div>

      <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
        <div className="font-semibold mb-2">Comments</div>
        {comments.length === 0 ? (
          <div className="text-sm text-zinc-400">No comments yet.</div>
        ) : (
          <div className="space-y-3">
            {comments.map((c) => (
              <div key={c.id} className="rounded border border-zinc-800 bg-black p-3">
                <div className="text-xs text-zinc-400 mb-1">{c.author || 'anon'}</div>
                <div className="text-sm text-zinc-200 whitespace-pre-wrap">{c.text}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
=======
import { notFound } from 'next/navigation';
import { getPost, listComments } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function PostPage({ params }) {
  const { id } = params || {};
  const post = await getPost(id);

  if (!post) {
    // No DB yet → show a simple "not found" instead of crashing
    return notFound();
  }

  const comments = await listComments(id);

  return (
    <div className="space-y-5">
      <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
        <div className="text-xs text-zinc-400">#{post.id}</div>
        <h1 className="mt-1 text-2xl font-bold">{post.title}</h1>
        <div className="mt-2 text-sm text-zinc-300 whitespace-pre-wrap">{post.body}</div>

        <div className="mt-3 flex flex-wrap gap-3 text-xs text-zinc-400">
          <span>Category: {post.category}</span>
          <span>Likes: {post.likes ?? 0}</span>
          <span>Views: {post.views ?? 0}</span>
        </div>
      </div>

      <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
        <div className="font-semibold mb-2">Comments</div>
        {comments.length === 0 ? (
          <div className="text-sm text-zinc-400">No comments yet.</div>
        ) : (
          <div className="space-y-3">
            {comments.map((c) => (
              <div key={c.id} className="rounded border border-zinc-800 bg-black p-3">
                <div className="text-xs text-zinc-400 mb-1">{c.author || 'anon'}</div>
                <div className="text-sm text-zinc-200 whitespace-pre-wrap">{c.text}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
>>>>>>> 724b0ef (Initial commit from local working folder)
