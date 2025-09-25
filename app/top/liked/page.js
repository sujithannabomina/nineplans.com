import { Suspense } from "react";
import Feed from "@/components/Feed";

export const metadata = { title: "Most Liked • NinePlans" };

export default function TopLikedPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Most Liked</h1>
      <Suspense fallback={<div className="text-zinc-400 px-2 py-4">Loading…</div>}>
        <Feed sort="liked" />
      </Suspense>
    </div>
  );
}
