"use client";

import React, { createContext, useEffect, useMemo, useState } from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "@/lib/db";
import { ensureUserDoc, fetchUserDoc, seedDefaultCategoriesIfEmpty } from "@/lib/firestore";

export const AuthContext = createContext(null);

export default function Providers({ children }) {
  const [user, setUser] = useState(null);
  const [userDoc, setUserDoc] = useState(null);
  const [loading, setLoading] = useState(true);

  async function login() {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (e) {
      console.error("Login error:", e);
    }
  }

  async function logout() {
    await signOut(auth);
  }

  useEffect(() => {
    seedDefaultCategoriesIfEmpty().catch(() => {});

    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u || null);
      if (u?.uid) {
        await ensureUserDoc(u).catch(() => {});
        const docData = await fetchUserDoc(u.uid).catch(() => null);
        setUserDoc(docData);
      } else {
        setUserDoc(null);
      }
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const value = useMemo(
    () => ({ user, userDoc, loading, login, logout }),
    [user, userDoc, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
