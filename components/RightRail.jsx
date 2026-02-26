// components/RightRail.jsx
"use client";

import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import useAuth from "@/hooks/useAuth";

export default function RightRail() {
  const { user, login } = useAuth();

  return (
    <div className="space-y-3">

      {/* Join CTA — only for logged out users */}
      {!user && (
        <div className="card p-4">
          <div className="text-base font-semibold text-neutral-200">Join NinePlans</div>
          <p className="mt-1 text-sm text-neutral-500">
            Post anything. Stay anonymous. No judgment.
          </p>
          {/* Fix #4: neutral-100 not pure white */}
          <button
            onClick={login}
            className="mt-3 w-full rounded-full bg-neutral-100 px-4 py-2 text-sm font-semibold text-neutral-900 hover:bg-neutral-200 transition"
          >
            Continue with Google
          </button>
          <p className="mt-2 text-xs text-neutral-600 text-center">Free forever. No spam.</p>
        </div>
      )}

      {/* Feed controls */}
      <div className="card p-4">
        <div className="text-sm font-semibold text-neutral-300 mb-3">Feed</div>
        <div className="grid grid-cols-2 gap-2">
          {/* Fix #4: softer inactive state */}
          <Link
            href="/?feed=trending"
            className="rounded-xl border border-neutral-700 px-3 py-2 text-center text-sm text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200 transition"
          >
            🔥 Trending
          </Link>
          <Link
            href="/?feed=latest"
            className="rounded-xl bg-neutral-200 px-3 py-2 text-center text-sm font-semibold text-neutral-900 hover:bg-neutral-100 transition"
          >
            🆕 Latest
          </Link>
        </div>
      </div>

      {/* Fix #6: use AdSlot component properly instead of placeholder divs */}
      <div className="card p-4">
        <div className="text-xs text-neutral-600 mb-2">Sponsored</div>
        <AdSlot
          slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_1}
          className="min-h-[280px]"
        />
      </div>

      {/* Community Rules */}
      <div className="card p-4">
        <div className="text-sm font-semibold text-neutral-300 mb-2">Community Rules</div>
        <ul className="space-y-1.5 text-sm text-neutral-500">
          <li className="flex items-start gap-2"><span className="text-neutral-600">1.</span>Be respectful. No hate or harassment.</li>
          <li className="flex items-start gap-2"><span className="text-neutral-600">2.</span>No spam, scams, or doxxing.</li>
          <li className="flex items-start gap-2"><span className="text-neutral-600">3.</span>Anonymous = privacy, not abuse.</li>
          <li className="flex items-start gap-2"><span className="text-neutral-600">4.</span>Report bad content — we act fast.</li>
        </ul>
        <Link href="/rules" className="mt-3 inline-block text-xs text-neutral-600 hover:text-neutral-400 transition">
          Read full rules →
        </Link>
      </div>

      {/* Second ad slot */}
      <div className="card p-4">
        <div className="text-xs text-neutral-600 mb-2">Sponsored</div>
        <AdSlot
          slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_2}
          className="min-h-[200px]"
        />
      </div>

    </div>
  );
}