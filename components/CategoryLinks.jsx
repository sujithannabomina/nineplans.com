// components/CategoryLinks.jsx
export const CATEGORIES = [
  { slug: "confessions", label: "Confessions" },
  { slug: "posts", label: "Posts" },
  { slug: "product-reviews", label: "Product Reviews" },
  { slug: "movie-reviews", label: "Movie Reviews" },
  { slug: "place-reviews", label: "Place Reviews" },
  { slug: "post-ideas", label: "Post Ideas" },
  { slug: "post-ads", label: "Post Ads" },
  { slug: "business-info", label: "Business Info" },
  { slug: "sports", label: "Sports" },
  { slug: "science", label: "Science" },
  { slug: "automobile", label: "Automobile" },
  { slug: "education", label: "Education" },
  { slug: "anime", label: "Anime" },
  { slug: "technology", label: "Technology" },
  { slug: "travel", label: "Travel" },
  { slug: "food", label: "Food" },
  { slug: "health", label: "Health" },
  { slug: "finance", label: "Finance" },
  { slug: "fashion", label: "Fashion" },
  // …keep your remaining categories if you have more
];

export const STATIC_PAGES = [
  { href: "/community", label: "Community" },
  { href: "/faq", label: "FAQ" },
  { href: "/rules", label: "Rules" },
  { href: "/policy", label: "Policy" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/trademark", label: "Trademark" },
];

export function getCategoryBySlug(slug) {
  return CATEGORIES.find((c) => c.slug === slug) || null;
}
