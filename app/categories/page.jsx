// app/categories/page.jsx
export const metadata = { title: "Categories — NinePlans" };

const DEFAULT_CATEGORIES = [
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
  { slug: "technology", name: "Technology" },
  { slug: "health-fitness", name: "Health & Fitness" },
  { slug: "relationships", name: "Relationships" },
  { slug: "career-jobs", name: "Career & Jobs" },
  { slug: "finance", name: "Finance" },
  { slug: "food-reviews", name: "Food Reviews" },
  { slug: "travel", name: "Travel" },
  { slug: "photography-art", name: "Photography & Art" },
];

export default function CategoriesPage() {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-semibold">Browse all categories</h1>
      <p className="mt-2 text-sm text-gray-600">
        Choose a category to explore posts. (If Firestore categories are not seeded yet,
        this list still lets your app work.)
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {DEFAULT_CATEGORIES.map((c) => (
          <a
            key={c.slug}
            href={`/c/${c.slug}`}
            className="rounded-2xl border bg-white p-4 shadow-sm hover:shadow-md transition"
          >
            <div className="text-base font-semibold">{c.name}</div>
            <div className="mt-1 text-sm text-gray-600">
              Explore posts in {c.name}.
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
