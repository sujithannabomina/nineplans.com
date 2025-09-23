<<<<<<< HEAD
// /components/HomeClient.jsx
'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { fromSlug } from '@/components/CategoryLinks';

export default function HomeClient() {
  const params = useSearchParams();
  const cat = params.get('cat');                // e.g. ?cat=sports
  const categoryName = fromSlug(cat);

  const title = categoryName ? `${categoryName}` : 'Recent Posts';
  const writeHref = categoryName ? `/submit?cat=${cat}` : '/submit';

  return (
    <section className="flex-1 min-w-0">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{title}</h1>
        <Link
          className="rounded-xl border border-zinc-700 px-4 py-2 hover:bg-zinc-800"
          href={writeHref}
        >
          Write a post
        </Link>
      </div>

      {/* POSTS FEED – replace with your real Feed when ready */}
      <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
        <p className="text-zinc-300">
          No posts yet. Be the first to write one.
        </p>
      </div>
    </section>
  );
}
=======
// /components/HomeClient.jsx
'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { fromSlug } from '@/components/CategoryLinks';

export default function HomeClient() {
  const params = useSearchParams();
  const cat = params.get('cat');                // e.g. ?cat=sports
  const categoryName = fromSlug(cat);

  const title = categoryName ? `${categoryName}` : 'Recent Posts';
  const writeHref = categoryName ? `/submit?cat=${cat}` : '/submit';

  return (
    <section className="flex-1 min-w-0">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{title}</h1>
        <Link
          className="rounded-xl border border-zinc-700 px-4 py-2 hover:bg-zinc-800"
          href={writeHref}
        >
          Write a post
        </Link>
      </div>

      {/* POSTS FEED – replace with your real Feed when ready */}
      <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
        <p className="text-zinc-300">
          No posts yet. Be the first to write one.
        </p>
      </div>
    </section>
  );
}
>>>>>>> 724b0ef (Initial commit from local working folder)
