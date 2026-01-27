// app/page.jsx
import HomeFeed from "@/components/HomeFeed";

export default function HomePage({ searchParams }) {
  const feed = searchParams?.feed === "trending" ? "trending" : "latest";
  return <HomeFeed feed={feed} />;
}
