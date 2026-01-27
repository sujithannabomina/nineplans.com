// components/ReportModal.jsx
"use client";

import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import { REPORT_REASONS } from "@/lib/constants";
import { reportPost } from "@/lib/firestore";

export default function ReportModal({ open, onClose, post }) {
  const { user, login } = useAuth();
  const [reason, setReason] = useState(REPORT_REASONS[0]);
  const [details, setDetails] = useState("");
  const [busy, setBusy] = useState(false);

  if (!open) return null;

  async function submit() {
    if (!user) return login();
    setBusy(true);
    try {
      await reportPost({
        uid: user.uid,
        postId: post?.id,
        reason,
        details,
      });
      onClose();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-5 shadow-xl">
        <div className="text-lg font-semibold">Report this post</div>
        <p className="mt-1 text-sm text-gray-600">
          Reports help us keep NinePlans safe. Abuse of reporting may be restricted.
        </p>

        <div className="mt-4 space-y-3">
          <div>
            <label className="text-sm font-medium">Reason</label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
            >
              {REPORT_REASONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Details (optional)</label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
              rows={4}
              placeholder="Add context (optional)"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="flex-1 rounded-xl border px-4 py-2 text-sm hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={submit}
              disabled={busy}
              className="flex-1 rounded-xl bg-black px-4 py-2 text-sm text-white hover:bg-gray-900 disabled:opacity-60"
            >
              {busy ? "Sending…" : "Report"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
