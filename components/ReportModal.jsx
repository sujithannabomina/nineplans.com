'use client';

import React, { useMemo, useState } from "react";
import { X, AlertTriangle } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import { reportPost } from "@/lib/firestore";
import { REPORT_REASONS } from "@/lib/constants";

export default function ReportModal({ open, onClose, post }) {
  const { user, login } = useAuth();
  const [reason, setReason] = useState(REPORT_REASONS[0]);
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const title = useMemo(() => (done ? "Reported" : "Report post"), [done]);

  const submit = async () => {
    if (!user) return login();
    setBusy(true);
    try {
      await reportPost({
        postId: post.id,
        categorySlug: post.categorySlug,
        reporterUid: user.uid,
        reason,
        note: note.trim() || undefined,
      });
      setDone(true);
    } finally {
      setBusy(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/40 flex items-center justify-center p-4">
      <div className="card w-full max-w-lg p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-sm font-extrabold flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" /> {title}
            </div>
            <div className="text-xs text-black/60 mt-1 line-clamp-1">{post?.title}</div>
          </div>
          <button className="btn-outline px-2 py-2" onClick={onClose} aria-label="Close">
            <X className="h-4 w-4" />
          </button>
        </div>

        {!done ? (
          <>
            <div className="mt-4 space-y-2">
              <label className="text-xs font-semibold">Reason</label>
              <select className="input" value={reason} onChange={(e) => setReason(e.target.value)}>
                {REPORT_REASONS.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>

            <div className="mt-3 space-y-2">
              <label className="text-xs font-semibold">Optional note</label>
              <textarea className="input min-h-[90px]" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Add extra context (optional)" />
            </div>

            <div className="mt-4 flex items-center justify-end gap-2">
              <button className="btn-outline" onClick={onClose}>Cancel</button>
              <button className="btn" onClick={submit} disabled={busy}>{busy ? "Submitting…" : "Submit report"}</button>
            </div>
          </>
        ) : (
          <div className="mt-4">
            <div className="text-sm font-semibold">Thanks — our mods will review it soon.</div>
            <div className="text-xs text-black/60 mt-1">In MVP, reported posts are placed “under_review”.</div>
            <div className="mt-4 flex justify-end">
              <button className="btn" onClick={onClose}>Done</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
