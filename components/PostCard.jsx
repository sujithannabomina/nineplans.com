"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowBigUp, ArrowBigDown, MessageCircle, Bookmark, Flag, Share2 } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import { votePost, toggleSave, sharePost } from "@/lib/firestore";
import ReportModal from "@/components/ReportModal";
import { timeAgo } from "@/lib/utils";

export default function PostCard({ post }) {
  const { user, login } = useAuth();
  const [reportOpen, setReportOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const score = (post.upvotes || 0) - (post.downvotes || 0);

  const doVote = async (v) => {
    if (!user) return login();
    await votePost(user.uid, post.id, v);
  };

  const doSave = async (e) => {
    e.preventDefault();
    if (!user) return login();
    await toggleSave(user.uid, post.id);
  };

  const doShare = async (e) => {
    e.preventDefault();
    const url = `${window.location.origin}/post/${post.id}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
    await sharePost(user?.uid || null, post.id);
  };

  const authorLabel = post.isAnonymous ? "Anonymous" : (post.authorAlias || "User");
  const timeLabel = post.createdAt ? timeAgo(post.createdAt?.toMillis?.() || post.createdAt) : "";

  return (
    <div className="card-hover p-4 group">
      <div className="flex gap-3">
        {/* Vote column */}
        <div className="flex flex-col items-center gap-1 pt-0.5 shrink-0">
          <button
            onClick={(e) => { e.preventDefault(); doVote(1); }}
            className="rounded-lg p-1.5 text-white/40 hover:text-orange-400 hover:bg-orange-400/10 transition"
            aria-label="Upvote"
          >
            <ArrowBigUp className="h-5 w-5" />
          </button>
          <span className={`text-sm font-bold ${score > 0 ? "text-orange-400" : score < 0 ? "text-blue-400" : "text-white/60"}`}>
            {score}
          </span>
          <button
            onClick={(e) => { e.preventDefault(); doVote(-1); }}
            className="rounded-lg p-1.5 text-white/40 hover:text-blue-400 hover:bg-blue-400/10 transition"
            aria-label="Downvote"
          >
            <ArrowBigDown className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          {/* Meta */}
          <div className="flex items-center gap-2 text-xs text-white/40 flex-wrap mb-1.5">
            <Link href={`/c/${post.categorySlug}`} className="hover:text-white transition font-medium text-white/60">
              {post.categoryName || "General"}
            </Link>
            <span>•</span>
            <span>{authorLabel}</span>
            {timeLabel && <><span>•</span><span>{timeLabel}</span></>}
          </div>

          {/* Title */}
          <Link href={`/post/${post.id}`}>
            <h3 className="text-base font-bold text-white group-hover:text-white/90 transition leading-snug">
              {post.title}
            </h3>
          </Link>

          {/* Body preview */}
          {post.body && (
            <p className="mt-1.5 text-sm text-white/60 line-clamp-2 leading-relaxed">
              {post.body}
            </p>
          )}

          {/* Action bar */}
          <div className="mt-3 flex items-center gap-1 flex-wrap">
            <Link
              href={`/post/${post.id}`}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs text-white/50 hover:bg-white/10 hover:text-white transition"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              {post.commentsCount || 0} comments
            </Link>

            <button
              onClick={doShare}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs text-white/50 hover:bg-white/10 hover:text-white transition"
            >
              <Share2 className="h-3.5 w-3.5" />
              {copied ? "Copied!" : "Share"}
            </button>

            <button
              onClick={doSave}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs text-white/50 hover:bg-white/10 hover:text-white transition"
            >
              <Bookmark className="h-3.5 w-3.5" />
              Save
            </button>

            <button
              onClick={(e) => { e.preventDefault(); setReportOpen(true); }}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs text-white/30 hover:bg-red-500/10 hover:text-red-400 transition ml-auto"
            >
              <Flag className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      <ReportModal open={reportOpen} onClose={() => setReportOpen(false)} post={post} />
    </div>
  );
}
