// /app/c/[slug]/page.js
import Link from "next/link";
import { Suspense } from "react";
import Feed from "@/components/Feed";

export const dynamic = "force-dynamic"; // always render, don’t 404 on unknown slugs

export async function generateMetadata({ params }) {
  const title = `${decodeURIComponent(params.slug)
    .replace(/-/g, " ")
    .replace(/\b\w/g, (m) => m.toUpperCase())} • NinePlans`;
  return { title };
}

export default function CategoryPage({ params }) {
  const slug = decodeURIComponent(params.slug);

  return (
    <div className="space-y-6">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold">
            {slug.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase())}
          </h1>
          <p className="text-sm text-zinc-400">Recent posts in “{slug}”.</p>
        </div>

        {/* “Write in this category” CTA -> /submit?category=<slug> */}
        <Link
          href={`/submit?category=${encodeURIComponent(slug)}`}
          className="button whitespace-nowrap"
        >
          Write in this category
        </Link>
      </header>

      <Suspense fallback={<div className="text-zinc-400 px-2 py-4">Loading posts…</div>}>
        <Feed category={slug} />
      </Suspense>
    </div>
  );
}
