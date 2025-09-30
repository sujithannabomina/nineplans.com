// app/login/page.jsx
"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-64px)] max-w-2xl items-center justify-center px-4">
      <div className="w-full rounded-2xl border border-neutral-800 bg-neutral-950 p-8 text-center shadow">
        <h1 className="mb-6 text-2xl font-semibold">Sign in</h1>
        <button
          onClick={() => signIn("google", { callbackUrl: "/submit" })}
          className="mx-auto block w-full rounded-xl border border-neutral-700 bg-white px-5 py-3 text-base font-medium text-black hover:opacity-90"
        >
          <span className="mr-2 align-middle">🔒</span>
          Sign in with Google
        </button>
        <p className="mt-3 text-xs text-neutral-400">
          You can still post anonymously after sign in.
        </p>
      </div>
    </main>
  );
}
