// lib/site.js
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
];

export const STATIC_LINKS = [
  { label: "FAQ", href: "/faq" },
  { label: "Rules", href: "/rules" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Policy", href: "/policy" },
  { label: "Community", href: "/community" },
  { label: "Trademark", href: "/trademark" },
];

export const categoryHref = (name) => `/post?cat=${encodeURIComponent(name)}`;
