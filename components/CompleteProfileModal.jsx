"use client";

import { useEffect, useState, useCallback } from "react";
import { Shield, EyeOff, CheckCircle2, XCircle, Loader2, Lock, UserCheck, Phone, Mail } from "lucide-react";
import { saveUserProfile } from "@/lib/profile";
import { db } from "@/lib/db";
import { collection, query, where, getDocs } from "firebase/firestore";

/* ─── Step 1: Privacy Notice ─── */
function PrivacyNotice({ onAccept }) {
  return (
    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="w-full max-w-lg card p-0 overflow-hidden">
        <div className="bg-gradient-to-r from-white/5 to-white/[0.02] border-b border-white/10 px-6 py-5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="text-base font-bold text-white">Your Privacy, Our Promise</div>
            <div className="text-xs text-white/40">Read this before continuing</div>
          </div>
        </div>

        <div className="px-6 py-5 space-y-3">
          {[
            {
              icon: Lock,
              title: "Your data is never shared",
              body: "Your real name, phone number, and email are stored securely and never displayed publicly or shared with any third party.",
            },
            {
              icon: EyeOff,
              title: "Alias protects your identity",
              body: "When you post using your alias, no one can trace it back to your real identity. Your real profile page is hidden from other users.",
            },
            {
              icon: UserCheck,
              title: "Anonymous = completely untraceable",
              body: "Posts marked Anonymous show no name, no alias, and no link to any profile. No one in the public feed can identify you.",
            },
            {
              icon: Mail,
              title: "No spam, ever",
              body: "We will never send marketing emails. Your contact details are only used for account security if needed.",
            },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
              <Icon className="h-4 w-4 text-white/60 mt-0.5 shrink-0" />
              <div>
                <div className="text-sm font-semibold text-white mb-0.5">{title}</div>
                <div className="text-xs text-white/50 leading-relaxed">{body}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="px-6 pb-6">
          <button
            onClick={onAccept}
            className="w-full rounded-full bg-white py-3 text-sm font-bold text-black hover:bg-neutral-200 transition"
          >
            I understand — Set up my profile →
          </button>
          <p className="mt-3 text-xs text-white/25 text-center">
            By continuing you agree to our{" "}
            <a href="/terms" className="underline hover:text-white/50">Terms</a>{" "}
            and{" "}
            <a href="/privacy" className="underline hover:text-white/50">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── Alias availability input ─── */
function AliasInput({ value, onChange, uid }) {
  const [status, setStatus] = useState("idle");
  const [timer, setTimer] = useState(null);

  const check = useCallback(async (alias) => {
    const clean = alias.trim().toLowerCase();
    if (!clean || clean.length < 3 || !/^[a-z0-9_]{3,20}$/.test(clean)) {
      setStatus("invalid");
      return;
    }
    setStatus("checking");
    try {
      const q = query(collection(db, "profiles"), where("aliasLower", "==", clean));
      const snap = await getDocs(q);
      setStatus(snap.docs.some((d) => d.id !== uid) ? "taken" : "available");
    } catch {
      setStatus("idle");
    }
  }, [uid]);

  function handleChange(e) {
    const val = e.target.value.replace(/\s/g, "");
    onChange(val);
    setStatus("idle");
    clearTimeout(timer);
    if (val.length >= 3) setTimer(setTimeout(() => check(val), 600));
  }

  const meta = {
    checking: { icon: <Loader2 className="h-4 w-4 text-white/40 animate-spin" />, msg: "Checking...", color: "text-white/40" },
    available: { icon: <CheckCircle2 className="h-4 w-4 text-green-400" />, msg: "Alias is available!", color: "text-green-400" },
    taken:     { icon: <XCircle className="h-4 w-4 text-red-400" />, msg: "This alias is already taken.", color: "text-red-400" },
    invalid:   { icon: <XCircle className="h-4 w-4 text-yellow-400" />, msg: "3–20 chars, letters/numbers/underscore only.", color: "text-yellow-400" },
  }[status];

  return (
    <div>
      <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">
        Alias <span className="text-white/30 normal-case font-normal">(public identity)</span>
      </label>
      <div className="relative mt-1">
        <input
          id="alias"
          name="alias"
          className="input pr-10"
          value={value}
          onChange={handleChange}
          placeholder="e.g. NightOwl99"
          maxLength={20}
          autoComplete="off"
        />
        {meta && <div className="absolute right-3 top-1/2 -translate-y-1/2">{meta.icon}</div>}
      </div>
      {meta && <p className={`mt-1 text-xs ${meta.color}`}>{meta.msg}</p>}
      <p className="mt-1 text-xs text-white/25">Others cannot trace your alias back to your real profile.</p>
    </div>
  );
}

/* ─── Step 2: Profile Form ─── */
function ProfileForm({ uid, initialName, initialEmail, onDone }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName]   = useState("");
  const [phone, setPhone]         = useState("");
  const [alias, setAlias]         = useState("");
  const [saving, setSaving]       = useState(false);
  const [err, setErr]             = useState("");

  useEffect(() => {
    if (initialName) {
      const parts = initialName.trim().split(" ");
      setFirstName(parts[0] || "");
      setLastName(parts.slice(1).join(" ") || "");
    }
  }, [initialName]);

  async function submit(e) {
    e.preventDefault();
    setErr("");
    const fn = firstName.trim();
    const ln = lastName.trim();
    const p  = phone.trim();
    const a  = alias.trim();
    if (!fn)  return setErr("First name is required.");
    if (!p)   return setErr("Phone number is required.");
    if (!/^[0-9+\-\s()]{7,16}$/.test(p)) return setErr("Enter a valid phone number.");
    if (a && a.length < 3) return setErr("Alias must be at least 3 characters.");
    setSaving(true);
    try {
      const fullName = ln ? `${fn} ${ln}` : fn;
      await saveUserProfile(uid, {
        name: fullName,
        firstName: fn,
        lastName: ln,
        phone: p,
        alias: a || fn,
        aliasLower: (a || fn).toLowerCase(),
        email: initialEmail,
        profileComplete: true,
      });
      onDone?.();
    } catch {
      setErr("Could not save profile. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center px-4 overflow-y-auto py-8">
      <div className="w-full max-w-md card p-0 overflow-hidden my-auto">
        <div className="bg-gradient-to-r from-white/5 to-white/[0.02] border-b border-white/10 px-6 py-5">
          <div className="text-xl font-bold text-white">Set up your profile</div>
          <div className="text-sm text-white/40 mt-0.5">Takes 30 seconds.</div>
        </div>

        <form onSubmit={submit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">First Name</label>
              <input id="firstName" name="firstName" className="input mt-1" value={firstName}
                onChange={(e) => setFirstName(e.target.value)} placeholder="Sujith" autoComplete="given-name" />
            </div>
            <div>
              <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">Last Name</label>
              <input id="lastName" name="lastName" className="input mt-1" value={lastName}
                onChange={(e) => setLastName(e.target.value)} placeholder="Anna" autoComplete="family-name" />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">Phone Number</label>
            <div className="relative mt-1">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 pointer-events-none" />
              <input id="phone" name="phone" className="input pl-9" value={phone}
                onChange={(e) => setPhone(e.target.value)} placeholder="+91 98765 43210"
                inputMode="tel" autoComplete="tel" />
            </div>
            <p className="mt-1 text-xs text-white/25">Never displayed publicly. For account security only.</p>
          </div>

          <AliasInput value={alias} onChange={setAlias} uid={uid} />

          <div>
            <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">Email</label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 pointer-events-none" />
              <input className="input pl-9 opacity-50 cursor-not-allowed" value={initialEmail || ""} readOnly tabIndex={-1} />
            </div>
            <p className="mt-1 text-xs text-white/25">From your Google account.</p>
          </div>

          {err && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400">{err}</div>
          )}

          <button type="submit" disabled={saving}
            className="w-full rounded-full bg-white py-3 text-sm font-bold text-black hover:bg-neutral-200 transition disabled:opacity-50 flex items-center justify-center gap-2">
            {saving ? <><Loader2 className="h-4 w-4 animate-spin" /> Saving...</> : "Save & Continue →"}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ─── Main Export ─── */
export default function CompleteProfileModal({ uid, initialName, initialEmail, onDone }) {
  const [step, setStep] = useState("privacy");
  if (step === "privacy") return <PrivacyNotice onAccept={() => setStep("form")} />;
  return <ProfileForm uid={uid} initialName={initialName} initialEmail={initialEmail} onDone={onDone} />;
}