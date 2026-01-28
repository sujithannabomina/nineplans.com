// app/login/page.jsx
"use client";

import Shell from "@/components/Shell";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";

export default function LoginPage() {
  // ✅ SAFE: avoid destructuring when useAuth() returns null during SSR/prerender
  const auth = useAuth?.() || {};
  const user = auth.user ?? null;
  const login = auth.login ?? null;
  const logout = auth.logout ?? null;
  const loading = auth.loading ?? false;

  return (
    <Shell>
      <div className="rounded-2xl border bg-white p-4 shadow-sm">
        <div className="text-lg font-semibold">Login</div>
        <div className="mt-1 text-sm text-gray-600">
          Continue with Google to post, vote, and comment.
        </div>
      </div>

      <div className="mt-4 rounded-2xl border bg-white p-6 shadow-sm">
        {loading ? (
          <div className="text-sm text-gray-700">
            Loading…
            <div className="mt-1 text-xs text-gray-500">
              Preparing sign-in.
            </div>
          </div>
        ) : user ? (
          <div className="space-y-3">
            <div className="text-sm text-gray-700">
              You are already logged in.
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                href="/"
                className="rounded-xl border bg-white px-4 py-2 text-sm hover:bg-gray-50"
              >
                Go Home
              </Link>

              <Link
                href="/profile"
                className="rounded-xl border bg-white px-4 py-2 text-sm hover:bg-gray-50"
              >
                Profile
              </Link>

              <button
                onClick={() => logout?.()}
                className="rounded-xl bg-black px-4 py-2 text-sm text-white hover:bg-gray-900"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="text-sm text-gray-700">
              Sign in to access your profile and start posting.
            </div>

            <button
              onClick={() => login?.()}
              className="w-full rounded-xl bg-black px-4 py-2 text-sm text-white hover:bg-gray-900"
            >
              Continue with Google
            </button>

            <div className="text-xs text-gray-500">
              By continuing, you agree to our{" "}
              <Link className="underline" href="/terms">
                Terms
              </Link>{" "}
              and{" "}
              <Link className="underline" href="/privacy">
                Privacy Policy
              </Link>
              .
            </div>
          </div>
        )}
      </div>
    </Shell>
  );
}
