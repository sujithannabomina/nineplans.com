// app/profile/settings/page.js
"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const [alias, setAlias] = useState("");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  if (status === "loading") return <div>Loading…</div>;
  if (!session) return <div className="max-w-xl">Please sign in to change settings.</div>;

  const save = async () => {
    setSaving(true);
    setMsg("");
    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ alias })
      });
      if (!res.ok) throw new Error(await res.text());
      setMsg("Saved!");
    } catch (e) {
      setMsg("Error saving settings.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-xl">
      <div className="border border-neutral-800 rounded-xl p-4">
        <div className="font-semibold mb-2">Posting identity</div>
        <label className="block text-sm mb-1">Alias (optional)</label>
        <input
          value={alias}
          onChange={(e) => setAlias(e.target.value)}
          placeholder="e.g., Anonymous Owl"
          className="w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2"
        />
        <p className="text-xs text-neutral-400 mt-2">
          Choose an alias to post anonymously (visible instead of your name).
        </p>
        <div className="mt-4 flex gap-2">
          <button className="btn-primary" onClick={save} disabled={saving}>
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
        {msg && <div className="text-sm mt-2">{msg}</div>}
      </div>
    </div>
  );
}
