"use client";

import React, { useEffect, useMemo, useState } from "react";
import Shell from "@/components/Shell";
import PostCard from "@/components/PostCard";
import { listenFeed } from "@/lib/firestore";

export default function HomeClient({ initialTab = "latest" }) {
  const [tab, setTab] = useState(initialTab || "latest");
  const [q, setQ] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    // Keep it simple for MVP: latest/top mapping
    const sort = tab === "top" || tab === "trending" ? "top" : "latest";

    const unsub = listenFeed({
      sort,
      cb: (arr) => {
        setPosts(arr || []);
        setLoading(false);
      },
    });

    return () => unsub?.();
  }, [tab]);

  const filtered = useMemo(() => {
    const s = (q || "").trim().toLowerCase();
    if (!s) return posts;
    return posts.filter((p) => {
      const title = (p.title || "").toLowerCase();
      const body = (p.body || "").toLowerCase();
      const cat = (p.categoryName || p.categorySlug || "").toLowerCase();
      return title.includes(s) || body.includes(s) || cat.includes(s);
    });
  }, [q, posts]);

  return (
    <Shell q={q} setQ={setQ} tab={tab} setTab={setTab}>
      <div className="space-y-3">
        {loading ? (
          <div className="card p-6">
            <div className="text-sm font-semibold">Loading…</div>
            <div className="text-sm text-black/60 mt-1">Fetching fresh posts.</div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="card p-6">
            <div className="text-sm font-semibold">No results</div>
            <div className="text-sm text-black/60 mt-1">Try a different search.</div>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        )}
      </div>
    </Shell>
  );
}
