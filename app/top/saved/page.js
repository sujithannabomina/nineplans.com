// app/top/saved/page.js
import Feed from "@/components/Feed";

export const metadata = { title: "Saved • NinePlans" };

export default function SavedPage() {
  return (
    <div className="grid gap-4">
      <h1 className="text-3xl font-bold">Saved</h1>
      {/* TODO: show current user's saved posts; require login */}
      <Feed posts={[]} />
    </div>
  );
}
