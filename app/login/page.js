// app/login/page.js
"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto mt-16 p-6 border border-neutral-800 rounded-xl">
      <h1 className="text-2xl font-semibold mb-4">Sign in</h1>
      <p className="text-neutral-400 mb-6">
        Use your Google account to continue.
      </p>
      <button
        className="w-full btn-primary text-center"
        onClick={() => signIn("google", { callbackUrl: "/" })}
      >
        Sign in with Google
      </button>
    </div>
  );
}
