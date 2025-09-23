// app/submit/submit-client.jsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { db } from "@/lib/db";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

/** tiny local slugifier (keeps this file self-contained) */
function slugify(input) {
  return (input || "")
    .toLowerCase()
    .replace(/['"’`]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
    .slice(0, 80);
}

export default function SubmitClient({ categories = [] }) {
  const router = useRouter();
  const { data: session, status } = useSession();

  // ---- form state ----
  const [postAs, setPostAs] = useState("Alias"); // "Alias" | "Real name"
  const [alias, setAlias] = useState("");
  const [category, setCategory] = useState(
    categories[0] || "Confessions"
  );
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState("");

  // pull alias from localStorage (Profile → Settings stores it there)
  useEffect(() => {
    try {
      const saved = localStorage.getItem("np_alias") || "";
      setAlias(saved);
    } catch {}
  }, []);

  // If somehow we render client-side without a session (shouldn’t happen
  // because the server page redirects), keep UX graceful:
  useEffect(() => {
    if (status === "unauthenticated") {
      signIn(undefined, { callbackUrl: "/submit" });
    }
  }, [status]);

  // ---- derived state / validation ----
  const titleMax = 140;
  const titleLeft = titleMax - title.length;

  const canSubmit = useMemo(() => {
    if (!session?.user) return false;
    if (!category || !title.trim() || !body.trim()) return false;
    if (postAs === "Alias" && !alias.trim()) return false;
    return true;
  }, [session?.user, category, title, body, postAs, alias]);

  // ---- submit handler ----
  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");

    if (!session?.user) {
      // hard guard — should be handled by server redirect already
      return signIn(undefined, { callbackUrl: "/submit" });
    }

    if (!canSubmit) {
      setErr("Please complete all required fields.");
      return;
    }

    try {
      setSubmitting(true);

      const displayName =
        postAs === "Alias" && alias.trim()
          ? alias.trim()
          : session.user.name || "Anonymous";

      const newDoc = await addDoc(collection(db, "posts"), {
        title: title.trim(),
        slug: slugify(title),
        body: body.trim(),
        category,
        authorId: session.user.email || session.user.id || null,
        authorName: displayName,
        asAlias: postAs === "Alias",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        // counters
        likeCount: 0,
        commentCount: 0,
        viewCount: 0,
        // moderation
        isRemoved: false,
      });

      router.push(`/post/${newDoc.id}`);
    } catch (e) {
      console.error(e);
      setErr("Something went wrong while posting. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl space-y-5"
      autoComplete="off"
    >
      {/* Post as + Category */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm text-zinc-300">Post as</label>
          <select
            className="w-full rounded-md border border-white/10 bg-zinc-900 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-white/20"
            value={postAs}
            onChange={(e) => setPostAs(e.target.value)}
          >
            <option>Alias</option>
            <option>Real name</option>
          </select>
          {postAs === "Alias" && (
            <p className="mt-2 text-xs text-zinc-400">
              Alias:{" "}
              <span className="text-zinc-200">
                {alias ? alias : "not set"}
              </span>{" "}
              •{" "}
              <Link
                href="/profile/settings"
                className="underline decoration-white/30 underline-offset-2 hover:decoration-white"
              >
                Set in Profile → Settings
              </Link>
            </p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm text-zinc-300">Category</label>
          <select
            className="w-full rounded-md border border-white/10 bg-zinc-900 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-white/20"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {(categories.length ? categories : ["Confessions"]).map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Title */}
      <div>
        <label className="mb-1 block text-sm text-zinc-300">
          Title
          <span className="ml-2 text-xs text-zinc-500">
            (max {titleMax} chars)
          </span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) =>
            e.target.value.length <= titleMax && setTitle(e.target.value)
          }
          placeholder="Keep it concise (max 140 chars)"
          className="w-full rounded-md border border-white/10 bg-zinc-900 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-white/20"
        />
        <div className="mt-1 text-right text-[11px] text-zinc-500">
          {titleLeft} left
        </div>
      </div>

      {/* Body */}
      <div>
        <label className="mb-1 block text-sm text-zinc-300">Your post</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={8}
          placeholder="Write your post. Links allowed. No images/videos in comments."
          className="w-full resize-y rounded-md border border-white/10 bg-zinc-900 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-white/20"
          onKeyDown={(e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "Enter" && canSubmit) {
              handleSubmit(e);
            }
          }}
        />
        <p className="mt-1 text-xs text-zinc-500">
          Tip: Press <kbd className="rounded bg-white/10 px-1">Ctrl</kbd>+
          <kbd className="rounded bg-white/10 px-1">Enter</kbd> to post.
        </p>
      </div>

      {/* Images (placeholder) */}
      <div className="text-xs text-zinc-500">
        Images (up to 4): Coming soon
      </div>

      {err && (
        <div className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
          {err}
        </div>
      )}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={!canSubmit || submitting}
          className="rounded-md bg-white/90 px-4 py-2 text-sm font-semibold text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Posting…" : "Post"}
        </button>

        {!session?.user && (
          <button
            type="button"
            onClick={() => signIn(undefined, { callbackUrl: "/submit" })}
            className="rounded-md border border-white/20 px-4 py-2 text-sm text-zinc-200 hover:bg-white/10"
          >
            Login to submit
          </button>
        )}
      </div>
    </form>
  );
}
