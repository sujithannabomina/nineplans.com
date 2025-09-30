"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import CategorySelect from "@/components/CategorySelect";
import PostCard from "@/components/PostCard"; // your existing card

export default function SearchClient() {
  const params = useSearchParams();
  const router = useRouter();
  const [q, setQ] = useState(params.get("q") || "");
  const [category, setCategory] = useState(params.get("cat") || "");
  const [results, setResults] = useState([]);
  const [ran, setRan] = useState(false);

  useEffect(() => {
    const qq = params.get("q") || "";
    const cc = params.get("cat") || "";
    setQ(qq);
    setCategory(cc);
  }, [params]);

  async function doSearch(e) {
    e?.preventDefault();
    const searchParams = new URLSearchParams();
    if (q) searchParams.set("q", q);
    if (category) searchParams.set("cat", category);
    router.replace(`/search?${searchParams.toString()}`);

    const res = await fetch(`/api/search?${searchParams.toString()}`, {
      next: { revalidate: 0 },
    });
    if (res.ok) {
      setResults(await res.json());
      setRan(true);
    }
  }

  useEffect(() => {
    // run on mount with current params
    doSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Search</h1>
      <form onSubmit={doSearch} className="grid gap-3 md:grid-cols-[1fr,14rem,8rem]">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search titles & text…"
          className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm text-neutral-100 outline-none focus:ring-1 focus:ring-neutral-600"
        />
        <CategorySelect value={category} onChange={setCategory} />
        <button
          className="rounded-lg bg-neutral-800 px-4 py-2 text-sm text-white hover:bg-neutral-700"
          type="submit"
        >
          Search
        </button>
      </form>

      <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-4">
        {results.length === 0 ? (
          <p className="text-sm text-neutral-400">
            {ran ? "No posts found." : "—"}
          </p>
        ) : (
          <div className="space-y-3">
            {results.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
