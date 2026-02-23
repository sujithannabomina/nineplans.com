"use client";

import { useEffect, useMemo, useState } from "react";
import Shell from "@/components/Shell";
import useAuth from "@/hooks/useAuth";
import { listenCategories, createPost } from "@/lib/firestore";
import { useRouter } from "next/navigation";

export default function SubmitPage() {
  const { user, userDoc, login } = useAuth();
  const router = useRouter();
  const [cats, setCats] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [categorySlug, setCategorySlug] = useState("posts");
  const [postAs, setPostAs] = useState("alias"); // "real" | "alias" | "anonymous"
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    const unsub = listenCategories(setCats);
    return () => unsub?.();
  }, []);

  const selectedCat = useMemo(() => cats.find((c) => c.slug === categorySlug) || null, [cats, categorySlug]);

  const titleLimit = 200;
  const titleLeft = titleLimit - title.length;

  async function submit() {
    if (!user) return login();
    setErr("");
    if (!title.trim()) return setErr("Please add a title to your post.");
    if (!body.trim()) return setErr("Please write something in your post.");

    setBusy(true);
    try {
      const isAnonymous = postAs === "anonymous";
      const alias = postAs === "alias"
        ? (userDoc?.alias || userDoc?.name || "User")
        : postAs === "real"
        ? (userDoc?.name || user.displayName || "User")
        : "Anonymous";

      const id = await createPost({
        uid: user.uid, title, body, categorySlug,
        categoryName: selectedCat?.name || "Posts",
        isAnonymous, alias,
      });
      router.push(`/post/${id}`);
    } catch (e) {
      setErr(e.message || "Failed to post. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Shell>
      <div className="card p-5">
        <div className="text-xl font-bold text-white mb-1">Create a Post</div>
        <p className="text-sm text-white/50 mb-5">Share anything. Anonymous posting is supported.</p>

        {!user ? (
          <div className="text-center py-8">
            <div className="text-3xl mb-3">🔐</div>
            <p className="text-white/60 text-sm mb-4">You need to be signed in to post.</p>
            <button
              onClick={login}
              className="rounded-full bg-white px-6 py-2.5 text-sm font-bold text-black hover:bg-neutral-200 transition"
            >
              Continue with Google
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Title */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">Post Title *</label>
                <span className={`text-xs ${titleLeft < 20 ? "text-red-400" : "text-white/30"}`}>{titleLeft} left</span>
              </div>
              <input
                className="input"
                value={title}
                onChange={(e) => setTitle(e.target.value.slice(0, titleLimit))}
                placeholder="Write a clear, specific title..."
              />
            </div>

            {/* Post as */}
            <div>
              <label className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2 block">Post As</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: "real", label: "Real Name", desc: userDoc?.name || user?.displayName || "You", icon: "👤" },
                  { value: "alias", label: "Alias", desc: userDoc?.alias || "Your alias", icon: "🎭" },
                  { value: "anonymous", label: "Anonymous", desc: "Fully hidden", icon: "🕵️" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setPostAs(opt.value)}
                    className={`rounded-xl border p-3 text-left transition ${
                      postAs === opt.value
                        ? "border-white/60 bg-white/10"
                        : "border-white/10 hover:border-white/30 hover:bg-white/5"
                    }`}
                  >
                    <div className="text-lg mb-1">{opt.icon}</div>
                    <div className="text-xs font-semibold text-white">{opt.label}</div>
                    <div className="text-xs text-white/40 truncate">{opt.desc}</div>
                  </button>
                ))}
              </div>
              {postAs === "anonymous" && (
                <p className="mt-2 text-xs text-white/40 bg-white/5 rounded-lg px-3 py-2">
                  🕵️ Your post will show "Anonymous". Your identity is protected, but community rules still apply.
                </p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-1 block">Category *</label>
              <select
                className="select"
                value={categorySlug}
                onChange={(e) => setCategorySlug(e.target.value)}
              >
                {cats.map((c) => <option key={c.id} value={c.slug}>{c.name}</option>)}
              </select>
            </div>

            {/* Content */}
            <div>
              <label className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-1 block">Content *</label>
              <textarea
                className="textarea"
                rows={10}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Write your post here. You can paste links — they'll be clickable. No character limit."
              />
            </div>

            {/* Error */}
            {err && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {err}
              </div>
            )}

            {/* Submit */}
            <button
              onClick={submit}
              disabled={busy}
              className="w-full rounded-full bg-white py-3 text-sm font-bold text-black hover:bg-neutral-200 transition disabled:opacity-50"
            >
              {busy ? "Posting…" : "🚀 Post"}
            </button>

            <p className="text-xs text-white/30 text-center">
              By posting, you agree to our{" "}
              <a href="/rules" className="underline hover:text-white">Rules</a> and{" "}
              <a href="/terms" className="underline hover:text-white">Terms</a>.
            </p>
          </div>
        )}
      </div>
    </Shell>
  );
}
