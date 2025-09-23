// app/top/viewed/page.js
"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import PostCard from "@/components/PostCard";
import { getTopPosts } from "@/lib/db";

export default function TopViewedPage() {
  const [items, setItems] = useState([]);
  useEffect(() => { (async () => setItems(await getTopPosts("viewed", 50)))(); }, []);
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-6">
        <h1 className="text-2xl font-semibold mb-4">Top — Most Viewed</h1>
        {!items.length ? <div className="opacity-70">No posts yet.</div> :
          items.map(p => <PostCard key={p.id} post={p} />)}
      </main>
    </>
  );
}
