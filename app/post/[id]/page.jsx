"use client";

import { useEffect, useMemo, useState } from "react";
import Shell from "@/components/Shell";
import CommentTree from "@/components/CommentTree";
import ReportModal from "@/components/ReportModal";
import useAuth from "@/hooks/useAuth";
import { timeAgo } from "@/lib/utils";
import {
  addComment, incrementPostView, listenComments,
  listenIsSaved, listenMyVote, listenPost,
  sharePost, toggleSave, votePost,
} from "@/lib/firestore";
import { ArrowBigUp, ArrowBigDown, Bookmark, Share2, Flag, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function PostPage({ params }) {
  const postId = params?.id;
  const { user, userDoc, login } = useAuth();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [myVote, setMyVote] = useState(0);
  const [saved, setSaved] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [reportOpen, setReportOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const unsub = listenPost(postId, setPost);
    const unsubC = listenComments(postId, setComments);
    return () => { unsub?.(); unsubC?.(); };
  }, [postId]);

  useEffect(() => { incrementPostView(postId).catch(() => {}); }, [postId]);

  useEffect(() => {
    if (!user?.uid) return;
    const u1 = listenMyVote(user.uid, postId, setMyVote);
    const u2 = listenIsSaved(user.uid, postId, setSaved);
    return () => { u1?.(); u2?.(); };
  }, [user?.uid, postId]);

  const authorLabel = useMemo(() => {
    if (!post) return "";
    return post.isAnonymous ? "Anonymous" : (post.authorAlias || "User");
  }, [post]);

  const score = (post?.upvotes || 0) - (post?.downvotes || 0);
  const timeLabel = post?.createdAt ? timeAgo(post.createdAt?.toMillis?.() || post.createdAt) : "";

  async function doVote(next) {
    if (!user) return login();
    await votePost(user.uid, postId, next);
  }

  async function doSave() {
    if (!user) return login();
    await toggleSave(user.uid, postId);
  }

  async function doShare() {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {}
    await sharePost(user?.uid || null, postId);
  }

  async function submitComment() {
    if (!user) return login();
    const text = commentText.trim();
    if (!text) return;
    setBusy(true);
    try {
      await addComment({
        uid: user.uid, postId, text,
        alias: userDoc?.alias || userDoc?.name || "User",
      });
      setCommentText("");
    } finally {
      setBusy(false);
    }
  }

  if (!post) {
    return (
      <Shell>
        <div className="card p-8 text-center">
          <div className="text-white/40 text-sm">Loading post…</div>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <div className="space-y-4">
        {/* Post card */}
        <div className="card p-5">
          {/* Category + meta */}
          <div className="flex items-center gap-2 text-xs text-white/40 mb-3">
            <Link href={`/c/${post.categorySlug}`} className="hover:text-white transition font-medium text-white/60">
              {post.categoryName || "General Posts"}
            </Link>
            <span>•</span>
            <span>{authorLabel}</span>
            {timeLabel && <><span>•</span><span>{timeLabel}</span></>}
            <span>•</span>
            <span>👀 {post.views || 0}</span>
          </div>

          {/* Title */}
          <h1 className="text-xl font-bold text-white leading-snug">{post.title}</h1>

          {/* Body */}
          <div className="mt-4 text-sm text-white/80 whitespace-pre-wrap leading-relaxed">
            {post.body}
          </div>

          {/* Actions */}
          <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center gap-2">
            {/* Vote */}
            <div className="flex items-center rounded-full border border-white/10 overflow-hidden">
              <button
                onClick={() => doVote(myVote === 1 ? 0 : 1)}
                className={`flex items-center gap-1.5 px-3 py-2 text-sm transition ${myVote === 1 ? "bg-orange-400/20 text-orange-400" : "text-white/60 hover:bg-white/10 hover:text-orange-400"}`}
              >
                <ArrowBigUp className="h-4 w-4" />
                <span>{post.upvotes || 0}</span>
              </button>
              <div className="w-px h-6 bg-white/10" />
              <button
                onClick={() => doVote(myVote === -1 ? 0 : -1)}
                className={`flex items-center gap-1.5 px-3 py-2 text-sm transition ${myVote === -1 ? "bg-blue-400/20 text-blue-400" : "text-white/60 hover:bg-white/10 hover:text-blue-400"}`}
              >
                <ArrowBigDown className="h-4 w-4" />
                <span>{post.downvotes || 0}</span>
              </button>
            </div>

            <button
              onClick={doSave}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm border transition ${saved ? "border-white/40 bg-white/10 text-white" : "border-white/10 text-white/60 hover:bg-white/10 hover:text-white"}`}
            >
              <Bookmark className="h-4 w-4" />
              {saved ? "Saved" : "Save"}
            </button>

            <button
              onClick={doShare}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-2 text-sm text-white/60 hover:bg-white/10 hover:text-white transition"
            >
              <Share2 className="h-4 w-4" />
              {copied ? "Link copied!" : `Share (${post.shares || 0})`}
            </button>

            <button
              onClick={() => setReportOpen(true)}
              className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-2 text-sm text-white/30 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30 transition"
            >
              <Flag className="h-4 w-4" />
              Report
            </button>
          </div>
        </div>

        {/* Comments section */}
        <div className="card p-5">
          <div className="flex items-center gap-2 mb-4">
            <MessageCircle className="h-5 w-5 text-white/60" />
            <div className="text-base font-semibold text-white">
              Comments ({post.commentsCount || 0})
            </div>
          </div>

          {/* Add comment */}
          <div className="mb-5 pb-5 border-b border-white/10">
            {user ? (
              <div className="space-y-2">
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  rows={3}
                  className="textarea"
                  placeholder="Share your thoughts…"
                />
                <div className="flex justify-end">
                  <button
                    onClick={submitComment}
                    disabled={busy || !commentText.trim()}
                    className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black hover:bg-neutral-200 transition disabled:opacity-40"
                  >
                    {busy ? "Posting…" : "Comment"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
                <p className="text-sm text-white/60 mb-3">Sign in to join the conversation</p>
                <button
                  onClick={login}
                  className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black hover:bg-neutral-200 transition"
                >
                  Continue with Google
                </button>
              </div>
            )}
          </div>

          {/* Comment tree */}
          <CommentTree comments={comments} postId={postId} />
        </div>
      </div>

      <ReportModal open={reportOpen} onClose={() => setReportOpen(false)} post={post} />
    </Shell>
  );
}
