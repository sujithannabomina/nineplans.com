<<<<<<< HEAD
// app/top/liked/page.js
"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import PostCard from "@/components/PostCard";
import { getTopPosts } from "@/lib/db";

export default function TopLikedPage() {
  const [items, setItems] = useState([]);
  useEffect(() => { (async () => setItems(await getTopPosts("liked", 50)))(); }, []);
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-6">
        <h1 className="text-2xl font-semibold mb-4">Top — Most Liked</h1>
        {!items.length ? <div className="opacity-70">No posts yet.</div> :
          items.map(p => <PostCard key={p.id} post={p} />)}
      </main>
    </>
  );
}
=======
// app/top/liked/page.js
"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import PostCard from "@/components/PostCard";
import { getTopPosts } from "@/lib/db";

export default function TopLikedPage() {
  const [items, setItems] = useState([]);
  useEffect(() => { (async () => setItems(await getTopPosts("liked", 50)))(); }, []);
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-6">
        <h1 className="text-2xl font-semibold mb-4">Top — Most Liked</h1>
        {!items.length ? <div className="opacity-70">No posts yet.</div> :
          items.map(p => <PostCard key={p.id} post={p} />)}
      </main>
    </>
  );
}
>>>>>>> 724b0ef (Initial commit from local working folder)
