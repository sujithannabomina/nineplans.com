import { Suspense } from "react";
import SearchClient from "./search-client";

export const metadata = { title: "Search • NinePlans" };

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="px-2 py-4 text-zinc-400">Loading search…</div>}>
      <SearchClient />
    </Suspense>
  );
}
