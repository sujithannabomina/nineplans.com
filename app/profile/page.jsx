"use client";

import React, { useEffect, useState } from "react";
import Shell from "@/components/Shell";
import useAuth from "@/hooks/useAuth";
import { getUserProfile } from "@/lib/profile";
import CompleteProfileModal from "@/components/CompleteProfileModal";

export default function ProfilePage() {
  const { user, loadingAuth, signInWithGoogle } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [needsComplete, setNeedsComplete] = useState(false);

  async function load() {
    if (!user) return;
    setLoading(true);
    const p = await getUserProfile(user.uid);
    setProfile(p || null);
    setNeedsComplete(!p?.phone || !p?.name);
    setLoading(false);
  }

  useEffect(() => {
    if (user) load();
    else setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (loadingAuth) return null;

  return (
    <Shell>
      {!user ? (
        <div className="card p-6">
          <div className="text-lg font-extrabold">Profile</div>
          <div className="text-sm text-black/60 mt-1">Sign in to view your profile.</div>
          <button onClick={signInWithGoogle} className="btn btn-black mt-4">
            Continue with Google
          </button>
        </div>
      ) : loading ? (
        <div className="card p-6">Loading profile…</div>
      ) : (
        <div className="space-y-3">
          <div className="card p-6">
            <div className="text-lg font-extrabold">Your Profile</div>
            <div className="text-sm text-black/60 mt-1">Basic info we store for your account.</div>

            <div className="mt-4 grid gap-3">
              <div className="rounded-xl border border-black/10 p-3">
                <div className="text-xs font-semibold text-black/60">Name</div>
                <div className="text-sm font-bold">{profile?.name || "-"}</div>
              </div>

              <div className="rounded-xl border border-black/10 p-3">
                <div className="text-xs font-semibold text-black/60">Phone</div>
                <div className="text-sm font-bold">{profile?.phone || "-"}</div>
              </div>

              <div className="rounded-xl border border-black/10 p-3">
                <div className="text-xs font-semibold text-black/60">Email</div>
                <div className="text-sm font-bold">{profile?.email || user.email || "-"}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {user && needsComplete ? (
        <CompleteProfileModal
          uid={user.uid}
          initialName={user.displayName || ""}
          initialEmail={user.email || ""}
          onDone={async () => {
            await load();
          }}
        />
      ) : null}
    </Shell>
  );
}
