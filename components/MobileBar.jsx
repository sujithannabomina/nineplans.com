"use client";

import { useState, useEffect, useRef } from "react";
import CategoryLinks from "./CategoryLinks";

export default function MobileBar() {
  const [open, setOpen] = useState(false);
  const sheetRef = useRef(null);

  useEffect(() => {
    function onDocClick(e) {
      if (!sheetRef.current) return;
      if (!sheetRef.current.contains(e.target)) setOpen(false);
    }
    if (open) document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [open]);

  return (
    <>
      <button
        aria-label="Open menu"
        onClick={() => setOpen((v) => !v)}
        className="md:hidden rounded-lg border border-white/20 p-2 hover:bg-white/10"
      >
        {/* hamburger icon */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" />
        </svg>
      </button>

      {/* Sheet drops under the topbar */}
      {open && (
        <div
          ref={sheetRef}
          className="absolute left-0 right-0 top-14 z-30 border-b border-white/10 bg-black/95 backdrop-blur"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-white/80">Browse</h3>
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg border border-white/20 px-2 py-1 text-sm hover:bg-white/10"
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>
            <CategoryLinks onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
