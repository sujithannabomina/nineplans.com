'use client';

import React, { useMemo, useState } from "react";
import { ArrowBigUp, ArrowBigDown, Reply } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import { createComment, voteComment } from "@/lib/firestore";
import { timeAgo } from "@/lib/utils";

function buildTree(comments) {
  const map = new Map();
  const roots = [];
  comments.forEach((c) => map.set(c.id, { ...c, children: [] }));
  comments.forEach((c) => {
    const node = map.get(c.id);
    if (c.parentId) {
      const parent = map.get(c.parentId);
      if (parent) parent.children.push(node);
      else roots.push(node);
    } else {
      roots.push(node);
    }
  });
  return roots;
}

function Item({ node, postId }) {
  const { user, login } = useAuth();
  const [replying, setReplying] = useState(false);
  const [body, setBody] = useState("");
  const [busy, setBusy] = useState(false);

  const doVote = async (v) => {
    if (!user) return login();
    await voteComment(postId, node.id, user.uid, v);
  };

  const sendReply = async () => {
    if (!user) return login();
    const text = body.trim();
    if (!text) return;
    setBusy(true);
    try {
      await createComment({
        postId,
        parentId: node.id,
        authorUid: user.uid,
        authorAlias: user.primaryAlias,
        body: text,
      });
      setBody("");
      setReplying(false);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mt-3">
      <div className="flex gap-3">
        <div className="flex flex-col items-center gap-1 pt-1">
          <button className="btn-outline px-2 py-2" onClick={() => doVote(1)} aria-label="Upvote comment">
            <ArrowBigUp className="h-4 w-4" />
          </button>
          <div className="text-xs font-bold">{node.score}</div>
          <button className="btn-outline px-2 py-2" onClick={() => doVote(-1)} aria-label="Downvote comment">
            <ArrowBigDown className="h-4 w-4" />
          </button>
        </div>

        <div className="min-w-0 flex-1">
          <div className="text-xs text-black/60">
            <span className="font-semibold text-black">{node.authorAlias}</span> • {timeAgo(node.createdAt)}
          </div>
          <div className="mt-1 text-sm whitespace-pre-wrap">{node.body}</div>
          <div className="mt-2">
            <button className="btn-outline px-3 py-2 text-xs" onClick={() => setReplying((s) => !s)}>
              <Reply className="h-4 w-4" /> Reply
            </button>
          </div>

          {replying && (
            <div className="mt-2 card p-3">
              <textarea className="input min-h-[80px]" value={body} onChange={(e) => setBody(e.target.value)} placeholder="Write a reply…" />
              <div className="mt-2 flex justify-end gap-2">
                <button className="btn-outline" onClick={() => setReplying(false)}>Cancel</button>
                <button className="btn" onClick={sendReply} disabled={busy}>{busy ? "Posting…" : "Post reply"}</button>
              </div>
            </div>
          )}

          {node.children?.length > 0 ? (
            <div className="mt-3 border-l border-black/10 pl-4">
              {node.children.map((ch) => <Item key={ch.id} node={ch} postId={postId} />)}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default function CommentTree({ comments, postId }) {
  const tree = useMemo(() => buildTree(comments || []), [comments]);
  if (!tree.length) return <div className="text-sm text-black/60">No comments yet. Be the first.</div>;
  return <div>{tree.map((n) => <Item key={n.id} node={n} postId={postId} />)}</div>;
}
