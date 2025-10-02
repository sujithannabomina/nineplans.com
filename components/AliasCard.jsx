// components/AliasCard.jsx
"use client";

import { useEffect, useState } from "react";

export default function AliasCard({ initialAlias }) {
  const [alias, setAlias] = useState(initialAlias ?? "");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    setAlias(initialAlias ?? "");
  }, [initialAlias]);

  async function saveAlias() {
    setSaving(true);
    setMsg("");
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ alias: alias.trim() || null }),
      });
      if (!res.ok) throw new Error("Failed");
      setMsg("Saved!");
    } catch {
      setMsg("Could not save. Try again.");
    } finally {
      setSaving(false);
      setTimeout(() => setMsg(""), 2000);
    }
  }

  function clearAlias() {
    setAlias("");
  }

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 mb-6">
      <h3 className="font-semibold mb-2">Alias</h3>
      <p className="text-sm text-zinc-400 mb-3">
        Choose a public alias. When submitting, select <b>Post as: Alias</b>.
      </p>
      <div className="flex items-center gap-2">
        <input
          value={alias}
          onChange={(e) => setAlias(e.target.value)}
          placeholder="e.g. NightOwl"
          className="flex-1 rounded-md bg-zinc-950 border border-zinc-800 px-3 py-2 outline-none focus:border-zinc-700"
        />
        <button
          onClick={saveAlias}
          disabled={saving}
          className="rounded-md bg-sky-600 px-4 py-2 hover:bg-sky-500 disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save"}
        </button>
        <button
          onClick={clearAlias}
          className="rounded-md border border-zinc-800 px-4 py-2 hover:bg-zinc-900"
        >
          Clear
        </button>
      </div>
      {msg && <div className="mt-2 text-sm text-zinc-300">{msg}</div>}
    </div>
  );
}
