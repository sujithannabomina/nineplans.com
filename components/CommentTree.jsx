"use client";

import { useMemo, useState } from "react";
import { ArrowBigUp, ArrowBigDown, Reply, ChevronDown, ChevronUp } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import { addComment } from "@/lib/firestore";
import { timeAgo } from "@/lib/utils";

function buildTree(comments) {
  const map = new Map();
  const roots = [];
  comments.forEach((c) => map.set(c.id, { ...c, children: [] }));
  comments.forEach((c) => {
    const node = map.get(c.id);
    if (c.parentId && map.has(c.parentId)) {
      map.get(c.parentId).children.push(node);
    } else {
      roots.push(node);
    }
  });
  return roots;
}

function CommentItem({ node, postId, depth = 0 }) {
  const { user, userDoc, login } = useAuth();
  const [replying, setReplying] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [body, setBody] = useState("");
  const [busy, setBusy] = useState(false);

  const sendReply = async () => {
    if (!user) return login();
    const text = body.trim();
    if (!text) return;
    setBusy(true);
    try {
      await addComment({
        uid: user.uid,
        postId,
        text,
        alias: userDoc?.alias || userDoc?.name || "User",
        parentId: node.id,
      });
      setBody("");
      setReplying(false);
    } finally {
      setBusy(false);
    }
  };

  const timeLabel = node.createdAt ? timeAgo(node.createdAt?.toMillis?.() || node.createdAt) : "";
  const hasChildren = node.children?.length > 0;

  return (
    <div className={depth > 0 ? "ml-4 border-l border-white/10 pl-3" : ""}>
      <div className="py-2">
        {/* Comment header */}
        <div className="flex items-center gap-2 text-xs text-white/40 mb-1">
          <span className="font-semibold text-white/70">{node.alias || node.authorAlias || "User"}</span>
          {timeLabel && <><span>•</span><span>{timeLabel}</span></>}
          {hasChildren && (
            <button
              onClick={() => setCollapsed((v) => !v)}
              className="ml-auto flex items-center gap-1 text-white/30 hover:text-white/60 transition"
            >
              {collapsed ? <ChevronDown className="h-3 w-3" /> : <ChevronUp className="h-3 w-3" />}
              {collapsed ? `${node.children.length} replies` : ""}
            </button>
          )}
        </div>

        {/* Comment body */}
        <p className="text-sm text-white/80 whitespace-pre-wrap leading-relaxed">
          {node.text || node.body}
        </p>

        {/* Actions */}
        {depth < 2 && (
          <div className="mt-1.5">
            <button
              onClick={() => setReplying((v) => !v)}
              className="inline-flex items-center gap-1 text-xs text-white/30 hover:text-white/60 hover:bg-white/5 rounded-full px-2 py-1 transition"
            >
              <Reply className="h-3 w-3" />
              Reply
            </button>
          </div>
        )}

        {/* Reply input */}
        {replying && (
          <div className="mt-2 space-y-2">
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="textarea text-sm"
              rows={2}
              placeholder="Write a reply…"
              autoFocus
            />
            <div className="flex gap-2">
              <button
                onClick={() => setReplying(false)}
                className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/50 hover:bg-white/10 transition"
              >
                Cancel
              </button>
              <button
                onClick={sendReply}
                disabled={busy || !body.trim()}
                className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-black hover:bg-neutral-200 transition disabled:opacity-40"
              >
                {busy ? "Posting…" : "Reply"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Nested children */}
      {!collapsed && hasChildren && (
        <div>
          {node.children.map((child) => (
            <CommentItem key={child.id} node={child} postId={postId} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function CommentTree({ comments, postId }) {
  const tree = useMemo(() => buildTree(comments || []), [comments]);

  if (!tree.length) {
    return (
      <div className="py-6 text-center">
        <div className="text-2xl mb-2">💬</div>
        <div className="text-sm text-white/40">No comments yet. Be the first to share your thoughts.</div>
      </div>
    );
  }

  return (
    <div className="divide-y divide-white/5">
      {tree.map((node) => (
        <CommentItem key={node.id} node={node} postId={postId} depth={0} />
      ))}
    </div>
  );
}
