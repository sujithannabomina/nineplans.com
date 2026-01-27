// app/profile/settings/page.jsx
"use client";

import { useEffect, useState } from "react";
import Shell from "@/components/Shell";
import useAuth from "@/hooks/useAuth";
import { updateAlias, updateProfileInfo, fetchUserDoc } from "@/lib/firestore";

export default function ProfileSettingsPage() {
  const { user, userDoc, loading, login } = useAuth();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [alias, setAlias] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setName(userDoc?.name || "");
    setPhone(userDoc?.phone || "");
    setAlias(userDoc?.alias || "");
  }, [userDoc]);

  async function save() {
    if (!user) return login();
    setBusy(true);
    setMsg("");
    try {
      await updateProfileInfo(user.uid, { name, phone });
      await updateAlias(user.uid, alias);

      // Refresh message
      setMsg("Profile updated successfully.");
    } catch (e) {
      setMsg(e.message || "Failed to update");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Shell>
      {loading ? (
        <div className="rounded-2xl border bg-white p-6 shadow-sm">Loading…</div>
      ) : !user ? (
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="text-lg font-semibold">Profile Settings</div>
          <p className="mt-1 text-sm text-gray-600">Sign in to edit your profile.</p>
          <button onClick={login} className="mt-4 rounded-xl bg-black px-4 py-2 text-sm text-white hover:bg-gray-900">
            Continue with Google
          </button>
        </div>
      ) : (
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="text-lg font-semibold">Profile Settings</div>
          <p className="mt-1 text-sm text-gray-600">
            We collect: <span className="font-medium">Name</span>, <span className="font-medium">Phone</span>, and <span className="font-medium">Email</span>.
            Email is read-only (from Google).
          </p>

          <div className="mt-4 space-y-3">
            <div>
              <label className="text-sm font-medium">Email (read-only)</label>
              <input
                className="mt-1 w-full rounded-xl border bg-gray-50 px-3 py-2 text-sm"
                value={userDoc?.email || user.email || ""}
                readOnly
              />
            </div>

            <div>
              <label className="text-sm font-medium">Name</label>
              <input
                className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Phone</label>
              <input
                className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone number"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Alias (display name)</label>
              <input
                className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
                placeholder="Alias shown when not anonymous"
              />
              <p className="mt-1 text-xs text-gray-500">
                Alias is used for regular posts. Anonymous posts will still show “Anonymous”.
              </p>
            </div>

            {!!msg && <div className="rounded-xl border bg-white px-3 py-2 text-sm">{msg}</div>}

            <button
              onClick={save}
              disabled={busy}
              className="w-full rounded-xl bg-black px-4 py-2 text-sm text-white hover:bg-gray-900 disabled:opacity-60"
            >
              {busy ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </div>
      )}
    </Shell>
  );
}
