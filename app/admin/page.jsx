// app/admin/page.jsx
"use client";

import { useEffect, useState } from "react";
import Shell from "@/components/Shell";
import useAuth from "@/hooks/useAuth";
import { adminSetPostStatus, closeReport, listOpenReports, listenPost } from "@/lib/firestore";
import { POST_STATUS } from "@/lib/constants";

function ReportRow({ rep }) {
  const [post, setPost] = useState(null);

  useEffect(() => {
    const unsub = listenPost(rep.postId, setPost);
    return () => unsub?.();
  }, [rep.postId]);

  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="text-sm font-semibold">Report: {rep.reason}</div>
      <div className="mt-1 text-xs text-gray-600">Post ID: {rep.postId}</div>

      {post ? (
        <div className="mt-3 rounded-xl border bg-gray-50 p-3">
          <div className="text-sm font-semibold">{post.title}</div>
          <div className="mt-1 text-sm text-gray-700 line-clamp-2">{post.body}</div>
          <div className="mt-2 text-xs text-gray-500">
            Status: <span className="font-medium">{post.status}</span>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <button
              onClick={() => adminSetPostStatus(rep.postId, POST_STATUS.ACTIVE)}
              className="rounded-xl border px-3 py-2 text-sm hover:bg-gray-50"
            >
              Mark Active
            </button>
            <button
              onClick={() => adminSetPostStatus(rep.postId, POST_STATUS.UNDER_REVIEW)}
              className="rounded-xl border px-3 py-2 text-sm hover:bg-gray-50"
            >
              Under Review
            </button>
            <button
              onClick={() => adminSetPostStatus(rep.postId, POST_STATUS.REMOVED)}
              className="rounded-xl bg-black px-3 py-2 text-sm text-white hover:bg-gray-900"
            >
              Remove
            </button>
            <button
              onClick={() => closeReport(rep.id)}
              className="ml-auto rounded-xl border px-3 py-2 text-sm hover:bg-gray-50"
            >
              Close Report
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-3 text-sm text-gray-600">Loading post…</div>
      )}
    </div>
  );
}

export default function AdminPage() {
  const { user, loading, login } = useAuth();
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const unsub = listOpenReports(setReports);
    return () => unsub?.();
  }, []);

  return (
    <Shell>
      {loading ? (
        <div className="rounded-2xl border bg-white p-6 shadow-sm">Loading…</div>
      ) : !user ? (
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="text-lg font-semibold">Admin</div>
          <p className="mt-1 text-sm text-gray-600">Sign in to view moderation reports.</p>
          <button onClick={login} className="mt-4 rounded-xl bg-black px-4 py-2 text-sm text-white hover:bg-gray-900">
            Continue with Google
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="text-lg font-semibold">Admin Moderation</div>
            <p className="mt-1 text-sm text-gray-600">
              Review reports and set post status. Removed posts won’t show in feed.
            </p>
          </div>

          {reports?.length ? reports.map((r) => <ReportRow key={r.id} rep={r} />) : (
            <div className="rounded-2xl border bg-white p-6 text-sm text-gray-600 shadow-sm">
              No open reports right now.
            </div>
          )}
        </div>
      )}
    </Shell>
  );
}
