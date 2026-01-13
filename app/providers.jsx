'use client';

import React, { createContext, useEffect, useMemo, useState } from "react";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "@/lib/db";
import { ensureUserDoc, fetchUserDoc } from "@/lib/firestore";

export const AuthContext = createContext(null);

export default function Providers({ children }) {
  const [firebaseUid, setFirebaseUid] = useState(null);
  const [user, setUser] = useState(null); // user doc
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, async (fbUser) => {
      setLoading(true);
      try {
        if (!fbUser) {
          setFirebaseUid(null);
          setUser(null);
          setLoading(false);
          return;
        }
        setFirebaseUid(fbUser.uid);
        await ensureUserDoc(fbUser);
        const doc = await fetchUserDoc(fbUser.uid);
        setUser(doc);
      } finally {
        setLoading(false);
      }
    });
  }, []);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    await signInWithPopup(auth, provider);
  };

  const logout = async () => { await signOut(auth); };

  const value = useMemo(() => ({ user, firebaseUid, loading, login, logout }), [user, firebaseUid, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
