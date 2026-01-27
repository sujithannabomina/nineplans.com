// app/submit/page.jsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Shell from "@/components/Shell";
import useAuth from "@/hooks/useAuth";
import { listenCategories, createPost } from "@/lib/firestore";

export default function SubmitPage() {
  const { user, userDoc, login } = useAuth();
  const [cats, setCats] = useState([]);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [categorySlug, setCategorySlug] = useState("general-posts");
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const unsub = listenCategories(setCats);
    return () => unsub?.();
  }, []);

  const selectedCat = useMemo(() => {
    return cats.find((c) => c.slug === categorySlug) || null;
  }, [cats, categorySlug]);

  async function submit() {
    if (!user) return login();
    setBusy(true);
    setMsg("");
    try {
      const id = await createPost({
        uid: user.uid,
        title,
        body,
        categorySlug,
        categoryName: selectedCat?.name || "General Posts",
        isAnonymous,
        alias: userDoc?.alias || userDoc?.name || "User",
      });
      setTitle("");
      setBody("");
      setMsg(`Posted successfully! (Post ID: ${id})`);
    } catch (e) {
      setMsg(e.message || "Failed to post");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Shell>
      <div className="rounded-2xl border bg-white p-5 shadow-sm">
        <div className="text-lg font-semibold">Create a post</div>
        <p className="mt-1 text-sm text-gray-600">
          Post safely. By default, posts are anonymous (alias-first).
        </p>

        <div className="mt-4 space-y-3">
          <div>
            <label className="text-sm font-medium">Title</label>
            <input
              className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Short title"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Category</label>
            <select
              className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
              value={categorySlug}
              onChange={(e) => setCategorySlug(e.target.value)}
            >
              {cats.map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Post</label>
            <textarea
              className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
              rows={8}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write your post here..."
            />
          </div>

          <div className="flex items-center justify-between rounded-xl border bg-gray-50 px-3 py-2">
            <div>
              <div className="text-sm font-medium">Anonymous mode</div>
              <div className="text-xs text-gray-600">
                If ON, your post shows “Anonymous” publicly.
              </div>
            </div>
            <button
              onClick={() => setIsAnonymous((v) => !v)}
              className={
                "rounded-full px-3 py-1 text-sm " +
                (isAnonymous ? "bg-black text-white" : "bg-white border")
              }
            >
              {isAnonymous ? "ON" : "OFF"}
            </button>
          </div>

          {!!msg && (
            <div className="rounded-xl border bg-white px-3 py-2 text-sm">
              {msg}
            </div>
          )}

          <button
            onClick={submit}
            disabled={busy}
            className="w-full rounded-xl bg-black px-4 py-2 text-sm text-white hover:bg-gray-900 disabled:opacity-60"
          >
            {busy ? "Posting…" : "Post"}
          </button>
        </div>
      </div>
    </Shell>
  );
}
