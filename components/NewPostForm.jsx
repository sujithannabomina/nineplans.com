// components/NewPostForm.jsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CATEGORIES, fromSlug, toSlug } from "@/components/CategoryLinks";
import { useAuth } from "@/hooks/useAuth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";

export default function NewPostForm() {
  const sp = useSearchParams();
  const preset = sp.get("category"); // this is a *name* from our CTA (we passed the name)
  const initial = useMemo(() => {
    if (!preset) return CATEGORIES[0];
    // handle both slug or name just in case
    const bySlug = fromSlug(preset);
    const guess = CATEGORIES.find(
      (c) =>
        c.toLowerCase() === preset.toLowerCase() ||
        c.toLowerCase() === bySlug.toLowerCase()
    );
    return guess || CATEGORIES[0];
  }, [preset]);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(initial);
  const [body, setBody] = useState("");
  const [identityMode, setIdentityMode] = useState("alias"); // "real" | "alias"
  const { user, profile } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setCategory(initial);
  }, [initial]);

  async function onSubmit(e) {
    e.preventDefault();
    if (!user) {
      alert("Please sign in to post.");
      return;
    }
    setSubmitting(true);
    try {
      await addDoc(collection(db, "posts"), {
        title,
        body,
        category,
        identityMode,
        authorId: user.uid,
        displayName: identityMode === "real" ? (profile?.displayName || user.displayName || "User") : (profile?.alias || "Anonymous"),
        alias: profile?.alias || "",
        createdAt: serverTimestamp(),
        likes: 0,
        comments: 0,
        saves: 0,
        views: 0,
      });
      window.location.href = "/"; // back home
    } catch (err) {
      console.error(err);
      alert("Failed to publish. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Write a post</h1>
        <Link
          href={category ? `/?category=${toSlug(category)}` : "/"}
          className="text-sm underline text-white/70"
        >
          View {category} posts
        </Link>
      </div>

      <input
        className="w-full rounded-lg border border-white/10 bg-black px-3 py-2 outline-none focus:border-white/30"
        placeholder="Title"
        maxLength={140}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <div className="flex flex-wrap gap-4">
        <label className="text-sm">
          <span className="mr-2">Post as</span>
          <select
            value={identityMode}
            onChange={(e) => setIdentityMode(e.target.value)}
            className="rounded-md border border-white/10 bg-black px-2 py-1"
          >
            <option value="real">Real name</option>
            <option value="alias">Alias</option>
          </select>
        </label>

        <label className="text-sm">
          <span className="mr-2">Category</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-md border border-white/10 bg-black px-2 py-1"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
      </div>

      <textarea
        className="min-h-[180px] w-full rounded-lg border border-white/10 bg-black px-3 py-2 outline-none focus:border-white/30"
        placeholder="Write your post. You can paste links; up to 4 images are supported elsewhere."
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
      />

      <button
        disabled={submitting}
        className="rounded-lg bg-white text-black px-4 py-2 font-medium hover:bg-white/90 disabled:opacity-60"
      >
        {submitting ? "Posting…" : "Post"}
      </button>
    </form>
  );
}
