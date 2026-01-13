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
  { slug: "product-reviews", name: "Product Reviews", description: "Honest reviews. Clear details. No affiliate spam.", rules: ["No spam/affiliate links", "Be specific and fair", "No harassment"], sensitivity: "normal" },
  { slug: "career-jobs", name: "Career & Jobs", description: "Resumes, interviews, office stories, and advice.", rules: ["No personal info", "No recruitment spam", "Be helpful"], sensitivity: "normal" },
  { slug: "relationships", name: "Relationships", description: "Advice and stories about friendships, family, and love.", rules: ["Be respectful", "No hate/harassment", "No explicit sexual content"], sensitivity: "restricted" },
  { slug: "finance", name: "Finance", description: "Money talk: budgeting, scams, savings. No investment guarantees.", rules: ["No get-rich schemes", "No scams", "No personal info"], sensitivity: "normal" },
];

async function main() {
  const now = Date.now();
  for (const c of categories) {
    await setDoc(doc(db, "categories", c.slug), { ...c, createdAt: now, postCount: 0 }, { merge: true });
    console.log("Seeded:", c.slug);
  }
  console.log("Done.");
}

main().catch((e) => { console.error(e); process.exit(1); });
