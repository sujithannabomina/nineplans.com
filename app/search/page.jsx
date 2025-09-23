// app/search/page.jsx
import SearchClient from "./search-client";
import { CATEGORIES } from "@/lib/site";

export const metadata = { title: "Search • NinePlans" };

export default function SearchPage({ searchParams }) {
  const q = typeof searchParams?.q === "string" ? searchParams.q : "";
  const cat = typeof searchParams?.cat === "string" ? searchParams.cat : "";

  // We pass categories to the client so it can show a dropdown and update URL.
  const categories = (CATEGORIES ?? []).map((c) =>
    typeof c === "string" ? c : c.name
  );

  return <SearchClient initialQuery={q} initialCategory={cat} categories={categories} />;
}
