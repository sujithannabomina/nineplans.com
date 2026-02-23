"use client";

import { useState } from "react";
import { X } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import { REPORT_REASONS } from "@/lib/constants";
import { reportPost } from "@/lib/firestore";

export default function ReportModal({ open, onClose, post }) {
  const { user, login } = useAuth();
  const [reason, setReason] = useState(REPORT_REASONS[0]);
  const [details, setDetails] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  if (!open) return null;

  async function submit() {
    if (!user) { onClose(); return login(); }
    setBusy(true);
    try {
      await reportPost({ uid: user.uid, postId: post?.id, reason, details });
      setDone(true);
      setTimeout(() => { setDone(false); onClose(); }, 2000);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="w-full max-w-md card p-5" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <div className="text-base font-bold text-white">Report Post</div>
          <button onClick={onClose} className="rounded-full p-1.5 text-white/50 hover:bg-white/10 hover:text-white transition">
            <X className="h-4 w-4" />
          </button>
        </div>

        {done ? (
          <div className="py-6 text-center">
            <div className="text-2xl mb-2">✅</div>
            <div className="text-sm text-white/70">Report submitted. We'll review it shortly.</div>
          </div>
        ) : (
          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">Reason</label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="input mt-1"
              >
                {REPORT_REASONS.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">Details (optional)</label>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="textarea mt-1"
                rows={3}
                placeholder="Add more context..."
              />
            </div>

            <div className="flex gap-2 pt-1">
              <button onClick={onClose} className="flex-1 rounded-full border border-white/20 py-2 text-sm text-white/70 hover:bg-white/10 transition">
                Cancel
              </button>
              <button
                onClick={submit}
                disabled={busy}
                className="flex-1 rounded-full bg-red-500 py-2 text-sm font-semibold text-white hover:bg-red-600 transition disabled:opacity-50"
              >
                {busy ? "Sending…" : "Submit Report"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
