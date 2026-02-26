// components/AdSlot.jsx
// Fix #6: removed duplicate — file was pasted twice, keeping single clean version
'use client';

import React, { useEffect } from "react";

export default function AdSlot({ slot, className = "" }) {
  const pub = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;

  useEffect(() => {
    if (!pub || !slot) return;
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch {}
  }, [pub, slot]);

  if (!pub || !slot) {
    return (
      <div className={`flex items-center justify-center rounded-xl border border-dashed border-neutral-800 min-h-[120px] ${className}`}>
        <span className="text-xs text-neutral-700">Ad Space (Google AdSense)</span>
      </div>
    );
  }

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={pub}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}