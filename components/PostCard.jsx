<<<<<<< HEAD
// components/PostCard.jsx
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { toggleLike, toggleSave } from "@/lib/db";

function timeAgo(ts) {
  const num = typeof ts === "number" ? ts : ts?.toMillis?.() ?? Date.now();
  const s = Math.floor((Date.now() - num) / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60); if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60); if (h < 24) return `${h}h`;
  const d = Math.floor(h / 24); return `${d}d`;
}

export default function PostCard({ post, currentUser }) {
  // post: { id, title, body, images[], category, createdAt, authorId,
  //         displayName, identityMode: "real" | "alias",
  //         counts: { likes, comments, saves } }
  const [likes, setLikes] = useState(post?.counts?.likes || 0);
  const [saves, setSaves] = useState(post?.counts?.saves || 0);
  const [liking, setLiking] = useState(false);
  const [saving, setSaving] = useState(false);

  const canLinkProfile = post.identityMode !== "alias" && post.authorId;
  const authorEl = useMemo(() => {
    if (!post.displayName) return <span>Unknown</span>;
    if (!canLinkProfile) return <span>{post.displayName}</span>;
    return <Link href={`/profile?u=${post.authorId}`} className="underline">{post.displayName}</Link>;
  }, [post.displayName, canLinkProfile, post.authorId]);

  const url = `/post/${post.id}`;

  const onLike = async () => {
    try { setLiking(true); setLikes(v => v + 1); await toggleLike(post.id); }
    catch { setLikes(v => Math.max(0, v - 1)); }
    finally { setLiking(false); }
  };

  const onSave = async () => {
    try { setSaving(true); setSaves(v => v + 1); await toggleSave(post.id); }
    catch { setSaves(v => Math.max(0, v - 1)); }
    finally { setSaving(false); }
  };

  const onShare = async () => {
    const absolute = `${window.location.origin}${url}`;
    try { await navigator.clipboard.writeText(absolute); alert("Link copied!"); } catch {}
  };

  return (
    <article className="border border-white/15 rounded-xl p-4 mb-4 bg-black">
      <header className="flex items-center justify-between text-sm mb-2">
        <div className="opacity-90">
          {authorEl} • <span className="opacity-70">{timeAgo(post.createdAt)}</span>
          {post.category ? <span className="ml-2 px-2 py-0.5 text-xs border border-white/20 rounded">{post.category}</span> : null}
          {post.identityMode === "alias" ? <span className="ml-2 text-xs opacity-60">(alias)</span> : null}
        </div>
      </header>

      <Link href={url} className="block group">
        {post.title ? <h2 className="text-lg font-semibold mb-2 group-hover:underline">{post.title}</h2> : null}
        {post.body ? <p className="whitespace-pre-line opacity-95">{post.body.slice(0, 280)}{post.body.length > 280 ? "…" : ""}</p> : null}
        {!!post.images?.length && (
          <div className="grid grid-cols-2 gap-2 mt-3">
            {post.images.slice(0, 4).map((src, i) => (
              <img key={i} src={src} alt="" className="w-full rounded-lg border border-white/10" />
            ))}
          </div>
        )}
      </Link>

      <footer className="flex items-center gap-4 mt-4 text-sm">
        <button onClick={onLike} disabled={liking} className="px-3 py-1 rounded bg-white text-black">
          ▲ Like {likes ? `(${likes})` : ""}
        </button>
        <Link href={url} className="px-3 py-1 rounded border border-white/20">💬 Comment {post?.counts?.comments ? `(${post.counts.comments})` : ""}</Link>
        <button onClick={onSave} disabled={saving} className="px-3 py-1 rounded border border-white/20">🔖 Save {saves ? `(${saves})` : ""}</button>
        <button onClick={onShare} className="ml-auto underline">Share</button>
      </footer>
    </article>
  );
}
=======
// components/PostCard.jsx
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { toggleLike, toggleSave } from "@/lib/db";

function timeAgo(ts) {
  const num = typeof ts === "number" ? ts : ts?.toMillis?.() ?? Date.now();
  const s = Math.floor((Date.now() - num) / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60); if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60); if (h < 24) return `${h}h`;
  const d = Math.floor(h / 24); return `${d}d`;
}

export default function PostCard({ post, currentUser }) {
  // post: { id, title, body, images[], category, createdAt, authorId,
  //         displayName, identityMode: "real" | "alias",
  //         counts: { likes, comments, saves } }
  const [likes, setLikes] = useState(post?.counts?.likes || 0);
  const [saves, setSaves] = useState(post?.counts?.saves || 0);
  const [liking, setLiking] = useState(false);
  const [saving, setSaving] = useState(false);

  const canLinkProfile = post.identityMode !== "alias" && post.authorId;
  const authorEl = useMemo(() => {
    if (!post.displayName) return <span>Unknown</span>;
    if (!canLinkProfile) return <span>{post.displayName}</span>;
    return <Link href={`/profile?u=${post.authorId}`} className="underline">{post.displayName}</Link>;
  }, [post.displayName, canLinkProfile, post.authorId]);

  const url = `/post/${post.id}`;

  const onLike = async () => {
    try { setLiking(true); setLikes(v => v + 1); await toggleLike(post.id); }
    catch { setLikes(v => Math.max(0, v - 1)); }
    finally { setLiking(false); }
  };

  const onSave = async () => {
    try { setSaving(true); setSaves(v => v + 1); await toggleSave(post.id); }
    catch { setSaves(v => Math.max(0, v - 1)); }
    finally { setSaving(false); }
  };

  const onShare = async () => {
    const absolute = `${window.location.origin}${url}`;
    try { await navigator.clipboard.writeText(absolute); alert("Link copied!"); } catch {}
  };

  return (
    <article className="border border-white/15 rounded-xl p-4 mb-4 bg-black">
      <header className="flex items-center justify-between text-sm mb-2">
        <div className="opacity-90">
          {authorEl} • <span className="opacity-70">{timeAgo(post.createdAt)}</span>
          {post.category ? <span className="ml-2 px-2 py-0.5 text-xs border border-white/20 rounded">{post.category}</span> : null}
          {post.identityMode === "alias" ? <span className="ml-2 text-xs opacity-60">(alias)</span> : null}
        </div>
      </header>

      <Link href={url} className="block group">
        {post.title ? <h2 className="text-lg font-semibold mb-2 group-hover:underline">{post.title}</h2> : null}
        {post.body ? <p className="whitespace-pre-line opacity-95">{post.body.slice(0, 280)}{post.body.length > 280 ? "…" : ""}</p> : null}
        {!!post.images?.length && (
          <div className="grid grid-cols-2 gap-2 mt-3">
            {post.images.slice(0, 4).map((src, i) => (
              <img key={i} src={src} alt="" className="w-full rounded-lg border border-white/10" />
            ))}
          </div>
        )}
      </Link>

      <footer className="flex items-center gap-4 mt-4 text-sm">
        <button onClick={onLike} disabled={liking} className="px-3 py-1 rounded bg-white text-black">
          ▲ Like {likes ? `(${likes})` : ""}
        </button>
        <Link href={url} className="px-3 py-1 rounded border border-white/20">💬 Comment {post?.counts?.comments ? `(${post.counts.comments})` : ""}</Link>
        <button onClick={onSave} disabled={saving} className="px-3 py-1 rounded border border-white/20">🔖 Save {saves ? `(${saves})` : ""}</button>
        <button onClick={onShare} className="ml-auto underline">Share</button>
      </footer>
    </article>
  );
}
>>>>>>> 724b0ef (Initial commit from local working folder)
