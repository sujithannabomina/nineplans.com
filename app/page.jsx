// app/page.jsx
import HomeFeed from "@/components/HomeFeed";

// This prevents Next from trying to prerender "/" at build time.
// Your home feed is realtime Firestore anyway, so dynamic render is correct.
export const dynamic = "force-dynamic";

export default function HomePage({ searchParams }) {
  const feed = searchParams?.feed === "trending" ? "trending" : "latest";
  return <HomeFeed feed={feed} />;
}
