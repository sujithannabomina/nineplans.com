'use client';

import { useContext } from "react";
import { AuthContext } from "@/app/providers";

export default function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <Providers/>");
  return ctx;
}
