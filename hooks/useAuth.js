// hooks/useAuth.js
"use client";

import { useContext } from "react";
import { AuthContext } from "@/app/providers";

export default function useAuth() {
  return useContext(AuthContext);
}
