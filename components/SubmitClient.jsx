// components/SubmitClient.jsx
"use client";

import { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import CategorySelect from "./CategorySelect";

export default function SubmitClient() {
  const { data: session } = useSession();
  const [category, setCategory] = useState("confessions");
  const [alias, setAlias] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  if (!session) {
    return (
      <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-6">
        <p className="mb-3 text-neutral-300">
          Sign in to post. You can still publish anonymously by choosing an alias.
        </p>
        <button
          onClick={() => signIn("google", { callbackUrl: "/submit" })}
          className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-500"
        >
          Sign in with Google
        </button>
      </div>
    );
  }

  async function onSubmit(e) {
    e.preventDefault();
    const res = await fetch("/api/post", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ category, alias, title, text }),
    });
    if (res.ok) {
      setTitle("");
      setText("");
      alert("Posted!");
    } else {
      alert("Failed to post.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-xl border border-neutral-800 bg-neutral-950 p-5">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm text-neutral-400">Post as</label>
          <select
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
            className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm text-neutral-100 outline-none focus:ring-1 focus:ring-neutral-600"
          >
            <option value="">Alias</option>
            <option value="anonymous">Anonymous</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm text-neutral-400">Category</label>
          <div className="max-h-64 overflow-y-auto">
            <CategorySelect value={category} onChange={setCategory} allOption={false} />
          </div>
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm text-neutral-400">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={140}
          placeholder="Keep it concise (max 140 chars)"
          className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm text-neutral-100 outline-none focus:ring-1 focus:ring-neutral-600"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm text-neutral-400">Your post</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={6}
          placeholder="Write your post. Links allowed. No images/videos in comments."
          className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm text-neutral-100 outline-none focus:ring-1 focus:ring-neutral-600"
        />
      </div>

      <button
        type="submit"
        className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-500"
      >
        Post
      </button>
    </form>
  );
}
