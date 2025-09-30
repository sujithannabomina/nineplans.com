// components/CategorySelect.jsx
"use client";

import { CATEGORIES } from "@/lib/categories";

export default function CategorySelect({ value, onChange, allOption = true }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm text-neutral-100 outline-none focus:ring-1 focus:ring-neutral-600"
      size={1}
    >
      {allOption && <option value="">All categories</option>}
      {CATEGORIES.map((c) => (
        <option key={c.slug} value={c.slug}>
          {c.name}
        </option>
      ))}
    </select>
  );
}
