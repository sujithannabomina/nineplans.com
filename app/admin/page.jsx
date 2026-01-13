'use client';

import React, { useEffect, useState } from "react";
import Shell from "@/components/Shell";
import useAuth from "@/hooks/useAuth";
import { adminSetPostStatus, closeReport, listOpenReports } from "@/lib/firestore";
import Link from "next/link";

export default function AdminPage() {
  const { user, login } = useAuth();
  const [tab, setTab] = useState("latest");
  const [q, setQ] = useState("");

  const [reports, setReports] = useState([]);
  const [busyId, setBusyId] = useState(null);

  const isAdmin = user?.role === "admin";

  const load = async () => {
    const r = await listOpenReports(100);
    setReports(r);
  };

  useEffect(() => { load(); }, []);

  const act = async (r, action) => {
    if (!user) return login();
    if (!isAdmin) return alert("Admin only. Set your role to admin in Firestore users/{uid}.role");
    setBusyId(r.id);
    try {
      if (action === "approve") await adminSetPostStatus(r.targetId, "active");
      if (action === "remove") await adminSetPostStatus(r.targetId, "removed");
      await closeReport(r.id, user.uid);
      await load();
    } finally {
      setBusyId(null);
    }
  };

  return (
    <Shell q={q} setQ={setQ} tab={tab} setTab={setTab}>
      <div className="space-y-4">
        <div className="text-xl font-extrabold tracking-tight">Admin</div>

        {!user ? (
          <div className="card p-6">
            <div className="text-sm font-semibold">Login required</div>
            <button className="btn mt-4" onClick={login}>Continue with Google</button>
          </div>
        ) : !isAdmin ? (
          <div className="card p-6">
            <div className="text-sm font-semibold">Admin only</div>
            <div className="text-sm text-black/60 mt-1">
              To test: Firestore → users → your uid → set <span className="font-mono">role</span> to <span className="font-mono">admin</span>.
            </div>
          </div>
        ) : (
          <div className="card p-5">
            <div className="text-sm font-bold">Open reports</div>
            <div className="text-xs text-black/60 mt-1">Approve or remove posts, then close report.</div>

            <div className="mt-4 space-y-3">
              {reports.length === 0 ? (
                <div className="text-sm text-black/60">No open reports 🎉</div>
              ) : reports.map((r) => (
                <div key={r.id} className="rounded-2xl border border-black/10 p-4">
                  <div className="text-xs text-black/60">{r.reason} • {new Date(r.createdAt).toLocaleString()}</div>
                  <div className="text-sm font-semibold mt-1">Target: <Link href={`/post/${r.targetId}`} className="underline">{r.targetId}</Link></div>
                  {r.note ? <div className="text-sm text-black/70 mt-2 whitespace-pre-wrap">{r.note}</div> : null}
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button className="btn-outline" disabled={busyId===r.id} onClick={() => act(r, "approve")}>Approve</button>
                    <button className="btn" disabled={busyId===r.id} onClick={() => act(r, "remove")}>Remove</button>
                    <button className="btn-outline" disabled={busyId===r.id} onClick={() => act(r, "close")}>Close only</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Shell>
  );
}
