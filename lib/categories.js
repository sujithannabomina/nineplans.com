// lib/categories.js
export const DEFAULT_CATEGORIES = [
  // Your initial list
  { name: "Confessions", slug: "confessions" },
  { name: "General Posts", slug: "general-posts" },
  { name: "Product Reviews", slug: "product-reviews" },
  { name: "Movie Reviews", slug: "movie-reviews" },
  { name: "Place Reviews", slug: "place-reviews" },
  { name: "Post Ideas", slug: "post-ideas" },
  { name: "Post Ads", slug: "post-ads" },
  { name: "Business Info", slug: "business-info" },
  { name: "Sports", slug: "sports" },
  { name: "Science", slug: "science" },
  { name: "Automobile", slug: "automobile" },
  { name: "Education", slug: "education" },
  { name: "Anime", slug: "anime" },
  { name: "Games", slug: "games" },

  // Best additions (useful, broad, safe)
  { name: "Technology", slug: "technology" },
  { name: "Health & Fitness", slug: "health-fitness" },
  { name: "Finance", slug: "finance" },
  { name: "Travel", slug: "travel" },
  { name: "Food", slug: "food" },
  { name: "Career", slug: "career" },
  { name: "Relationships", slug: "relationships" },
  { name: "Art & Culture", slug: "art-culture" },
];

export function slugifyCategory(name = "") {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
