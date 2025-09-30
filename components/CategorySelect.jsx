// components/CategorySelect.jsx
"use client";

import { CATEGORIES } from "@/lib/constants";

export default function CategorySelect({ value, onChange }) {
  return (
    <div className="relative">
      {/* wrapper ensures the native dropdown can overflow */}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2"
      >
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <style jsx global>{`
        /* Ensure native select list isn't clipped by containers */
        select {
          overflow: visible !important;
        }
      `}</style>
    </div>
  );
}
