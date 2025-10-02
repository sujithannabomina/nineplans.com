// components/SubmitClient.jsx
"use client";

import { useEffect, useState } from "react";
import CategorySelect from "./CategorySelect";

export default function SubmitClient({ userAlias }) {
  const [mode, setMode] = useState("account"); // 'account' | 'alias'
  const [category, setCategory] = useState("");
  const [text, setText] = useState("");
  const [posting, setPosting] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (!userAlias && mode === "alias") {
      setNotice("You don't have an alias yet — create one in Settings.");
    } else {
      setNotice("");
    }
  }, [mode, userAlias]);

  async function onSubmit(e) {
    e.preventDefault();
    if (!text.trim() || !category) return;
    setPosting(true);
    try {
      const res = await fetch("/api/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: text.trim(),
          category,
          postAs: mode, // 'account' or 'alias'
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setText("");
      setNotice("Posted!");
    } catch {
      setNotice("Could not post. Please try again.");
    } finally {
      setPosting(false);
      setTimeout(() => setNotice(""), 2000);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Post as */}
        <div>
          <label className="block text-sm text-zinc-400 mb-2">Post as</label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="w-full rounded-md bg-zinc-950 border border-zinc-800 px-3 py-2"
          >
            <option value="account">Account name (User)</option>
            <option value="alias">Alias</option>
          </select>
          {mode === "alias" && !userAlias && (
            <div className="mt-2 text-xs text-amber-300">
              You don&apos;t have an alias.{" "}
              <a className="underline" href="/profile/settings">
                Create one in Settings
              </a>
              .
            </div>
          )}
          {mode === "alias" && userAlias && (
            <div className="mt-2 text-xs text-zinc-400">
              Using alias: <span className="text-zinc-200">{userAlias}</span>
            </div>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm text-zinc-400 mb-2">Category</label>
          <CategorySelect value={category} onChange={setCategory} />
        </div>
      </div>

      {/* Body */}
      <div className="mt-4">
        <label className="block text-sm text-zinc-400 mb-2">Your post</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={8}
          className="w-full rounded-md bg-zinc-950 border border-zinc-800 px-3 py-2"
          placeholder="Write your post. Links allowed. No images/videos in comments."
        />
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button
          disabled={posting || !text.trim() || !category}
          className="rounded-md bg-sky-600 px-4 py-2 hover:bg-sky-500 disabled:opacity-50"
        >
          {posting ? "Posting…" : "Post"}
        </button>
        {notice && <span className="text-sm text-zinc-300">{notice}</span>}
      </div>
    </form>
  );
}
