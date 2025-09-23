// lib/site.js
export const SITE_NAME = "NinePlans";

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

export function slugifyCategory(name) {
  return name.toLowerCase().replace(/\s+/g, "-");
}
