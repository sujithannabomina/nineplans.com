'use client';

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Shell from "@/components/Shell";
import useAuth from "@/hooks/useAuth";
import { createPost, listenTopCategories } from "@/lib/firestore";

export default function SubmitPage() {
  const router = useRouter();
  const { user, login } = useAuth();

  const [tab, setTab] = useState("latest");
  const [q, setQ] = useState("");

  const [cats, setCats] = useState([]);
  const [categorySlug, setCategorySlug] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => listenTopCategories(setCats), []);
  useEffect(() => {
    if (!categorySlug && cats[0]?.slug) setCategorySlug(cats[0].slug);
  }, [cats, categorySlug]);

  const category = useMemo(() => cats.find((c) => c.slug === categorySlug) || null, [cats, categorySlug]);

  const submit = async () => {
    if (!user) return login();
    const t = title.trim();
    const b = body.trim();
    if (t.length < 5 || b.length < 10) return alert("Title (5+) and body (10+) required.");
    setBusy(true);
    try {
      const tagList = tags.split(",").map((s) => s.trim()).filter(Boolean).slice(0, 8);
      const id = await createPost({
        categorySlug,
        categoryName: category?.name || categorySlug,
        title: t,
        body: b,
        tags: tagList,
        authorUid: user.uid,
        authorAlias: user.primaryAlias,
        authorPhoto: user.photoURL,
      });
      router.push(`/post/${id}`);
    } catch (e) {
      alert(e?.message || "Failed to publish");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Shell q={q} setQ={setQ} tab={tab} setTab={setTab}>
      <div className="space-y-4">
        <div className="text-xl font-extrabold tracking-tight">Create a post</div>
        <div className="card p-5 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="text-xs font-semibold">Category</label>
              <select className="input" value={categorySlug} onChange={(e) => setCategorySlug(e.target.value)}>
                {cats.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold">Tags (comma separated)</label>
              <input className="input" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="confession, advice, review" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold">Title</label>
            <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Write a clear title…" />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold">Body</label>
            <textarea className="input min-h-[220px]" value={body} onChange={(e) => setBody(e.target.value)} placeholder="Tell your story… (alias-first)" />
            <div className="text-xs text-black/60">Posting as <span className="font-semibold text-black">{user ? user.primaryAlias : "Guest"}</span></div>
          </div>

          <div className="flex items-center justify-end gap-2">
            <button className="btn-outline" onClick={() => router.push("/")}>Cancel</button>
            <button className="btn" onClick={submit} disabled={busy}>{busy ? "Publishing…" : "Publish"}</button>
          </div>
        </div>
      </div>
    </Shell>
  );
}
