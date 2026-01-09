'use client';

import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/db";
import Shell from "@/components/Shell";
import PostCard from "@/components/PostCard";
import { listenFeed } from "@/lib/firestore";

export default function CategoryPage() {
  const { slug } = useParams();
  const [tab, setTab] = useState("latest");
  const [q, setQ] = useState("");
  const [cat, setCat] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ref = doc(db, "categories", slug);
    return onSnapshot(ref, (snap) => setCat(snap.exists() ? snap.data() : null));
  }, [slug]);

  useEffect(() => {
    setLoading(true);
    const sort = tab === "top" ? "top" : "latest";
    const unsub = listenFeed({
      categorySlug: slug,
      sort,
      cb: (p) => { setPosts(p); setLoading(false); },
    });
    return () => unsub();
  }, [slug, tab]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return posts;
    return posts.filter((p) => (p.title + " " + p.body + " " + (p.tags || []).join(" ")).toLowerCase().includes(s));
  }, [posts, q]);

  return (
    <Shell q={q} setQ={setQ} tab={tab} setTab={setTab}>
      <div className="space-y-4">
        <div className="card p-5">
          <div className="text-xs text-black/60">Category</div>
          <div className="text-2xl font-extrabold tracking-tight mt-1">{cat ? cat.name : `c/${slug}`}</div>
          <div className="text-sm text-black/70 mt-1">{cat?.description || "Loading…"}</div>
          {cat?.rules?.length ? (
            <ul className="mt-3 text-xs text-black/60 list-disc pl-5 space-y-1">
              {cat.rules.slice(0, 4).map((r) => <li key={r}>{r}</li>)}
            </ul>
          ) : null}
        </div>

        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => <div key={i} className="card p-4 h-28 skeleton" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="card p-6">
            <div className="text-sm font-semibold">No posts yet</div>
            <div className="text-sm text-black/60 mt-1">Be the first to post in this category.</div>
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
