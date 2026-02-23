"use client";

import { useContext } from "react";
import { AuthContext } from "@/app/providers";

export default function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    // Safe fallback during SSR/prerender
    return { user: null, userDoc: null, loading: true, login: () => {}, logout: () => {} };
  }
  return ctx;
}
