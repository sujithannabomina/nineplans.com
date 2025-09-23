// components/SubmitClient.jsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { CATEGORIES } from "@/lib/site";

export default function SubmitClient() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [postAs, setPostAs] = useState("Alias"); // "Real name" or "Alias"
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  // Precompute options once
  const categoryOptions = useMemo(() => CATEGORIES, []);

  // If user isn’t logged in, show the exact same page but with the form locked.
  const isAuthed = status === "authenticated";

  async function onSubmit(e) {
    e.preventDefault();
    if (!isAuthed) {
      // Send the user to login and bring them back to /submit after
      router.push("/login?returnTo=/submit");
      return;
    }

    // Basic guard
    if (!title.trim() || !body.trim() || !category) return;

    try {
      // If you already have a post API or Firestore write in another component,
      // call that here. For now we post to /api/post if it exists.
      const res = await fetch("/api/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          body: body.trim(),
          category,
          postAs, // "Alias" or "Real name"
        }),
      });

      if (res.ok) {
        // Go home (or to the new post) after successful submit
        router.push("/");
        router.refresh();
      } else if (res.status === 401) {
        router.push("/login?returnTo=/submit");
      } else {
        console.error(await res.text());
        alert("Something went wrong while posting. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error. Please try again.");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="max-w-3xl space-y-6 rounded-xl border border-zinc-800 bg-zinc-950/50 p-5"
    >
      {/* Post as */}
      <div className="grid gap-2">
        <label className="text-sm font-medium text-zinc-300">Post as</label>
        <select
          value={postAs}
          onChange={(e) => setPostAs(e.target.value)}
          className="w-full rounded-md border border-zinc-800 bg-zinc-900 p-2 text-sm outline-none focus:ring-2 focus:ring-zinc-600"
          disabled={!isAuthed}
        >
          <option>Real name</option>
          <option>Alias</option>
        </select>
        {!isAuthed && (
          <p className="text-xs text-zinc-400">
            You’re not logged in. Posting requires login.
          </p>
        )}
      </div>

      {/* Category */}
      <div className="grid gap-2">
        <label className="text-sm font-medium text-zinc-300">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-md border border-zinc-800 bg-zinc-900 p-2 text-sm outline-none focus:ring-2 focus:ring-zinc-600"
          disabled={!isAuthed}
        >
          {categoryOptions.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Title */}
      <div className="grid gap-2">
        <label className="text-sm font-medium text-zinc-300">
          Title <span className="text-zinc-500">(max 140 chars)</span>
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value.slice(0, 140))}
          placeholder="Keep it concise (max 140 chars)"
          className="w-full rounded-md border border-zinc-800 bg-zinc-900 p-2 text-sm outline-none focus:ring-2 focus:ring-zinc-600"
          disabled={!isAuthed}
        />
      </div>

      {/* Body */}
      <div className="grid gap-2">
        <label className="text-sm font-medium text-zinc-300">Your post</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write your post. Links allowed. No images/videos in comments."
          rows={8}
          className="w-full resize-y rounded-md border border-zinc-800 bg-zinc-900 p-3 text-sm outline-none focus:ring-2 focus:ring-zinc-600"
          disabled={!isAuthed}
        />
      </div>

      {/* Images note */}
      <p className="text-xs text-zinc-500">Images (up to 4): Coming soon</p>

      {/* Post button or Login */}
      {isAuthed ? (
        <button
          type="submit"
          className="rounded-md bg-white px-4 py-2 text-sm font-medium text-black hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!title.trim() || !body.trim()}
        >
          Post
        </button>
      ) : (
        <button
          type="button"
          onClick={() => router.push("/login?returnTo=/submit")}
          className="rounded-md bg-white px-4 py-2 text-sm font-medium text-black hover:bg-zinc-200"
        >
          Login to post
        </button>
      )}
    </form>
  );
}
