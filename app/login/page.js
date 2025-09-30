"use client";

import { useEffect } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  useEffect(() => {
    // Go straight to Google
    signIn("google", { callbackUrl: "/" });
  }, []);

  return (
    <div className="mx-auto max-w-md py-16">
      <div className="card space-y-4 text-center">
        <p>Redirecting to Google…</p>
        <button
          className="rounded-md bg-blue-600 px-4 py-2 text-sm hover:bg-blue-500"
          onClick={() => signIn("google", { callbackUrl: "/" })}
        >
          Try again
        </button>
      </div>
    </div>
  );
}
