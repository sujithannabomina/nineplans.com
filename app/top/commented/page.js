import { Suspense } from "react";
import Feed from "@/components/Feed";

export const metadata = { title: "Most Commented • NinePlans" };

export default function TopCommentedPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Most Commented</h1>
      <Suspense fallback={<div className="text-zinc-400 px-2 py-4">Loading…</div>}>
        <Feed sort="commented" />
      </Suspense>
    </div>
  );
}
