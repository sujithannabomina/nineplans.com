"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { db } from "@/lib/db";
import {
  collection, query, where, orderBy, limit, getDocs,
} from "firebase/firestore";

export default function Feed({ category, q, sort = "recent", max = 25 }) {
  const [posts, setPosts] = useState(null); // null = loading, [] = empty
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function run() {
      try {
        setError("");
        setPosts(null);

        const col = collection(db, "posts");
        let constraints = [];

        if (category) {
          constraints.push(where("category", "==", category));
        }
        if (q) {
          // naive text search on title; keeps Firestore simple
          constraints.push(where("title_lowercase", ">=", q.toLowerCase()));
          constraints.push(where("title_lowercase", "<=", q.toLowerCase() + "\uf8ff"));
        }

        if (sort === "liked") constraints.push(orderBy("likes_count", "desc"));
        else if (sort === "commented") constraints.push(orderBy("comments_count", "desc"));
        else if (sort === "viewed") constraints.push(orderBy("views_count", "desc"));
        else constraints.push(orderBy("created_at", "desc"));

        constraints.push(limit(max));

        const snap = await getDocs(query(col, ...constraints));
        if (ignore) return;

        const rows = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setPosts(rows);
      } catch (e) {
        console.error(e);
        if (!ignore) setError("Failed to load posts.");
        setPosts([]);
      }
    }

    run();
    return () => { ignore = true; };
  }, [category, q, sort, max]);

  if (error) {
    return <div className="text-red-400 text-sm">{error}</div>;
  }

  if (posts === null) {
    return <div className="text-white/60">Loading…</div>;
  }

  if (posts.length === 0) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/5 p-5 text-white/70">
        No posts yet. Be the first to write one.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((p) => (
        <article
          key={p.id}
          className="rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/7"
        >
          <Link href={`/post/${p.id}`} className="block">
            <h2 className="text-lg font-semibold">{p.title ?? "Untitled"}</h2>
            {p.subtitle && (
              <p className="text-white/70 mt-1 line-clamp-2">{p.subtitle}</p>
            )}
          </Link>
          <div className="mt-3 text-xs text-white/50 flex gap-3">
            <span>{p.category ?? "General"}</span>
            <span>❤ {p.likes_count ?? 0}</span>
            <span>💬 {p.comments_count ?? 0}</span>
            <span>👁 {p.views_count ?? 0}</span>
          </div>
        </article>
      ))}
    </div>
  );
}
