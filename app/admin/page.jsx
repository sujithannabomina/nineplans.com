// app/admin/page.jsx
"use client";

import Shell from "@/components/Shell";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";

export default function AdminPage() {
  // ✅ SAFE: avoid destructuring when useAuth() returns null during SSR/prerender
  const auth = useAuth?.() || {};
  const user = auth.user ?? null;
  const userDoc = auth.userDoc ?? null;
  const loading = auth.loading ?? false;

  // Basic admin check (keep it simple + non-breaking)
  const isAdmin =
    userDoc?.role === "admin" ||
    userDoc?.isAdmin === true ||
    user?.email === "admin@nineplans.com"; // optional fallback if you use a fixed admin email

  return (
    <Shell>
      <div className="rounded-2xl border bg-white p-4 shadow-sm">
        <div className="text-lg font-semibold">Admin</div>
        <div className="mt-1 text-sm text-gray-600">
          Admin tools and moderation dashboard.
        </div>
      </div>

      <div className="mt-4 rounded-2xl border bg-white p-6 text-sm text-gray-700 shadow-sm">
        {loading ? (
          <div>
            Loading…
            <div className="mt-1 text-xs text-gray-500">
              Checking your access.
            </div>
          </div>
        ) : !user ? (
          <div>
            Please{" "}
            <Link className="underline" href="/login">
              login
            </Link>{" "}
            to access admin.
          </div>
        ) : !isAdmin ? (
          <div>
            You don’t have access to this page.
            <div className="mt-2 text-xs text-gray-500">
              If you believe this is a mistake, contact support.
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="text-sm font-semibold text-gray-900">
              Welcome, Admin.
            </div>

            <div className="text-sm text-gray-600">
              Add your moderation tools here (reports, removals, category edits,
              etc.) without changing the existing UI layout.
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <Link
                href="/"
                className="rounded-xl border bg-white px-3 py-2 text-sm hover:bg-gray-50"
              >
                Go Home
              </Link>
              <Link
                href="/profile"
                className="rounded-xl border bg-white px-3 py-2 text-sm hover:bg-gray-50"
              >
                Profile
              </Link>
              <Link
                href="/rules"
                className="rounded-xl border bg-white px-3 py-2 text-sm hover:bg-gray-50"
              >
                Rules
              </Link>
              <Link
                href="/policy"
                className="rounded-xl border bg-white px-3 py-2 text-sm hover:bg-gray-50"
              >
                Policy
              </Link>
            </div>
          </div>
        )}
      </div>
    </Shell>
  );
}
