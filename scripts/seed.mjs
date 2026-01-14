// scripts/seed.mjs
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

function need(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env ${name}`);
  return v;
}

const firebaseConfig = {
  apiKey: need("NEXT_PUBLIC_FIREBASE_API_KEY"),
  authDomain: need("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"),
  projectId: need("NEXT_PUBLIC_FIREBASE_PROJECT_ID"),
  storageBucket: need("NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"),
  messagingSenderId: need("NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID"),
  appId: need("NEXT_PUBLIC_FIREBASE_APP_ID"),
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const categories = [
  { slug: "confessions", name: "Confessions", description: "Say what you can’t say elsewhere. Be respectful. No doxxing.", rules: ["No personal info/doxxing", "No hate/harassment", "No threats/violence"], sensitivity: "restricted" },
  { slug: "posts", name: "Posts", description: "General posts, discussions, and everyday topics.", rules: ["Be respectful", "No spam", "No personal info/doxxing"], sensitivity: "normal" },
  { slug: "product-reviews", name: "Product Reviews", description: "Honest reviews. Clear details. No affiliate spam.", rules: ["No spam/affiliate links", "Be specific and fair", "No harassment"], sensitivity: "normal" },
  { slug: "movie-reviews", name: "Movie Reviews", description: "Share reviews and opinions on movies and series (no piracy).", rules: ["No piracy links", "No hate/harassment", "Keep spoilers tagged in body"], sensitivity: "normal" },
  { slug: "place-reviews", name: "Place Reviews", description: "Review places: restaurants, malls, parks, tourist spots, services.", rules: ["No fake reviews", "No personal info", "No harassment"], sensitivity: "normal" },
  { slug: "post-ideas", name: "Post Ideas", description: "Ideas for posts, topics, questions, and community prompts.", rules: ["No spam", "No harassment", "Stay relevant"], sensitivity: "normal" },
  { slug: "post-ads", name: "Post Ads", description: "Promotions and advertisements (strict anti-spam rules).", rules: ["No scams", "No repeated spam", "Be transparent (price/details)"], sensitivity: "restricted" },
  { slug: "business-info", name: "Business Info", description: "Business knowledge, startup tips, services, and market info.", rules: ["No scams", "No harassment", "No personal info"], sensitivity: "normal" },
  { slug: "sports", name: "Sports", description: "Sports news, match talk, training, and fan discussions.", rules: ["No hate/harassment", "No threats", "Keep it respectful"], sensitivity: "normal" },
  { slug: "science", name: "Science", description: "Science facts, discoveries, and simplified explanations.", rules: ["No misinformation spam", "Cite sources if possible", "Be respectful"], sensitivity: "normal" },
  { slug: "automobile", name: "Automobile", description: "Cars/bikes: reviews, maintenance, mods, mileage, driving tips.", rules: ["No illegal advice", "No scams", "Be respectful"], sensitivity: "normal" },
  { slug: "education", name: "Education", description: "Study tips, exams, colleges, learning resources, skills.", rules: ["No cheating services", "No harassment", "Be helpful"], sensitivity: "normal" },
  { slug: "anime", name: "Anime", description: "Anime discussions, reviews, recommendations (no piracy).", rules: ["No piracy links", "Be respectful", "Avoid spoilers in titles"], sensitivity: "normal" },
  { slug: "games", name: "Games", description: "Gaming: PC/mobile/console, reviews, tips, esports.", rules: ["No cheating tools", "No harassment", "No scams"], sensitivity: "normal" },

  // Best additions
  { slug: "technology", name: "Technology", description: "Tech news, gadgets, apps, AI, coding, and digital life.", rules: ["No malware/spam", "Be respectful", "No scams"], sensitivity: "normal" },
  { slug: "health-fitness", name: "Health & Fitness", description: "Fitness, routines, wellness, habits (no medical claims).", rules: ["No medical diagnosis claims", "No harmful advice", "Be respectful"], sensitivity: "restricted" },
  { slug: "relationships", name: "Relationships", description: "Friendship, love, family, and social life advice.", rules: ["Be respectful", "No hate/harassment", "No explicit sexual content"], sensitivity: "restricted" },
  { slug: "career-jobs", name: "Career & Jobs", description: "Resumes, interviews, office stories, learning, and advice.", rules: ["No recruitment spam", "No personal info", "Be helpful"], sensitivity: "normal" },
  { slug: "finance", name: "Finance", description: "Budgeting, scams awareness, savings, personal finance basics.", rules: ["No get-rich schemes", "No scams", "No guarantees"], sensitivity: "normal" },
  { slug: "food-reviews", name: "Food Reviews", description: "Food reviews, recipes, café/restaurant recommendations.", rules: ["No fake reviews", "Be respectful", "No harassment"], sensitivity: "normal" },
  { slug: "travel", name: "Travel", description: "Trips, itineraries, budget travel, and places to visit.", rules: ["No scams", "No personal info", "Be respectful"], sensitivity: "normal" },
  { slug: "photography-art", name: "Photography & Art", description: "Photography, design, edits, art, creativity, tools.", rules: ["No plagiarism", "Credit creators if possible", "Be respectful"], sensitivity: "normal" },
];

async function main() {
  const now = Date.now();
  for (const c of categories) {
    await setDoc(
      doc(db, "categories", c.slug),
      { ...c, createdAt: now, postCount: 0 },
      { merge: true }
    );
    console.log("Seeded:", c.slug);
  }
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
