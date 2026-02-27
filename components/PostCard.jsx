"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowBigUp, ArrowBigDown, MessageCircle, Bookmark, Share2, Eye } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import { votePost, toggleSave, listenMyVote, listenIsSaved, sharePost } from "@/lib/firestore";
import { timeAgo } from "@/lib/utils";
import { useEffect } from "react";

export default function PostCard({ post }) {
  const { user, login } = useAuth();
  const [myVote, setMyVote] = useState(0);
  const [saved,  setSaved]  = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!user?.uid || !post?.id) return;
    const u1 = listenMyVote(user.uid, post.id, setMyVote);
    const u2 = listenIsSaved(user.uid, post.id, setSaved);
    return () => { u1?.(); u2?.(); };
  }, [user?.uid, post?.id]);

  async function doVote(next) {
    if (!user) return login();
    await votePost(user.uid, post.id, next);
  }

  async function doSave() {
    if (!user) return login();
    await toggleSave(user.uid, post.id);
  }

  async function doShare() {
    const url = `${window.location.origin}/post/${post.id}`;
    try { await navigator.clipboard.writeText(url); } catch {}
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    await sharePost(user?.uid || null, post.id);
  }

  if (!post) return null;

  const score     = (post.upvotes || 0) - (post.downvotes || 0);
  const timeLabel = post.createdAt ? timeAgo(post.createdAt?.toMillis?.() || post.createdAt) : "";

  // Author display — no profile link for anonymous or alias posts
  const isAnonymous = post.isAnonymous;
  const isAlias     = post.isAlias;
  const authorLabel = isAnonymous
    ? "Anonymous"
    : (post.authorAlias || "User");
  // Only real-name posts link to profile — alias and anonymous never do
  const showProfileLink = !isAnonymous && !isAlias && post.authorUid;

  return (
    <div className="card p-4 sm:p-5 hover:bg-white/[0.03] transition group">
      <div className="flex gap-3">

        {/* Vote column */}
        <div className="flex flex-col items-center gap-1 shrink-0 pt-0.5">
          <button
            onClick={() => doVote(myVote === 1 ? 0 : 1)}
            className={`p-1 rounded transition ${myVote === 1 ? "text-orange-400" : "text-white/30 hover:text-orange-400"}`}
          >
            <ArrowBigUp className="h-5 w-5" />
          </button>
          <span className={`text-xs font-semibold tabular-nums ${
            score > 0 ? "text-orange-400" : score < 0 ? "text-blue-400" : "text-white/40"
          }`}>
            {score}
          </span>
          <button
            onClick={() => doVote(myVote === -1 ? 0 : -1)}
            className={`p-1 rounded transition ${myVote === -1 ? "text-blue-400" : "text-white/30 hover:text-blue-400"}`}
          >
            <ArrowBigDown className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-white/30 mb-1.5">
            {post.categorySlug && (
              <>
                <Link href={`/c/${post.categorySlug}`}
                  className="text-white/50 font-medium hover:text-white transition">
                  {post.categoryName || post.categorySlug}
                </Link>
                <span>·</span>
              </>
            )}
            {/* Author — link only for real-name posts */}
            {showProfileLink ? (
              <Link href={`/profile/${post.authorUid}`} className="hover:text-white/60 transition">
                {authorLabel}
              </Link>
            ) : (
              <span className={isAnonymous ? "text-purple-400/60" : isAlias ? "text-blue-400/60" : ""}>
                {authorLabel}
              </span>
            )}
            {timeLabel && <><span>·</span><span>{timeLabel}</span></>}
          </div>

          {/* Title */}
          <Link href={`/post/${post.id}`}>
            <h2 className="text-sm sm:text-base font-semibold text-white leading-snug hover:text-white/80 transition line-clamp-2">
              {post.title}
            </h2>
          </Link>

          {/* Body preview */}
          {post.body && (
            <p className="mt-1.5 text-xs sm:text-sm text-white/50 line-clamp-2 leading-relaxed">
              {post.body}
            </p>
          )}

          {/* Images preview */}
          {post.images?.length > 0 && (
            <div className={`mt-2 grid gap-1.5 ${post.images.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
              {post.images.slice(0, 2).map((url, i) => (
                <Link key={i} href={`/post/${post.id}`}>
                  <img src={url} alt="" className="w-full rounded-lg object-cover max-h-40 hover:opacity-80 transition" />
                </Link>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="mt-3 flex flex-wrap items-center gap-1">
            <Link href={`/post/${post.id}`}
              className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs text-white/30 hover:bg-white/10 hover:text-white/60 transition">
              <MessageCircle className="h-3.5 w-3.5" />
              <span>{post.commentsCount || 0}</span>
            </Link>

            <button onClick={doSave}
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs transition ${
                saved ? "text-white bg-white/10" : "text-white/30 hover:bg-white/10 hover:text-white/60"
              }`}>
              <Bookmark className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{saved ? "Saved" : "Save"}</span>
            </button>

            <button onClick={doShare}
              className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs text-white/30 hover:bg-white/10 hover:text-white/60 transition">
              <Share2 className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{copied ? "Copied!" : "Share"}</span>
            </button>

            <span className="ml-auto inline-flex items-center gap-1 text-xs text-white/20">
              <Eye className="h-3 w-3" />
              {post.views || 0}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}