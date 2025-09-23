// app/top/liked/page.js
import Feed from "@/components/Feed";

export const metadata = { title: "Most Liked • NinePlans" };

export default function TopLikedPage() {
  return (
    <div className="grid gap-4">
      <h1 className="text-3xl font-bold">Most Liked</h1>
      {/* TODO: supply posts sorted by likes desc */}
      <Feed posts={[]} />
    </div>
  );
}
