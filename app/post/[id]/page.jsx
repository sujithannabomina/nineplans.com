'use client';

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Shell from "@/components/Shell";
import useAuth from "@/hooks/useAuth";
import { createComment, listenComments, listenPost, votePost } from "@/lib/firestore";
import CommentTree from "@/components/CommentTree";
import { ArrowBigUp, ArrowBigDown, MessageCircle } from "lucide-react";
import AdSlot from "@/components/AdSlot";
import ReportModal from "@/components/ReportModal";
import Link from "next/link";

export default function PostDetailPage() {
  const { id } = useParams();
  const { user, login } = useAuth();

  const [tab, setTab] = useState("latest");
  const [q, setQ] = useState("");

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [newComment, setNewComment] = useState("");
  const [busy, setBusy] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);

  useEffect(() => {
    const unsub1 = listenPost(id, (p) => { setPost(p); setLoading(false); });
    const unsub2 = listenComments(id, setComments);
    return () => { unsub1(); unsub2(); };
  }, [id]);

  const doVote = async (v) => {
    if (!user) return login();
    await votePost(id, user.uid, v);
  };

  const submitComment = async () => {
    if (!user) return login();
    const body = newComment.trim();
    if (body.length < 2) return;
    setBusy(true);
    try {
      await createComment({ postId: id, authorUid: user.uid, authorAlias: user.primaryAlias, body });
      setNewComment("");
    } finally {
      setBusy(false);
    }
  };

  const adSlot = process.env.NEXT_PUBLIC_ADSENSE_SLOT_RIGHT_TOP || "";
  const adsAllowed = post?.status === "active";

  return (
    <Shell q={q} setQ={setQ} tab={tab} setTab={setTab}>
      <div className="space-y-4">
        {loading ? (
          <div className="card p-5 h-40 skeleton" />
        ) : !post ? (
          <div className="card p-6"><div className="text-sm font-semibold">Post not found</div></div>
        ) : (
          <>
            <div className="card p-5">
              <div className="flex items-start gap-3">
                <div className="flex flex-col items-center gap-1">
                  <button className="btn-outline px-2 py-2" onClick={() => doVote(1)} aria-label="Upvote">
                    <ArrowBigUp className="h-4 w-4" />
                  </button>
                  <div className="text-sm font-bold">{post.score}</div>
                  <button className="btn-outline px-2 py-2" onClick={() => doVote(-1)} aria-label="Downvote">
                    <ArrowBigDown className="h-4 w-4" />
                  </button>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="text-xs text-black/60">
                    <Link href={`/c/${post.categorySlug}`} className="badge no-underline">c/{post.categorySlug}</Link>
                    <span className="ml-2">by <span className="font-semibold text-black">{post.authorAlias}</span></span>
                    {post.status !== "active" ? <span className="ml-2 badge border-black/30">Under review</span> : null}
                  </div>

                  <h1 className="text-2xl font-extrabold tracking-tight mt-2">{post.title}</h1>
                  <div className="text-sm text-black/80 mt-3 whitespace-pre-wrap">{post.body}</div>

                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <button className="btn-outline" onClick={() => setReportOpen(true)}>Report</button>
                    <div className="flex-1" />
                    <div className="btn-outline"><MessageCircle className="h-4 w-4" /> {post.commentCount}</div>
                  </div>
                </div>
              </div>
            </div>

            {adsAllowed ? <AdSlot slot={adSlot} className="card p-4" /> : null}

            <div className="card p-5">
              <div className="text-sm font-extrabold">Comments</div>

              <div className="mt-3 card p-3">
                <textarea className="input min-h-[110px]" value={newComment} onChange={(e) => setNewComment(e.target.value)}
                  placeholder={user ? "Write a comment…" : "Login to comment…"} />
                <div className="mt-2 flex items-center justify-between gap-2">
                  <div className="text-xs text-black/60">
                    Commenting as <span className="font-semibold text-black">{user ? user.primaryAlias : "Guest"}</span>
                  </div>
                  <button className="btn" onClick={submitComment} disabled={busy}>{busy ? "Posting…" : "Post comment"}</button>
                </div>
              </div>

              <div className="mt-4">
                <CommentTree comments={comments} postId={id} />
              </div>
            </div>

            <ReportModal open={reportOpen} onClose={() => setReportOpen(false)} post={post} />
          </>
        )}
      </div>
    </Shell>
  );
}
