// lib/categories.js
// Plain JS utility – no React imports needed.

/** Canonical category list used in LeftNav, dropdowns, and routes. */
export const CATEGORIES = [
  { name: "Confessions",      slug: "confessions" },
  { name: "Posts",            slug: "posts" },
  { name: "Product Reviews",  slug: "product-reviews" },
  { name: "Movie Reviews",    slug: "movie-reviews" },
  { name: "Place Reviews",    slug: "place-reviews" },
  { name: "Post Ideas",       slug: "post-ideas" },
  { name: "Post Ads",         slug: "post-ads" },
  { name: "Business Info",    slug: "business-info" },
  { name: "Sports",           slug: "sports" },
  { name: "Science",          slug: "science" },
  { name: "Automobile",       slug: "automobile" },
  { name: "Education",        slug: "education" },
  { name: "Anime",            slug: "anime" },
  { name: "Technology",       slug: "technology" },
  { name: "Travel",           slug: "travel" },
  { name: "Food",             slug: "food" },
  { name: "Health",           slug: "health" },
  { name: "Finance",          slug: "finance" },
  { name: "Fashion",          slug: "fashion" },
  { name: "Books",            slug: "books" },
  { name: "Music",            slug: "music" },
  { name: "Gaming",           slug: "gaming" },
  { name: "Photography",      slug: "photography" },
  { name: "Art",              slug: "art" },
  { name: "History",          slug: "history" },
  { name: "Relationships",    slug: "relationships" },
  { name: "Career",           slug: "career" },
  { name: "Pets",             slug: "pets" },
  { name: "Gardening",        slug: "gardening" },
  { name: "DIY",              slug: "diy" },
  { name: "Parenting",        slug: "parenting" },
  { name: "Fitness",          slug: "fitness" },
];

/** Quick lookup map, keyed by slug. */
const CATEGORY_MAP = CATEGORIES.reduce((acc, c) => {
  acc[c.slug] = c;
  return acc;
}, {});

/** Return a category object by slug (or null if not found). */
export function findCategory(slug) {
  if (!slug) return null;
  return CATEGORY_MAP[`${slug}`.toLowerCase()] ?? null;
}

/** Alias – some code may import getCategoryBySlug instead. */
export function getCategoryBySlug(slug) {
  return findCategory(slug);
}

/** Get all categories (already ordered as desired for the UI). */
export function getAllCategories() {
  return CATEGORIES;
}

/** Build the route for a category page. */
export function categoryPath(slug) {
  return `/c/${slug}`;
}

/** Convert a human label to a slug (useful if needed elsewhere). */
export function slugify(label = "") {
  return label
    .toString()
    .trim()
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Also export some aliases for convenience in other files.
export const categories = CATEGORIES;
export default CATEGORIES;
