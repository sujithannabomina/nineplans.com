 // lib/categories.js
export const CATEGORIES = [
  // Your original list
  { name: "Confessions", slug: "confessions" },
  { name: "Posts", slug: "posts" },
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

  // The extra ones you liked
  { name: "Relationships", slug: "relationships" },
  { name: "Work & Career", slug: "work-career" },
  { name: "Money", slug: "money" },
  { name: "Family", slug: "family" },
  { name: "Health", slug: "health" },
  { name: "Travel", slug: "travel" },
  { name: "Tech", slug: "tech" },
  { name: "Other", slug: "other" },
];

export function findCategory(slug) {
  return CATEGORIES.find((c) => c.slug === slug);
}
