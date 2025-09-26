"use client";

import { useState } from "react";
import Link from "next/link";
import { CATEGORY_LIST } from "@/lib/categories";

export default function MobileCategories() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        className="rounded-md border border-zinc-700 px-3 py-1 text-sm hover:bg-zinc-800"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        Categories
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/60"
          onClick={() => setOpen(false)}
        >
          <div
            className="absolute left-0 top-0 h-full w-72 bg-zinc-900 shadow-xl p-4 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between">
              <div className="text-sm font-semibold text-zinc-400">
                Categories
              </div>
              <button
                className="rounded-md px-2 py-1 text-sm hover:bg-zinc-800"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </div>
            <nav className="space-y-1">
              {CATEGORY_LIST.map((c) => (
                <Link
                  key={c.slug}
                  href={`/c/${c.slug}`}
                  className="block rounded-md px-2 py-1.5 text-sky-400 hover:bg-zinc-800 hover:text-sky-200"
                  onClick={() => setOpen(false)}
                >
                  {c.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
