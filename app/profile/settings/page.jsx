"use client";

import { useEffect, useState } from "react";
import Shell from "@/components/Shell";
import useAuth from "@/hooks/useAuth";
import { updateAlias, updateProfileInfo } from "@/lib/firestore";
import Link from "next/link";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/db";

const ANON_SUGGESTIONS = [
  "ShadowFox", "MysteryPanda", "GhostWalker", "NightOwl99",
  "CrypticSoul", "VoidRider", "SilentStorm", "PhantomEcho",
];

export default function ProfileSettingsPage() {
  const { user, userDoc, loading, login } = useAuth();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [alias, setAlias] = useState("");
  const [anonName, setAnonName] = useState("");
  const [msg, setMsg] = useState({ text: "", ok: true });
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setName(userDoc?.name || "");
    setPhone(userDoc?.phone || "");
    setAlias(userDoc?.alias || "");
    setAnonName(userDoc?.anonName || "");
  }, [userDoc]);

  async function save() {
    if (!user) return login();
    setBusy(true);
    setMsg({ text: "", ok: true });

    const trimmedAlias = alias.trim();
    const trimmedAnon = anonName.trim();

    if (trimmedAlias && trimmedAlias.length < 3) {
      setMsg({ text: "Alias must be at least 3 characters.", ok: false });
      setBusy(false);
      return;
    }
    if (trimmedAnon && trimmedAnon.length < 3) {
      setMsg({ text: "Anonymous persona must be at least 3 characters.", ok: false });
      setBusy(false);
      return;
    }

    try {
      await updateProfileInfo(user.uid, { name: name.trim(), phone: phone.trim() });
      await updateAlias(user.uid, trimmedAlias);

      / Also save anonName to profiles doc — setDoc with merge creates if not exists
import { setDoc } from "firebase/firestore";  // add to your imports at top

const profileRef = doc(db, "profiles", user.uid);
await setDoc(profileRef, { anonName: trimmedAnon }, { merge: true });

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
            <p className="text-sm text-white/50 mb-5">Set up your identities. Your real name and email stay completely private.</p>

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

            <div className="space-y-5">

              {/* Email */}
              <div>
                <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">Email (read-only)</label>
                <input className="input mt-1 opacity-50 cursor-not-allowed" value={userDoc?.email || user.email || ""} readOnly />
                <p className="mt-1 text-xs text-white/30">From Google. Cannot be changed here.</p>
              </div>

              {/* Full Name */}
              <div>
                <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">Full Name</label>
                <input
                  className="input mt-1"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                />
                <p className="mt-1 text-xs text-white/30">Only shown when you post as "Real Name". Hidden otherwise.</p>
              </div>

              {/* Phone */}
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

              {/* Section header */}
              <div className="border-t border-white/10 pt-2">
                <div className="text-sm font-bold text-white mb-0.5">🎭 Your Posting Identities</div>
                <p className="text-xs text-white/40">
                  Create two separate creative names. Your real identity is never revealed for either.
                </p>
              </div>

              {/* Alias Name */}
              <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🎭</span>
                    <span className="text-sm font-semibold text-blue-300">Alias Name</span>
                  </div>
                  <span className="text-xs text-white/30">{alias.length}/30</span>
                </div>
                <input
                  className="input"
                  value={alias}
                  onChange={(e) => setAlias(e.target.value.slice(0, 30))}
                  placeholder="e.g. NightOwl99, UrbanPhilosopher…"
                />
                <p className="mt-2 text-xs text-blue-300/60">
                  Used when you post as <strong>"Alias"</strong>. Shown publicly but your profile stays hidden. Make it creative!
                </p>
              </div>

              {/* Anonymous Persona */}
              <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-base">👻</span>
                    <span className="text-sm font-semibold text-purple-300">Anonymous Persona</span>
                  </div>
                  <span className="text-xs text-white/30">{anonName.length}/30</span>
                </div>
                <input
                  className="input"
                  value={anonName}
                  onChange={(e) => setAnonName(e.target.value.slice(0, 30))}
                  placeholder="e.g. ShadowFox, PhantomEcho…"
                />
                {/* Quick pick suggestions */}
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {ANON_SUGGESTIONS.slice(0, 5).map((s) => (
                    <button
                      key={s}
                      onClick={() => setAnonName(s)}
                      className="rounded-full border border-purple-500/20 bg-purple-500/10 px-2.5 py-1 text-xs text-purple-300/70 hover:text-purple-200 hover:border-purple-500/40 transition"
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-xs text-purple-300/60">
                  Used when you post as <strong>"Anonymous"</strong>. No profile link, completely untraceable. Just a fun persona!
                </p>
              </div>

              {/* Live Preview */}
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">How you appear to others</div>
                <div className="space-y-2.5">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-400 shrink-0" />
                    <span className="text-xs text-white/40 w-20 shrink-0">Real Name:</span>
                    <span className="text-sm text-white font-medium truncate">{name || user?.displayName || "Your Name"}</span>
                    <span className="text-xs text-green-400/70 ml-auto shrink-0">profile shown</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 shrink-0" />
                    <span className="text-xs text-white/40 w-20 shrink-0">Alias:</span>
                    <span className="text-sm text-blue-300 font-medium truncate">{alias || "Not set"}</span>
                    <span className="text-xs text-yellow-400/70 ml-auto shrink-0">profile hidden</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 shrink-0" />
                    <span className="text-xs text-white/40 w-20 shrink-0">Anonymous:</span>
                    <span className="text-sm text-purple-300 font-medium truncate">{anonName || "Anonymous"}</span>
                    <span className="text-xs text-red-400/70 ml-auto shrink-0">fully hidden</span>
                  </div>
                </div>
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
