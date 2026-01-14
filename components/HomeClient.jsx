"use client";

import React, { useEffect, useMemo, useState } from "react";
import Shell from "@/components/Shell";
import PostCard from "@/components/PostCard";
import { listenFeed } from "@/lib/firestore";

export default function HomeClient() {
  const [tab, setTab] = useState("latest");
  const [q, setQ] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setLoading(true);
    setErrMsg("");

    // Safety timeout: never stay stuck on Loading
    const t = setTimeout(() => {
      setLoading(false);
      setErrMsg((m) => m || "");
    }, 5000);

    const unsub = listenFeed({
      sort: tab === "top" || tab === "trending" ? "top" : "latest",
      cb: (arr) => {
        clearTimeout(t);
        setPosts(arr || []);
        setLoading(false);
      },
      onError: (e) => {
        clearTimeout(t);
        setLoading(false);
        setErrMsg("Unable to load posts (check Firestore rules / env vars).");
      },
    });

    return () => {
      clearTimeout(t);
      unsub?.();
    };
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
    <Shell tab={tab} setTab={setTab}>
      {/* Center search bar (matches your sketch) */}
      <div className="card p-3 mb-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search posts, categories, tags..."
          className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm outline-none focus:border-black"
        />
      </div>

      {loading ? (
        <div className="card p-6">
          <div className="text-sm font-semibold">Loading…</div>
          <div className="text-sm text-black/60 mt-1">Fetching fresh posts.</div>
        </div>
      ) : errMsg ? (
        <div className="card p-6">
          <div className="text-sm font-semibold">Couldn’t load posts</div>
          <div className="text-sm text-black/60 mt-2">{errMsg}</div>
          <div className="text-xs text-black/50 mt-2">
            Most common cause: Firestore rules not published or env vars missing in Vercel.
          </div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="card p-6">
          <div className="text-sm font-semibold">No posts yet</div>
          <div className="text-sm text-black/60 mt-1">
            Be the first to post. Use the Create button in the header.
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((p) => (
            <PostCard key={p.id} post={p} />
          ))}
        </div>
      )}
    </Shell>
  );
}
