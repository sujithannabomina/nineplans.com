'use client';

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowBigUp, ArrowBigDown, MessageCircle, Flag, Bookmark } from "lucide-react";
import { timeAgo } from "@/lib/utils";
import useAuth from "@/hooks/useAuth";
import { votePost } from "@/lib/firestore";
import ReportModal from "@/components/ReportModal";

export default function PostCard({ post }) {
  const { user, login } = useAuth();
  const [reportOpen, setReportOpen] = useState(false);

  const meta = useMemo(() => `${post.categoryName} • ${timeAgo(post.createdAt)} • by ${post.authorAlias}`, [post]);

  const doVote = async (v) => {
    if (!user) return login();
    await votePost(post.id, user.uid, v);
  };

  return (
    <div className="card p-4 hover:shadow-soft transition">
      <div className="flex gap-3">
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
          <Link href={`/post/${post.id}`} className="no-underline">
            <h3 className="text-base font-extrabold tracking-tight hover:underline truncate">{post.title}</h3>
          </Link>

          <div className="mt-1 text-xs text-black/60 truncate">{meta}</div>

          <div className="mt-2 text-sm text-black/80 line-clamp-3 whitespace-pre-wrap">{post.body}</div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Link href={`/c/${post.categorySlug}`} className="badge no-underline">c/{post.categorySlug}</Link>
            {(post.tags || []).slice(0, 4).map((t) => <span key={t} className="badge">#{t}</span>)}

            <div className="flex-1" />

            <Link href={`/post/${post.id}`} className="btn-outline no-underline">
              <MessageCircle className="h-4 w-4" /> {post.commentCount}
            </Link>
            <button className="btn-outline" title="Save (soon)"><Bookmark className="h-4 w-4" /></button>
            <button className="btn-outline" onClick={() => setReportOpen(true)} title="Report"><Flag className="h-4 w-4" /></button>
          </div>
        </div>
      </div>

      <ReportModal open={reportOpen} onClose={() => setReportOpen(false)} post={post} />
    </div>
  );
}
