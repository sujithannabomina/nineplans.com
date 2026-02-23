"use client";

import Link from "next/link";
import useAuth from "@/hooks/useAuth";

export default function RightRail() {
  const { user, login } = useAuth();

  return (
    <div className="space-y-3">
      {/* Join CTA - only for logged out users */}
      {!user && (
        <div className="card p-4">
          <div className="text-base font-bold text-white">Join NinePlans</div>
          <p className="mt-1 text-sm text-white/60">
            Post anything. Stay anonymous. No judgment.
          </p>
          <button
            onClick={login}
            className="mt-3 w-full rounded-full bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-neutral-200 transition"
          >
            Continue with Google
          </button>
          <p className="mt-2 text-xs text-white/30 text-center">Free forever. No spam.</p>
        </div>
      )}

      {/* Feed controls */}
      <div className="card p-4">
        <div className="text-sm font-semibold text-white mb-3">Feed</div>
        <div className="grid grid-cols-2 gap-2">
          <Link href="/?feed=trending" className="rounded-xl border border-white/10 px-3 py-2 text-center text-sm text-white/70 hover:bg-white/10 hover:text-white transition">
            🔥 Trending
          </Link>
          <Link href="/?feed=latest" className="rounded-xl bg-white px-3 py-2 text-center text-sm font-semibold text-black hover:bg-neutral-200 transition">
            🆕 Latest
          </Link>
        </div>
      </div>

      {/* Google AdSense — main slot */}
      <div className="card p-4">
        <div className="text-xs text-white/30 mb-2">Sponsored</div>
        <div className="flex min-h-[280px] items-center justify-center rounded-xl border border-dashed border-white/10 text-xs text-white/20">
          {/* 
            Replace this div with your AdSense code after approval:
            <ins className="adsbygoogle"
              style={{ display: "block" }}
              data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID}
              data-ad-slot="YOUR_SLOT_ID"
              data-ad-format="auto"
              data-full-width-responsive="true" />
          */}
          Ad Space (Google AdSense)
        </div>
      </div>

      {/* Rules */}
      <div className="card p-4">
        <div className="text-sm font-semibold text-white mb-2">Community Rules</div>
        <ul className="space-y-1.5 text-sm text-white/60">
          <li className="flex items-start gap-2"><span>1.</span>Be respectful. No hate or harassment.</li>
          <li className="flex items-start gap-2"><span>2.</span>No spam, scams, or doxxing.</li>
          <li className="flex items-start gap-2"><span>3.</span>Anonymous = privacy, not abuse.</li>
          <li className="flex items-start gap-2"><span>4.</span>Report bad content — we act fast.</li>
        </ul>
        <Link href="/rules" className="mt-3 inline-block text-xs text-white/40 hover:text-white transition">
          Read full rules →
        </Link>
      </div>

      {/* Second ad slot */}
      <div className="card p-4">
        <div className="text-xs text-white/30 mb-2">Sponsored</div>
        <div className="flex min-h-[200px] items-center justify-center rounded-xl border border-dashed border-white/10 text-xs text-white/20">
          Ad Space
        </div>
      </div>
    </div>
  );
}
