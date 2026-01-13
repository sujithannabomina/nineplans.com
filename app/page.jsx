'use client';

import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Shell from "@/components/Shell";
import PostCard from "@/components/PostCard";
import { listenFeed } from "@/lib/firestore";

export default function HomePage() {
  const sp = useSearchParams();
  const initialTab = sp.get("tab") || "latest";
  const [tab, setTab] = useState(initialTab);
  const [q, setQ] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const sort = tab === "top" ? "top" : "latest";
    const unsub = listenFeed({
      sort,
      cb: (p) => { setPosts(p); setLoading(false); },
    });
    return () => unsub();
  }, [tab]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return posts;
    return posts.filter((p) =>
      (p.title + " " + p.body + " " + p.categoryName + " " + (p.tags || []).join(" "))
        .toLowerCase()
        .includes(s)
    );
  }, [posts, q]);

  return (
    <Shell q={q} setQ={setQ} tab={tab} setTab={setTab}>
      <div className="space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-xl font-extrabold tracking-tight">Home</div>
            <div className="text-sm text-black/60">Alias-first conversations — clean & fast.</div>
          </div>
          <div className="hidden md:block text-xs text-black/60">Use the right panel to change feed.</div>
        </div>

        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => <div key={i} className="card p-4 h-28 skeleton" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="card p-6">
            <div className="text-sm font-semibold">No results</div>
            <div className="text-sm text-black/60 mt-1">Try a different search.</div>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((p) => <PostCard key={p.id} post={p} />)}
          </div>
        )}
      </div>
    </Shell>
  );
}
