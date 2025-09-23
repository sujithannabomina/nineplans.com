// app/search/search-client.jsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Feed from "@/components/Feed";

export default function SearchClient({
  initialQuery = "",
  initialCategory = "",
  categories = [],
}) {
  const router = useRouter();
  const params = useSearchParams();

  const cats = useMemo(
    () => (Array.isArray(categories) ? categories : []),
    [categories]
  );

  const [q, setQ] = useState(initialQuery);
  const [cat, setCat] = useState(
    cats.includes(initialCategory) ? initialCategory : ""
  );

  // keep state in sync with URL changes (e.g. back/forward)
  useEffect(() => {
    const urlQ = params.get("q") ?? "";
    const urlCat = params.get("cat") ?? "";
    setQ(urlQ);
    setCat(cats.includes(urlCat) ? urlCat : "");
  }, [params, cats]);

  const apply = () => {
    const sp = new URLSearchParams();
    if (q) sp.set("q", q);
    if (cat) sp.set("cat", cat);
    router.push(`/search${sp.toString() ? `?${sp}` : ""}`);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    apply();
  };

  return (
    <div className="grid gap-4">
      <h1 className="text-3xl font-bold">Search</h1>

      <form onSubmit={onSubmit} className="flex flex-wrap gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search titles & text…"
          className="min-w-[260px] grow rounded-md border border-zinc-700 bg-black px-3 py-2 text-sm text-zinc-200"
        />
        <select
          value={cat}
          onChange={(e) => setCat(e.target.value)}
          className="rounded-md border border-zinc-700 bg-black px-3 py-2 text-sm text-zinc-200"
        >
          <option value="">All categories</option>
          {cats.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="rounded-md border border-zinc-700 px-3 py-2 text-sm hover:bg-zinc-900"
        >
          Search
        </button>
      </form>

      <div className="text-sm text-zinc-400">
        Query: <span className="text-zinc-200">{q || "—"}</span>
        {cat ? (
          <>
            {" "}| Category: <span className="text-zinc-200">{cat}</span>
          </>
        ) : null}
      </div>

      {/* TODO: replace with real results; empty feed shows a friendly state */}
      <Feed posts={[]} />
    </div>
  );
}
