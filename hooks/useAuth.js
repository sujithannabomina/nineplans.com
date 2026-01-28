// hooks/useAuth.js
"use client";

import { useEffect, useMemo, useSyncExternalStore } from "react";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "@/lib/db";
import { ensureUserDoc, fetchUserDoc } from "@/lib/firestore";

/**
 * ✅ FAILPROOF AUTH STORE (NO CONTEXT REQUIRED)
 * - Never returns null (prevents Vercel prerender/export crashes)
 * - Works across ALL pages including /_not-found, /admin, /login, /profile, etc.
 */

let _state = {
  user: null,
  userDoc: null,
  loading: true,
};

const _listeners = new Set();

function _emit() {
  _listeners.forEach((fn) => fn());
}

function _setState(patch) {
  _state = { ..._state, ...patch };
  _emit();
}

let _started = false;

function _startAuth() {
  if (_started) return;
  _started = true;

  // If auth isn't ready for some reason, fail gracefully
  if (!auth) {
    _setState({ loading: false });
    return;
  }

  onAuthStateChanged(auth, async (u) => {
    _setState({ user: u || null, loading: false });

    if (!u) {
      _setState({ userDoc: null });
      return;
    }

    // best-effort: ensure user doc + fetch profile doc
    try {
      await ensureUserDoc(u);
    } catch {}

    try {
      const doc = await fetchUserDoc(u.uid);
      _setState({ userDoc: doc || null });
    } catch {
      _setState({ userDoc: null });
    }
  });
}

function _subscribe(cb) {
  _listeners.add(cb);
  return () => _listeners.delete(cb);
}

function _getSnapshot() {
  return _state;
}

function _getServerSnapshot() {
  // During prerender/export, keep it safe
  return { user: null, userDoc: null, loading: true };
}

export default function useAuth() {
  const snap = useSyncExternalStore(_subscribe, _getSnapshot, _getServerSnapshot);

  useEffect(() => {
    // Start auth only on client
    _startAuth();
  }, []);

  const login = useMemo(() => {
    return async () => {
      if (!auth) return null;
      const provider = new GoogleAuthProvider();
      return signInWithPopup(auth, provider);
    };
  }, []);

  const logout = useMemo(() => {
    return async () => {
      if (!auth) return null;
      return signOut(auth);
    };
  }, []);

  return {
    ...snap,
    login,
    logout,
  };
}
