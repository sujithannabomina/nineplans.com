// app/post/page.jsx
import Link from "next/link";
import Feed from "@/components/Feed";
import { CATEGORIES } from "@/lib/site";

export const metadata = { title: "Posts • NinePlans" };

export default function PostIndex({ searchParams }) {
  const cat = typeof searchParams?.cat === "string" ? searchParams.cat : "";
  const isValid =
    !cat ||
    (CATEGORIES ?? []).some((c) =>
      (typeof c === "string" ? c : c.name).toLowerCase() === cat.toLowerCase()
    );

  const niceCat =
    (CATEGORIES ?? [])
      .map((c) => (typeof c === "string" ? c : c.name))
      .find((n) => n.toLowerCase() === cat.toLowerCase()) ?? "";

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          {niceCat ? niceCat : "Recent Posts"}
        </h1>
        <Link
          href={`/submit${niceCat ? `?cat=${encodeURIComponent(niceCat)}` : ""}`}
          className="rounded-md border border-zinc-700 px-3 py-1.5 text-sm hover:bg-zinc-900"
        >
          Write a post
        </Link>
      </div>

      {!isValid && (
        <div className="rounded-md border border-red-700/40 bg-red-950/20 p-4 text-sm text-red-200">
          Unknown category.
        </div>
      )}

      {/* TODO: wire actual Firestore query for category.
          For now, render an empty feed which shows the friendly empty state. */}
      <Feed posts={[]} />
    </div>
  );
}
