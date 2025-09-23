import Link from "next/link";
import Feed from "@/components/Feed";

export const metadata = { title: "Posts • NinePlans" };

/**
 * Renders posts by category when /post?cat=Category is visited.
 * No useSearchParams() to avoid prerender CSR bailout; we use the App Router
 * searchParams arg which is safe for SSG/SSR.
 */
export default function PostByCategoryPage({ searchParams }) {
  const cat = typeof searchParams?.cat === "string" ? searchParams.cat : "";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          {cat ? cat : "All Posts"}
        </h1>
        <Link
          href={`/submit${cat ? `?cat=${encodeURIComponent(cat)}` : ""}`}
          className="rounded-full border border-white/15 px-4 py-2 text-sm hover:bg-white/5"
        >
          Write a post
        </Link>
      </div>

      {/* Feed knows how to filter by category and show “no posts yet…” */}
      <Feed category={cat || undefined} />
    </div>
  );
}
