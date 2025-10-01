// components/AliasCard.jsx
"use client";

import { useEffect, useState } from "react";

export default function AliasCard() {
  const [alias, setAlias] = useState("");
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const a = localStorage.getItem("np_alias") || "";
    setAlias(a);
  }, []);

  function save() {
    const trimmed = alias.trim();
    if (trimmed.length < 2 || trimmed.length > 20) {
      setError("Alias must be 2–20 characters.");
      setSaved(false);
      return;
    }
    localStorage.setItem("np_alias", trimmed);
    setError("");
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  function clearAlias() {
    localStorage.removeItem("np_alias");
    setAlias("");
    setSaved(false);
    setError("");
  }

  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4">
      <div className="mb-2 text-sm font-medium text-neutral-300">Alias</div>
      <p className="mb-3 text-sm text-neutral-400">
        Choose a public alias. When submitting, select <b>Post as: Alias</b>.
      </p>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          value={alias}
          onChange={(e) => setAlias(e.target.value)}
          placeholder="e.g. NightOwl"
          className="w-full rounded-md border border-neutral-700 bg-neutral-800 px-3 py-2 outline-none"
        />
        <button
          onClick={save}
          className="rounded-md bg-sky-600 px-4 py-2 font-medium text-white hover:bg-sky-500"
        >
          Save
        </button>
        <button
          onClick={clearAlias}
          className="rounded-md border border-neutral-700 px-4 py-2 hover:bg-neutral-800"
        >
          Clear
        </button>
      </div>
      {saved && <div className="mt-2 text-sm text-emerald-400">Saved.</div>}
      {error && <div className="mt-2 text-sm text-rose-400">{error}</div>}
    </div>
  );
}
