// components/SubmitClient.jsx
"use client";

import { useState, useMemo } from "react";
import CategorySelect from "./CategorySelect";

export default function SubmitClient({ session, profile }) {
  // session: { uid, name } provided by server/page
  // profile: { alias }
  const [category, setCategory] = useState("confessions");
  const [content, setContent] = useState("");
  const [mode, setMode] = useState(profile?.alias ? "alias" : "account");
  const [busy, setBusy] = useState(false);
  const canPost = content.trim().length > 0 && !busy;

  const labelAlias = useMemo(() => {
    return profile?.alias ? `Alias (${profile.alias})` : "Alias (set in Profile → Settings)";
  }, [profile?.alias]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!canPost) return;

    setBusy(true);
    try {
      const res = await fetch("/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": session?.uid || "",
        },
        body: JSON.stringify({
          uid: session?.uid,
          content,
          categorySlug: category,
          mode,
          alias: profile?.alias || "",
          accountName: session?.name || "",
        }),
      });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error || "Post failed");
      setContent("");
      alert("Posted!");
    } catch (err) {
      console.error(err);
      alert("Sorry, post failed. Try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Post as */}
      <div className="grid gap-2 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm text-neutral-300">Post as</label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="w-full rounded border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm"
          >
            <option value="alias">{labelAlias}</option>
            <option value="account">{`Account name (${session?.name || "User"})`}</option>
          </select>
          {mode === "alias" && !profile?.alias && (
            <p className="mt-1 text-xs text-amber-400">Tip: Set your alias in Profile → Settings.</p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm text-neutral-300">Category</label>
          <CategorySelect value={category} onChange={setCategory} />
        </div>
      </div>

      {/* Content */}
      <div>
        <label className="mb-1 block text-sm text-neutral-300">Your post</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          placeholder="Write your post. Links allowed. No images/videos in comments."
          className="w-full rounded border border-neutral-700 bg-neutral-900 p-3 text-sm"
        />
      </div>

      <button
        type="submit"
        disabled={!canPost}
        className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
      >
        {busy ? "Posting..." : "Post"}
      </button>
    </form>
  );
}
