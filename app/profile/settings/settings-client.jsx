<<<<<<< HEAD
"use client";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { db } from "@/lib/firebase";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

export default function ProfileSettingsClient() {
  const { user } = useAuth();
  const [form, setForm] = useState({ displayName: "", alias: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let ignore = false;
    (async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      const snap = await getDoc(doc(db, "users", user.uid));
      const data = snap.data() || {};
      if (!ignore) {
        setForm({
          displayName: data.displayName || user.displayName || "",
          alias: data.alias || "",
        });
        setLoading(false);
      }
    })();
    return () => {
      ignore = true;
    };
  }, [user]);

  const save = async () => {
    if (!user) return;
    setSaving(true);
    await setDoc(
      doc(db, "users", user.uid),
      { displayName: form.displayName, alias: form.alias, updatedAt: serverTimestamp() },
      { merge: true }
    );
    setSaving(false);
    alert("Saved.");
  };

  if (loading) return <div className="p-6">Loading…</div>;
  if (!user) return <div className="p-6">Please sign in.</div>;

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Profile settings</h1>

      <label className="block mb-2 text-sm">Display name</label>
      <input
        className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-3 mb-4"
        value={form.displayName}
        onChange={(e) => setForm({ ...form, displayName: e.target.value })}
      />

      <label className="block mb-2 text-sm">Alias</label>
      <input
        className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-3 mb-6"
        value={form.alias}
        onChange={(e) => setForm({ ...form, alias: e.target.value })}
      />

      <button
        onClick={save}
        disabled={saving}
        className="rounded-xl bg-white text-black px-5 py-2 font-medium disabled:opacity-60"
      >
        {saving ? "Saving…" : "Save"}
      </button>
    </div>
  );
}
=======
"use client";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { db } from "@/lib/firebase";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

export default function ProfileSettingsClient() {
  const { user } = useAuth();
  const [form, setForm] = useState({ displayName: "", alias: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let ignore = false;
    (async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      const snap = await getDoc(doc(db, "users", user.uid));
      const data = snap.data() || {};
      if (!ignore) {
        setForm({
          displayName: data.displayName || user.displayName || "",
          alias: data.alias || "",
        });
        setLoading(false);
      }
    })();
    return () => {
      ignore = true;
    };
  }, [user]);

  const save = async () => {
    if (!user) return;
    setSaving(true);
    await setDoc(
      doc(db, "users", user.uid),
      { displayName: form.displayName, alias: form.alias, updatedAt: serverTimestamp() },
      { merge: true }
    );
    setSaving(false);
    alert("Saved.");
  };

  if (loading) return <div className="p-6">Loading…</div>;
  if (!user) return <div className="p-6">Please sign in.</div>;

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Profile settings</h1>

      <label className="block mb-2 text-sm">Display name</label>
      <input
        className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-3 mb-4"
        value={form.displayName}
        onChange={(e) => setForm({ ...form, displayName: e.target.value })}
      />

      <label className="block mb-2 text-sm">Alias</label>
      <input
        className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-3 mb-6"
        value={form.alias}
        onChange={(e) => setForm({ ...form, alias: e.target.value })}
      />

      <button
        onClick={save}
        disabled={saving}
        className="rounded-xl bg-white text-black px-5 py-2 font-medium disabled:opacity-60"
      >
        {saving ? "Saving…" : "Save"}
      </button>
    </div>
  );
}
>>>>>>> 724b0ef (Initial commit from local working folder)
