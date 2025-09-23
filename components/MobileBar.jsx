// components/MobileBar.jsx
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { CATEGORIES, STATIC_LINKS, categoryHref } from "@/lib/site";

export default function MobileBar({ open, onClose }) {
  // lock body scroll when menu open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = prev);
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button
        aria-label="Close menu"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <aside className="absolute left-0 top-0 h-full w-80 bg-zinc-950 border-r border-white/10 shadow-xl">
        <div className="flex items-center justify-between px-4 h-14 border-b border-white/10">
          <span className="text-sm font-semibold">Menu</span>
          <button
            onClick={onClose}
            className="rounded-md px-2 py-1 text-zinc-300 hover:bg-white/10"
          >
            Close
          </button>
        </div>

        <div className="h-[calc(100%-3.5rem)] overflow-y-auto pb-6">
          <Section title="Categories">
            <ul className="space-y-1">
              {CATEGORIES.map((name) => (
                <li key={name}>
                  <Link
                    href={categoryHref(name)}
                    onClick={onClose}
                    className="block rounded-md px-4 py-2 text-sm text-zinc-300 hover:text-white hover:bg-white/5"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Pages">
            <ul className="space-y-1">
              {STATIC_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={onClose}
                    className="block rounded-md px-4 py-2 text-sm text-zinc-300 hover:text-white hover:bg-white/5"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Section>
        </div>
      </aside>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="pt-3">
      <div className="px-4 pb-2 text-xs font-semibold uppercase tracking-wide text-zinc-400">
        {title}
      </div>
      {children}
    </div>
  );
}
