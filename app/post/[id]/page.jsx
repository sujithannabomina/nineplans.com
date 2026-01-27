// app/post/[id]/page.jsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Shell from "@/components/Shell";
import useAuth from "@/hooks/useAuth";
import ReportModal from "@/components/ReportModal";
import {
  addComment,
  incrementPostView,
  listenComments,
  listenIsSaved,
  listenMyVote,
  listenPost,
  sharePost,
  toggleSave,
  votePost,
} from "@/lib/firestore";

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

  useEffect(() => {
    const unsub = listenPost(postId, setPost);
    const unsubC = listenComments(postId, setComments);
    return () => {
      unsub?.();
      unsubC?.();
    };
  }, [postId]);

  useEffect(() => {
    incrementPostView(postId).catch(() => {});
  }, [postId]);

  useEffect(() => {
    if (!user?.uid) return;
    const u1 = listenMyVote(user.uid, postId, setMyVote);
    const u2 = listenIsSaved(user.uid, postId, setSaved);
    return () => {
      u1?.();
      u2?.();
    };
  }, [user?.uid, postId]);

  const authorLabel = useMemo(() => {
    if (!post) return "";
    return post.isAnonymous ? "Anonymous" : (post.authorAlias || "User");
  }, [post]);

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
    } catch {}
    await sharePost(user?.uid || null, postId);
  }

  async function submitComment() {
    if (!user) return login();
    setBusy(true);
    try {
      await addComment({
        uid: user.uid,
        postId,
        text: commentText,
        alias: userDoc?.alias || userDoc?.name || "User",
      });
      setCommentText("");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Shell>
      {!post ? (
        <div className="rounded-2xl border bg-white p-6 shadow-sm">Loading…</div>
      ) : (
        <div className="space-y-4">
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-xl font-semibold">{post.title}</div>
                <div className="mt-1 text-sm text-gray-600">
                  {post.categoryName || "General Posts"} •{" "}
                  <span className="font-medium">{authorLabel}</span>
                </div>
              </div>

              <button
                onClick={() => setReportOpen(true)}
                className="rounded-xl border px-3 py-2 text-sm hover:bg-gray-50"
              >
                Report
              </button>
            </div>

            <div className="mt-4 whitespace-pre-wrap text-sm text-gray-800">
              {post.body}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={() => doVote(myVote === 1 ? 0 : 1)}
                className={
                  "rounded-xl border px-3 py-2 text-sm " +
                  (myVote === 1 ? "bg-black text-white" : "hover:bg-gray-50")
                }
              >
                👍 Like ({post.upvotes || 0})
              </button>

              <button
                onClick={() => doVote(myVote === -1 ? 0 : -1)}
                className={
                  "rounded-xl border px-3 py-2 text-sm " +
                  (myVote === -1 ? "bg-black text-white" : "hover:bg-gray-50")
                }
              >
                👎 Dislike ({post.downvotes || 0})
              </button>

              <button
                onClick={doSave}
                className={
                  "rounded-xl border px-3 py-2 text-sm " +
                  (saved ? "bg-black text-white" : "hover:bg-gray-50")
                }
              >
                🔖 Save
              </button>

              <button
                onClick={doShare}
                className="rounded-xl border px-3 py-2 text-sm hover:bg-gray-50"
              >
                🔁 Share ({post.shares || 0})
              </button>

              <div className="ml-auto text-xs text-gray-500 flex items-center">
                👀 {post.views || 0} • 💬 {post.commentsCount || 0}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="text-base font-semibold">Comments</div>

            <div className="mt-3 space-y-3">
              {comments?.length ? (
                comments.map((c) => (
                  <div key={c.id} className="rounded-xl border bg-gray-50 px-3 py-2">
                    <div className="text-xs text-gray-600 font-medium">
                      {c.alias || "User"}
                    </div>
                    <div className="text-sm text-gray-800 whitespace-pre-wrap">
                      {c.text}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-sm text-gray-600">No comments yet.</div>
              )}
            </div>

            <div className="mt-4 space-y-2">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                rows={3}
                className="w-full rounded-xl border px-3 py-2 text-sm"
                placeholder="Write a comment…"
              />
              <button
                onClick={submitComment}
                disabled={busy}
                className="w-full rounded-xl bg-black px-4 py-2 text-sm text-white hover:bg-gray-900 disabled:opacity-60"
              >
                {busy ? "Posting…" : "Add Comment"}
              </button>
            </div>
          </div>

          <ReportModal open={reportOpen} onClose={() => setReportOpen(false)} post={post} />
        </div>
      )}
    </Shell>
  );
}
