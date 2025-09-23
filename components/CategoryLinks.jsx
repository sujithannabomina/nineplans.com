<<<<<<< HEAD
"use client";

import Link from "next/link";

// Single source of truth for categories
export const CATEGORIES = [
  "Confessions",
  "Posts",
  "Product Reviews",
  "Movie Reviews",
  "Place Reviews",
  "Post Ideas",
  "Post Ads",
  "Business Info",
  "Sports",
  "Science",
  "Automobile",
  "Education",
  "Anime",
  "Games",
];

export const toSlug = (name) => name;        // keep display text
export const fromSlug = (slug) => slug;      // keep display text

export default function CategoryLinks({ className = "" }) {
  return (
    <nav className={className}>
      <h3 className="text-sm uppercase tracking-widest text-zinc-400 mb-3">
        Categories
      </h3>
      <ul className="space-y-2">
        {CATEGORIES.map((cat) => (
          <li key={cat}>
            {/* IMPORTANT: go to home with ?cat=... */}
            <Link
              href={`/?cat=${encodeURIComponent(cat)}`}
              className="block px-2 py-1 rounded hover:bg-zinc-800/70"
            >
              {cat}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
=======
"use client";

import Link from "next/link";

// Single source of truth for categories
export const CATEGORIES = [
  "Confessions",
  "Posts",
  "Product Reviews",
  "Movie Reviews",
  "Place Reviews",
  "Post Ideas",
  "Post Ads",
  "Business Info",
  "Sports",
  "Science",
  "Automobile",
  "Education",
  "Anime",
  "Games",
];

export const toSlug = (name) => name;        // keep display text
export const fromSlug = (slug) => slug;      // keep display text

export default function CategoryLinks({ className = "" }) {
  return (
    <nav className={className}>
      <h3 className="text-sm uppercase tracking-widest text-zinc-400 mb-3">
        Categories
      </h3>
      <ul className="space-y-2">
        {CATEGORIES.map((cat) => (
          <li key={cat}>
            {/* IMPORTANT: go to home with ?cat=... */}
            <Link
              href={`/?cat=${encodeURIComponent(cat)}`}
              className="block px-2 py-1 rounded hover:bg-zinc-800/70"
            >
              {cat}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
>>>>>>> 724b0ef (Initial commit from local working folder)
