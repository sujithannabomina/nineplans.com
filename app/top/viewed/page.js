// app/top/viewed/page.js
import Feed from "@/components/Feed";

export const metadata = { title: "Most Viewed • NinePlans" };

export default function TopViewedPage() {
  return (
    <div className="grid gap-4">
      <h1 className="text-3xl font-bold">Most Viewed</h1>
      {/* TODO: provide posts sorted by views desc */}
      <Feed posts={[]} />
    </div>
  );
}
