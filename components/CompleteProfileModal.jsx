"use client";

import { useEffect, useState } from "react";
import { saveUserProfile } from "@/lib/profile";

export default function CompleteProfileModal({ uid, initialName, initialEmail, onDone }) {
  const [name, setName] = useState(initialName || "");
  const [phone, setPhone] = useState("");
  const [alias, setAlias] = useState("");
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => { setName(initialName || ""); }, [initialName]);

  async function submit(e) {
    e.preventDefault();
    setErr("");
    const n = (name || "").trim();
    const p = (phone || "").trim();
    if (!n) return setErr("Name is required.");
    if (!p) return setErr("Phone number is required.");
    if (!/^[0-9+\-\s()]{7,16}$/.test(p)) return setErr("Enter a valid phone number.");
    setSaving(true);
    try {
      await saveUserProfile(uid, { name: n, phone: p, alias: alias.trim() || n.split(" ")[0] });
      onDone?.();
    } catch {
      setErr("Could not save profile. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="card w-full max-w-md p-6">
        <div className="text-xl font-bold text-white mb-1">Complete your profile</div>
        <div className="text-sm text-white/50 mb-5">
          Just a few details to get you started. This takes 30 seconds.
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">Full Name</label>
            <input className="input mt-1" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
          </div>
          <div>
            <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">Phone Number</label>
            <input className="input mt-1" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98765 43210" inputMode="tel" />
          </div>
          <div>
            <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">Alias (for anonymous posts)</label>
            <input className="input mt-1" value={alias} onChange={(e) => setAlias(e.target.value)} placeholder="e.g. NightOwl99" />
            <p className="mt-1 text-xs text-white/30">This is your public name when you don't post anonymously.</p>
          </div>
          <div>
            <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">Email (from Google)</label>
            <input className="input mt-1 opacity-50 cursor-not-allowed" value={initialEmail || ""} readOnly />
          </div>
          {err && <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400">{err}</div>}
          <button disabled={saving} className="w-full rounded-full bg-white py-2.5 text-sm font-bold text-black hover:bg-neutral-200 transition disabled:opacity-50">
            {saving ? "Saving..." : "Save & Continue →"}
          </button>
        </form>
      </div>
    </div>
  );
}
