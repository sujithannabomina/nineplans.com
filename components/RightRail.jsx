// components/RightRail.jsx
"use client";

import useAuth from "@/hooks/useAuth";
import Link from "next/link";

export default function RightRail() {
  const { user, login } = useAuth();

  return (
    <div className="space-y-4">
      {/* Join */}
      {!user && (
        <div className="rounded-2xl border bg-white p-4 shadow-sm">
          <div className="text-base font-semibold">Join NinePlans</div>
          <p className="mt-1 text-sm text-gray-600">
            Vote, comment, and post — while staying alias-first.
          </p>
          <button
            onClick={login}
            className="mt-3 w-full rounded-xl bg-black px-4 py-2 text-sm text-white hover:bg-gray-900"
          >
            Continue with Google
          </button>
        </div>
      )}

      {/* Feed controls */}
      <div className="rounded-2xl border bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold">Feed</div>
          <div className="text-xs text-gray-500">controls</div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <Link href="/?feed=trending" className="rounded-xl border px-3 py-2 text-center text-sm hover:bg-gray-50">
            Trending
          </Link>
          <Link href="/?feed=latest" className="rounded-xl bg-black px-3 py-2 text-center text-sm text-white hover:bg-gray-900">
            Latest
          </Link>
        </div>
        <p className="mt-3 text-xs text-gray-500">
          Trending is simple in MVP. Next: engagement-based trending + personalization.
        </p>
      </div>

      {/* ✅ GOOGLE ADS SPACE: at least 50% of right panel */}
      <div className="rounded-2xl border bg-white p-4 shadow-sm">
        <div className="text-sm font-semibold">Ad space</div>
        <p className="mt-1 text-xs text-gray-500">
          This area is reserved for Google AdSense. (At least 50% of the right panel.)
        </p>

        {/* This height enforces the requirement */}
        <div className="mt-3 flex h-[45vh] items-center justify-center rounded-xl border border-dashed text-xs text-gray-500">
          Google Ads (Reserved)
        </div>
      </div>

      {/* Rules */}
      <div className="rounded-2xl border bg-white p-4 shadow-sm">
        <div className="text-sm font-semibold">Rules</div>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700">
          <li>No hate, harassment, or threats.</li>
          <li>No spam, scams, or doxxing.</li>
          <li>Report abuse — moderation is fast.</li>
        </ul>
        <p className="mt-2 text-xs text-gray-500">
          Ads are hidden for “under_review” posts (safer for AdSense).
        </p>
        <Link href="/rules" className="mt-3 inline-block text-sm font-medium text-black hover:underline">
          Read full rules →
        </Link>
      </div>
    </div>
  );
}
