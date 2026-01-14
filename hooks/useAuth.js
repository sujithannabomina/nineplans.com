"use client";

import { useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/db";
import { ensureUserDoc } from "@/lib/profile";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u || null);
      setLoadingAuth(false);

      // Create/update user doc on login (name/email/photo)
      if (u) {
        try {
          await ensureUserDoc(u);
        } catch (e) {
          console.error("ensureUserDoc error:", e);
        }
      }
    });

    return () => unsub();
  }, []);

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  }

  async function signOutUser() {
    await signOut(auth);
  }

  return { user, loadingAuth, signInWithGoogle, signOutUser };
}
