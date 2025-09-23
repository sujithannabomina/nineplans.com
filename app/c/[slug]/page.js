// app/c/[slug]/page.js
import Link from "next/link";

const CATEGORIES = [
  "Confessions","Posts","Product Reviews","Movie Reviews","Place Reviews",
  "Post Ideas","Post Ads","Business Info","Sports","Science","Automobile",
  "Education","Anime","Games"
];

function prettify(slug) {
  return slug
    .split("-")
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
}

export async function generateMetadata({ params }) {
  const name = prettify(params.slug);
  return { title: `${name} • NinePlans` };
}

export default function CategoryPage({ params }) {
  const label = prettify(params.slug);
  const isKnown = CATEGORIES.includes(label);

  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-extrabold tracking-tight">{label}</h1>
        <Link
          href={`/submit?cat=${encodeURIComponent(label)}`}
          className="rounded-lg border px-4 py-2 hover:bg-white/5 transition"
        >
          Write a post
        </Link>
      </div>

      {!isKnown && (
        <p className="mb-6 text-sm opacity-70">
          This category isn&apos;t recognized, but you can still post to it.
        </p>
      )}

      <div className="rounded-xl border p-6">
        <p className="opacity-80">
          No posts yet. Be the first to write one.
        </p>
      </div>
    </div>
  );
}
