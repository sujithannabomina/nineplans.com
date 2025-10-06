// components/RightRail.jsx
'use client';

import { useEffect } from 'react';
import clsx from 'clsx';

// Lightweight AdSense block. If env vars are missing, shows a placeholder box.
function AdsenseBlock({ className, style }) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;      // e.g. "ca-pub-xxxxxxxxxxxxxxx"
  const slot = process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR;  // e.g. "1234567890"

  useEffect(() => {
    // Only try to load AdSense if configured
    if (!client || !slot || typeof window === 'undefined') return;

    // Ensure the script is present only once
    const TAG = 'data-adsbygoogle-script';
    let script = document.querySelector(`script[${TAG}]`);
    if (!script) {
      script = document.createElement('script');
      script.setAttribute(TAG, '1');
      script.async = true;
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`;
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
      script.onload = () => {
        try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch {}
      };
    } else {
      try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch {}
    }
  }, [client, slot]);

  if (!client || !slot) {
    // Friendly placeholder (no runtime errors, no layout shifts)
    return (
      <div className={clsx("border rounded-2xl p-4 text-xs text-gray-500", className)} style={style}>
        <div className="font-semibold mb-1">Ad spot</div>
        Add <code>NEXT_PUBLIC_ADSENSE_CLIENT</code> and <code>NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR</code> in <code>.env.local</code> to show live ads.
        <div className="mt-2 h-60 bg-gray-100 rounded-lg" />
      </div>
    );
  }

  // Responsive ad container (300x600 default, allowed to auto-size)
  return (
    <ins
      className={clsx("adsbygoogle block", className)}
      style={style || { display: 'block', width: '300px', height: '600px' }}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}

export default function RightRail({ className = '' }) {
  return (
    <aside className={clsx("hidden lg:block w-[300px] shrink-0", className)}>
      <div className="sticky top-24 space-y-4">
        <AdsenseBlock />
        <div className="border rounded-2xl p-4">
          <h3 className="font-semibold mb-2 text-sm">Promoted</h3>
          <ul className="space-y-2 text-sm">
            <li className="truncate">
              <a className="hover:underline" href="/top">See what’s trending →</a>
            </li>
            <li className="truncate">
              <a className="hover:underline" href="/submit">Write a post →</a>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
}
