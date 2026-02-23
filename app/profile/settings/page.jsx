"use client";

import { useEffect, useState } from "react";
import Shell from "@/components/Shell";
import useAuth from "@/hooks/useAuth";
import { updateAlias, updateProfileInfo } from "@/lib/firestore";
import Link from "next/link";

export default function ProfileSettingsPage() {
  const { user, userDoc, loading, login } = useAuth();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [alias, setAlias] = useState("");
  const [msg, setMsg] = useState({ text: "", ok: true });
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setName(userDoc?.name || "");
    setPhone(userDoc?.phone || "");
    setAlias(userDoc?.alias || "");
  }, [userDoc]);

  async function save() {
    if (!user) return login();
    setBusy(true);
    setMsg({ text: "", ok: true });
    try {
      await updateProfileInfo(user.uid, { name, phone });
      await updateAlias(user.uid, alias);
      setMsg({ text: "✅ Profile updated successfully!", ok: true });
    } catch (e) {
      setMsg({ text: e.message || "Failed to update.", ok: false });
    } finally {
      setBusy(false);
    }
  }

  return (
    <Shell>
      <div className="max-w-lg mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <Link href="/profile" className="text-white/40 hover:text-white transition text-sm">← Profile</Link>
          <span className="text-white/20">/</span>
          <span className="text-sm text-white/70">Settings</span>
        </div>

        {loading ? (
          <div className="card p-8 text-center text-white/40">Loading…</div>
        ) : !user ? (
          <div className="card p-8 text-center">
            <p className="text-white/60 mb-4 text-sm">Sign in to edit your profile.</p>
            <button onClick={login} className="rounded-full bg-white px-6 py-2.5 text-sm font-bold text-black hover:bg-neutral-200 transition">
              Continue with Google
            </button>
          </div>
        ) : (
          <div className="card p-5">
            <div className="text-xl font-bold text-white mb-1">Profile Settings</div>
            <p className="text-sm text-white/50 mb-5">Your info is private. Only your alias is shown publicly.</p>

            {/* Avatar */}
            {user.photoURL && (
              <div className="flex items-center gap-3 mb-5 pb-5 border-b border-white/10">
                <img src={user.photoURL} alt="" className="h-14 w-14 rounded-full border-2 border-white/20" />
                <div>
                  <div className="text-sm font-medium text-white">{user.displayName}</div>
                  <div className="text-xs text-white/40">Google account photo</div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">Email (read-only)</label>
                <input className="input mt-1 opacity-50 cursor-not-allowed" value={userDoc?.email || user.email || ""} readOnly />
                <p className="mt-1 text-xs text-white/30">Your email comes from Google and cannot be changed here.</p>
              </div>

              <div>
                <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">Full Name</label>
                <input
                  className="input mt-1"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">Phone Number</label>
                <input
                  className="input mt-1"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  inputMode="tel"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">Alias (public display name)</label>
                <input
                  className="input mt-1"
                  value={alias}
                  onChange={(e) => setAlias(e.target.value.slice(0, 30))}
                  placeholder="e.g. NightOwl99"
                />
                <p className="mt-1 text-xs text-white/30">
                  This is shown on your non-anonymous posts. Max 30 characters. Anonymous posts always show "Anonymous".
                </p>
              </div>

              {msg.text && (
                <div className={`rounded-xl border px-4 py-3 text-sm ${
                  msg.ok ? "border-green-500/30 bg-green-500/10 text-green-400" : "border-red-500/30 bg-red-500/10 text-red-400"
                }`}>
                  {msg.text}
                </div>
              )}

              <button
                onClick={save}
                disabled={busy}
                className="w-full rounded-full bg-white py-3 text-sm font-bold text-black hover:bg-neutral-200 transition disabled:opacity-50"
              >
                {busy ? "Saving…" : "Save Changes"}
              </button>

              {/* Danger zone */}
              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="text-xs font-semibold text-red-400/70 uppercase tracking-wider mb-3">Danger Zone</div>
                <Link
                  href="/contact"
                  className="block rounded-xl border border-red-500/20 px-4 py-3 text-sm text-red-400/70 hover:border-red-500/40 hover:text-red-400 transition"
                >
                  Delete my account → Contact support to request account deletion.
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </Shell>
  );
}
