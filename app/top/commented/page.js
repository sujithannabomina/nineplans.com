// app/top/commented/page.js
import Feed from "@/components/Feed";

export const metadata = { title: "Most Commented • NinePlans" };

export default function TopCommentedPage() {
  return (
    <div className="grid gap-4">
      <h1 className="text-3xl font-bold">Most Commented</h1>
      {/* TODO: supply posts sorted by comments desc */}
      <Feed posts={[]} />
    </div>
  );
}
