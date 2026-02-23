"use client";

import Shell from "@/components/Shell";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { listOpenReports, closeReport, adminSetPostStatus } from "@/lib/firestore";
import { POST_STATUS } from "@/lib/constants";

export default function AdminPage() {
  const { user, userDoc, loading } = useAuth();
  const [reports, setReports] = useState([]);
  const [tab, setTab] = useState("reports");

  const isAdmin = userDoc?.role === "admin" || userDoc?.isAdmin === true;

  useEffect(() => {
    if (!isAdmin) return;
    const unsub = listOpenReports(setReports);
    return () => unsub?.();
  }, [isAdmin]);

  async function handlePostStatus(postId, status) {
    await adminSetPostStatus(postId, status);
  }

  async function handleCloseReport(reportId) {
    await closeReport(reportId);
  }

  return (
    <Shell>
      <div className="card p-5 mb-4">
        <div className="text-xl font-bold text-white">Admin Panel</div>
        <div className="text-sm text-white/50 mt-1">Moderation dashboard for NinePlans.</div>
      </div>

      {loading ? (
        <div className="card p-6 text-center text-white/40">Checking access…</div>
      ) : !user ? (
        <div className="card p-6 text-center">
          <p className="text-white/60 text-sm">
            <Link href="/login" className="underline hover:text-white">Sign in</Link> to access admin.
          </p>
        </div>
      ) : !isAdmin ? (
        <div className="card p-6 text-center">
          <div className="text-2xl mb-2">🚫</div>
          <div className="text-sm text-white/60">You don't have admin access.</div>
          <div className="text-xs text-white/30 mt-2">
            To become admin: open Firestore → users → your UID → set <code>role</code> to <code>"admin"</code>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Tabs */}
          <div className="flex gap-2">
            {[
              { key: "reports", label: `Reports (${reports.length})` },
              { key: "links", label: "Quick Links" },
            ].map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  tab === t.key ? "bg-white text-black" : "border border-white/20 text-white/60 hover:bg-white/10"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {tab === "reports" && (
            <div className="space-y-3">
              {reports.length === 0 ? (
                <div className="card p-6 text-center">
                  <div className="text-2xl mb-2">✅</div>
                  <div className="text-sm text-white/50">No open reports. All clear!</div>
                </div>
              ) : (
                reports.map((r) => (
                  <div key={r.id} className="card p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-red-400">{r.reason}</div>
                        <div className="text-xs text-white/40 mt-0.5">
                          Post: <Link href={`/post/${r.postId}`} className="underline hover:text-white">{r.postId}</Link>
                        </div>
                        {r.details && <div className="text-xs text-white/60 mt-1 bg-white/5 rounded-lg p-2">{r.details}</div>}
                      </div>
                      <div className="flex flex-col gap-2 shrink-0">
                        <button
                          onClick={() => handlePostStatus(r.postId, POST_STATUS.REMOVED)}
                          className="rounded-full bg-red-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-600 transition"
                        >
                          Remove Post
                        </button>
                        <button
                          onClick={() => handlePostStatus(r.postId, POST_STATUS.ACTIVE)}
                          className="rounded-full border border-white/20 px-3 py-1.5 text-xs text-white/60 hover:bg-white/10 transition"
                        >
                          Restore
                        </button>
                        <button
                          onClick={() => handleCloseReport(r.id)}
                          className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/30 hover:bg-white/5 transition"
                        >
                          Dismiss
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {tab === "links" && (
            <div className="card p-4">
              <div className="text-sm font-semibold text-white mb-3">Quick Navigation</div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  ["/", "Home Feed"],
                  ["/submit", "Create Post"],
                  ["/categories", "Categories"],
                  ["/rules", "Rules"],
                  ["/policy", "Policy"],
                  ["/faq", "FAQ"],
                  ["/terms", "Terms"],
                  ["/privacy", "Privacy"],
                  ["/contact", "Contact"],
                ].map(([href, label]) => (
                  <Link key={href} href={href} className="rounded-xl border border-white/10 px-3 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white transition">
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </Shell>
  );
}
