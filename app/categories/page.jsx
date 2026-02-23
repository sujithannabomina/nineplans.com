import Shell from "@/components/Shell";
import Link from "next/link";

export const metadata = { title: "Browse Categories — NinePlans" };

const CATEGORIES = [
  { slug: "confessions", name: "Confessions", icon: "🤫", desc: "Share what you can't say elsewhere." },
  { slug: "posts", name: "Posts", icon: "📝", desc: "General posts and discussions." },
  { slug: "product-reviews", name: "Product Reviews", icon: "🛍️", desc: "Honest reviews from real users." },
  { slug: "movie-reviews", name: "Movie Reviews", icon: "🎬", desc: "Reviews and opinions on movies and series." },
  { slug: "place-reviews", name: "Place Reviews", icon: "📍", desc: "Restaurants, parks, malls, and more." },
  { slug: "post-ideas", name: "Post Ideas", icon: "💡", desc: "Ideas, prompts, and community topics." },
  { slug: "post-ads", name: "Post Ads", icon: "📢", desc: "Honest promotions and listings." },
  { slug: "business-info", name: "Business Info", icon: "💼", desc: "Business tips, startups, and market talk." },
  { slug: "sports", name: "Sports", icon: "⚽", desc: "Sports news, matches, and fan talk." },
  { slug: "science", name: "Science", icon: "🔬", desc: "Facts, discoveries, and explanations." },
  { slug: "automobile", name: "Automobile", icon: "🚗", desc: "Cars, bikes, reviews, and tips." },
  { slug: "education", name: "Education", icon: "📚", desc: "Study tips, exams, and learning resources." },
  { slug: "anime", name: "Anime", icon: "⛩️", desc: "Anime discussions and recommendations." },
  { slug: "games", name: "Games", icon: "🎮", desc: "Gaming, reviews, esports, and tips." },
  { slug: "technology", name: "Technology", icon: "💻", desc: "Tech news, gadgets, and digital life." },
  { slug: "health-fitness", name: "Health & Fitness", icon: "💪", desc: "Fitness, routines, and wellness." },
  { slug: "relationships", name: "Relationships", icon: "❤️", desc: "Friendship, love, and social life." },
  { slug: "career-jobs", name: "Career & Jobs", icon: "👔", desc: "Resumes, interviews, and office stories." },
  { slug: "finance", name: "Finance", icon: "💰", desc: "Budgeting, savings, and scam awareness." },
  { slug: "food-reviews", name: "Food Reviews", icon: "🍜", desc: "Food reviews and restaurant recommendations." },
  { slug: "travel", name: "Travel", icon: "✈️", desc: "Trips, itineraries, and budget travel." },
  { slug: "photography-art", name: "Photography & Art", icon: "📸", desc: "Photography, design, and creativity." },
];

export default function CategoriesPage() {
  return (
    <Shell>
      <div className="card p-5 mb-4">
        <h1 className="text-xl font-bold text-white">Browse Categories</h1>
        <p className="mt-1 text-sm text-white/50">Find posts that interest you, or create one in any category.</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {CATEGORIES.map((c) => (
          <Link
            key={c.slug}
            href={`/c/${c.slug}`}
            className="card-hover p-4 flex items-start gap-3"
          >
            <span className="text-2xl mt-0.5">{c.icon}</span>
            <div>
              <div className="text-base font-semibold text-white">{c.name}</div>
              <div className="mt-0.5 text-sm text-white/50">{c.desc}</div>
            </div>
          </Link>
        ))}
      </div>
    </Shell>
  );
}
