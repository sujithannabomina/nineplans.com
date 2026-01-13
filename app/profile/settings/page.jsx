'use client';

import React, { useEffect, useState } from "react";
import Shell from "@/components/Shell";
import useAuth from "@/hooks/useAuth";
import { updateAlias } from "@/lib/firestore";

export default function ProfileSettingsPage() {
  const { user, loading, login } = useAuth();
  const [tab, setTab] = useState("latest");
  const [q, setQ] = useState("");

  const [alias, setAlias] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => { setAlias(user?.primaryAlias || ""); }, [user]);

  const save = async () => {
    if (!user) return login();
    const v = alias.trim();
    if (v.length < 3) return alert("Alias must be at least 3 characters.");
    if (v.length > 20) return alert("Alias too long (max 20).");
    if (!/^[a-zA-Z0-9_]+$/.test(v)) return alert("Alias can contain only letters, numbers, underscore.");

    setBusy(true);
    try {
      await updateAlias(user.uid, v);
      alert("Saved. Refresh may be needed.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Shell q={q} setQ={setQ} tab={tab} setTab={setTab}>
      <div className="space-y-4">
        <div className="text-xl font-extrabold tracking-tight">Settings</div>

        {loading ? (
          <div className="card p-5 h-28 skeleton" />
        ) : !user ? (
          <div className="card p-6">
            <div className="text-sm font-semibold">Login required</div>
            <div className="text-sm text-black/60 mt-1">Sign in with Google to manage settings.</div>
            <button className="btn mt-4" onClick={login}>Continue with Google</button>
          </div>
        ) : (
          <div className="card p-5 space-y-3">
            <div>
              <div className="text-sm font-bold">Your alias</div>
              <div className="text-xs text-black/60">This is what other people see. Your email is never shown publicly.</div>
            </div>

            <input className="input" value={alias} onChange={(e) => setAlias(e.target.value)} />

            <div className="flex justify-end">
              <button className="btn" onClick={save} disabled={busy}>{busy ? "Saving…" : "Save"}</button>
            </div>

            <div className="pt-2 border-t border-black/10">
              <div className="text-sm font-bold">Privacy (MVP)</div>
              <div className="text-xs text-black/60 mt-1">Next: per-category aliases, throwaway mode, and visibility toggles.</div>
            </div>
          </div>
        )}
      </div>
    </Shell>
  );
}
