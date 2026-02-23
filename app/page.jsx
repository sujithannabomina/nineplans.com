import Shell from "@/components/Shell";
import HomeFeed from "@/components/HomeFeed";

export const dynamic = "force-dynamic";

export default function HomePage({ searchParams }) {
  const feed = searchParams?.feed === "trending" ? "trending" : "latest";
  return (
    <Shell>
      <HomeFeed feed={feed} />
    </Shell>
  );
}
