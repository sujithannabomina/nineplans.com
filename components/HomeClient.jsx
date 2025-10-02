// components/HomeClient.jsx
'use client';

export default function HomeClient({ posts = [] }) {
  // Simple, layout-safe feed renderer. No external deps, no edge runtime.
  return (
    <section className="space-y-4">
      {posts.length === 0 ? (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
          <p className="text-zinc-400">No posts yet. Be the first to write one.</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {posts.map((p) => (
            <li
              key={p.id || p._id}
              className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4"
            >
              {p.categoryLabel || p.category ? (
                <div className="text-xs uppercase tracking-wide text-zinc-400 mb-1">
                  {p.categoryLabel || p.category}
                </div>
              ) : null}
              <p className="whitespace-pre-wrap text-zinc-100">{p.content}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
