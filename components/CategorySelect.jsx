"use client";

import { CATEGORY_LIST } from "@/lib/categories";

export default function CategorySelect({ value, onChange, includeAll }) {
  return (
    <select
      className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm"
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
    >
      {includeAll && <option value="">All categories</option>}
      {CATEGORY_LIST.map((c) => (
        <option key={c.slug} value={c.slug}>
          {c.name}
        </option>
      ))}
    </select>
  );
}
