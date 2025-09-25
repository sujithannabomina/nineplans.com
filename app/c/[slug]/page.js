// app/c/[slug]/page.js
import Feed from "@/components/Feed";
import Link from "next/link";

// Keep a local list so the page works even if lib/site.js isn't imported here.
const CATS = [
  "Confessions",
  "Posts",
  "Product Reviews",
  "Movie Reviews",
  "Place Reviews",
  "Post Ideas",
  "Post Ads",
  "Business Info",
  "Sports",
  "Science",
  "Automobile",
  "Education",
  "Anime",
];

const toSlug = (s) =>
  (s || "")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/['"’`]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

function nameFromSlug(slug) {
  const hit = CATS.find((c) => toSlug(c) === slug);
  if (hit) return hit;
  // Fallback to decent title-casing
  return (slug || "")
    .split("-")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : ""))
    .join(" ");
}

export async function generateMetadata({ params }) {
  const categoryName = nameFromSlug(params.slug);
  return {
    title: `${categoryName} • NinePlans`,
  };
}

export default function CategoryPage({ params }) {
  const categoryName = nameFromSlug(params.slug);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{categoryName}</h1>
        <Link
          href={`/submit?cat=${encodeURIComponent(categoryName)}`}
          className="rounded-md border border-white/15 px-3 py-1.5 text-sm hover:bg-white/10"
        >
          Write a post
        </Link>
      </div>

      {/* Feed will filter by category on the client */}
      <Feed category={categoryName} />
    </div>
  );
}
