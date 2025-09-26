// lib/categories.js
export const CATEGORY_LIST = [
  // Your original list
  { slug: "confessions", name: "Confessions" },
  { slug: "posts", name: "Posts" },
  { slug: "product-reviews", name: "Product Reviews" },
  { slug: "movie-reviews", name: "Movie Reviews" },
  { slug: "place-reviews", name: "Place Reviews" },
  { slug: "post-ideas", name: "Post Ideas" },
  { slug: "post-ads", name: "Post Ads" },
  { slug: "business-info", name: "Business Info" },
  { slug: "sports", name: "Sports" },
  { slug: "science", name: "Science" },
  { slug: "automobile", name: "Automobile" },
  { slug: "education", name: "Education" },
  { slug: "anime", name: "Anime" },
  { slug: "games", name: "Games" },

  // Extras you liked
  { slug: "relationships", name: "Relationships" },
  { slug: "work-career", name: "Work & Career" },
  { slug: "money", name: "Money" },
  { slug: "family", name: "Family" },
  { slug: "health", name: "Health" },
  { slug: "travel", name: "Travel" },
  { slug: "tech", name: "Tech" },
  { slug: "other", name: "Other" },
];

export const CATEGORY_BY_SLUG = Object.fromEntries(
  CATEGORY_LIST.map((c) => [c.slug, c])
);
