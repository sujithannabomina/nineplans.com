// app/search/page.jsx
import LeftNav from "@/components/LeftNav";
import RightRailAd from "@/components/RightRailAd";
import { Suspense } from "react";
import SearchClient from "./search-client";

export const dynamic = "force-dynamic";

export default function SearchPage() {
  return (
    <main className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-2 md:px-4 lg:grid-cols-[14rem,1fr] xl:grid-cols-[14rem,1fr,18rem]">
      <LeftNav />
      <section className="px-1 py-4">
        <Suspense fallback={<div className="p-4 text-neutral-400">Loading…</div>}>
          <SearchClient />
        </Suspense>
      </section>
      <RightRailAd />
    </main>
  );
}
