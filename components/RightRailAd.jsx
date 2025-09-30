// components/RightRailAd.jsx
"use client";

import { useEffect } from "react";

export default function RightRailAd() {
  // If you later add AdSense, this is the mount point.
  useEffect(() => {
    // window.adsbygoogle = window.adsbygoogle || [];
    // window.adsbygoogle.push({});
  }, []);

  return (
    <aside className="sticky top-[64px] hidden h-[calc(100vh-64px)] w-72 shrink-0 overflow-y-auto border-l border-neutral-900 px-3 pb-6 pt-4 xl:block">
      <div className="rounded-lg border border-neutral-800 bg-neutral-950 p-4 text-sm text-neutral-400">
        Ads will appear here and across the page (Auto Ads).
      </div>
    </aside>
  );
}
