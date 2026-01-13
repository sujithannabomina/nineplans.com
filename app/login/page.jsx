'use client';

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

export default function LoginPage() {
  const { user, login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/");
  }, [user, router]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="card p-8 max-w-md w-full">
        <div className="text-xl font-extrabold">Login</div>
        <div className="text-sm text-black/60 mt-2">Continue with Google to use NinePlans.</div>
        <button className="btn mt-5 w-full" onClick={login}>Continue with Google</button>
      </div>
    </div>
  );
}
