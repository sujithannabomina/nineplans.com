import { Suspense } from "react";
import Feed from "@/components/Feed";

export const metadata = { title: "Saved • NinePlans" };

export default function TopSavedPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Saved</h1>
      <p className="text-sm text-zinc-400">
        Your saved posts (sign in required).
      </p>
      <Suspense fallback={<div className="text-zinc-400 px-2 py-4">Loading…</div>}>
        <Feed sort="saved" />
      </Suspense>
    </div>
  );
}
