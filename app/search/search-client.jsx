<<<<<<< HEAD
"use client";

import { useEffect, useMemo, useState } from "react";
import Feed from "@/components/Feed";

const CATS = [
  "All","Confessions","Posts","Product Reviews","Movie Reviews","Place Reviews",
  "Post Ideas","Post Ads","Business Info","Sports","Science","Automobile",
  "Education","Anime","Games",
];

export default function SearchClient() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [sort, setSort] = useState("recent");

  // Debounce to avoid hammering Firestore while typing
  const [debounced, setDebounced] = useState({ q: "", cat: "All", sort: "recent" });
  useEffect(() => {
    const t = setTimeout(() => setDebounced({ q, cat, sort }), 350);
    return () => clearTimeout(t);
  }, [q, cat, sort]);

  const effectiveCat = useMemo(
    () => (debounced.cat === "All" ? undefined : debounced.cat),
    [debounced.cat]
  );

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search title…"
          className="w-full rounded-lg border border-white/15 bg-black px-3 py-2 outline-none focus:border-white/30"
        />
        <select
          value={cat}
          onChange={(e) => setCat(e.target.value)}
          className="w-full rounded-lg border border-white/15 bg-black px-3 py-2"
        >
          {CATS.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full rounded-lg border border-white/15 bg-black px-3 py-2"
        >
          <option value="recent">Newest</option>
          <option value="liked">Most liked</option>
          <option value="commented">Most commented</option>
          <option value="viewed">Most viewed</option>
        </select>
      </div>

      <Feed
        category={effectiveCat}
        q={debounced.q.trim() || undefined}
        sort={debounced.sort}
      />
    </div>
  );
}
=======
"use client";

import { useEffect, useMemo, useState } from "react";
import Feed from "@/components/Feed";

const CATS = [
  "All","Confessions","Posts","Product Reviews","Movie Reviews","Place Reviews",
  "Post Ideas","Post Ads","Business Info","Sports","Science","Automobile",
  "Education","Anime","Games",
];

export default function SearchClient() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [sort, setSort] = useState("recent");

  // Debounce to avoid hammering Firestore while typing
  const [debounced, setDebounced] = useState({ q: "", cat: "All", sort: "recent" });
  useEffect(() => {
    const t = setTimeout(() => setDebounced({ q, cat, sort }), 350);
    return () => clearTimeout(t);
  }, [q, cat, sort]);

  const effectiveCat = useMemo(
    () => (debounced.cat === "All" ? undefined : debounced.cat),
    [debounced.cat]
  );

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search title…"
          className="w-full rounded-lg border border-white/15 bg-black px-3 py-2 outline-none focus:border-white/30"
        />
        <select
          value={cat}
          onChange={(e) => setCat(e.target.value)}
          className="w-full rounded-lg border border-white/15 bg-black px-3 py-2"
        >
          {CATS.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full rounded-lg border border-white/15 bg-black px-3 py-2"
        >
          <option value="recent">Newest</option>
          <option value="liked">Most liked</option>
          <option value="commented">Most commented</option>
          <option value="viewed">Most viewed</option>
        </select>
      </div>

      <Feed
        category={effectiveCat}
        q={debounced.q.trim() || undefined}
        sort={debounced.sort}
      />
    </div>
  );
}
>>>>>>> 724b0ef (Initial commit from local working folder)
