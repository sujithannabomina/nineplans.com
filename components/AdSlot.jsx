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
      <div className={`card p-4 ${className}`}>
        <div className="text-xs font-semibold">Ad space</div>
        <div className="text-xs text-black/60 mt-1">Set AdSense env vars to enable ads.</div>
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
