// app/page.jsx
import LeftNav from "@/components/LeftNav";
import RightRailAd from "@/components/RightRailAd";
import Feed from "@/components/Feed"; // keep your existing Feed rendering

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <main className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-2 md:px-4 lg:grid-cols-[14rem,1fr] xl:grid-cols-[14rem,1fr,18rem]">
      <LeftNav />
      <section className="px-1 py-4">
        <h1 className="mb-4 text-3xl font-bold">Recent Posts</h1>
        <Feed />
      </section>
      <RightRailAd />
    </main>
  );
}
