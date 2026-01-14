"use client";

import React, { useEffect, useState } from "react";
import { saveUserProfile } from "@/lib/profile";

export default function CompleteProfileModal({ uid, initialName, initialEmail, onDone }) {
  const [name, setName] = useState(initialName || "");
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    setName(initialName || "");
  }, [initialName]);

  async function submit(e) {
    e.preventDefault();
    setErr("");

    const n = (name || "").trim();
    const p = (phone || "").trim();

    if (!n) return setErr("Name is required.");
    if (!p) return setErr("Phone is required.");
    if (!/^[0-9+\-\s()]{8,16}$/.test(p)) return setErr("Enter a valid phone number.");

    setSaving(true);
    try {
      await saveUserProfile(uid, { name: n, phone: p });
      onDone?.();
    } catch (e) {
      console.error(e);
      setErr("Could not save profile. Try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center px-3">
      <div className="card w-full max-w-md p-5 bg-white">
        <div className="text-lg font-extrabold">Complete your profile</div>
        <div className="text-sm text-black/60 mt-1">
          We need Name and Phone. Email comes from Google login.
        </div>

        <form onSubmit={submit} className="mt-4 space-y-3">
          <div>
            <label className="text-xs font-semibold text-black/70">Name</label>
            <input
              className="mt-1 w-full rounded-xl border border-black/15 px-3 py-2 text-sm outline-none focus:border-black"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-black/70">Phone</label>
            <input
              className="mt-1 w-full rounded-xl border border-black/15 px-3 py-2 text-sm outline-none focus:border-black"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone number"
              inputMode="tel"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-black/70">Email</label>
            <input
              className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2 text-sm bg-black/5"
              value={initialEmail || ""}
              readOnly
            />
          </div>

          {err ? <div className="text-sm text-red-600 font-semibold">{err}</div> : null}

          <button disabled={saving} className="btn btn-black w-full">
            {saving ? "Saving..." : "Save & Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}
