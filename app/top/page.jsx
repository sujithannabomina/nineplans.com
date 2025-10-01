import LeftRail from "@/components/LeftRail";
import RightRailAd from "@/components/RightRailAd";
import Providers from "@/components/Providers";

export default function TopIndexPage() {
  return (
    <Providers>
      <div className="mx-auto grid max-w-6xl grid-cols-12 gap-6 px-4 py-6">
        <aside className="col-span-12 hidden md:col-span-3 md:block">
          <LeftRail />
        </aside>

        <main className="col-span-12 space-y-6 md:col-span-6">
          <div className="rounded border border-neutral-800 bg-neutral-950 p-4">
            <h2 className="text-lg font-semibold">Most Viewed</h2>
            <p className="text-sm text-neutral-400">What everyone’s reading</p>
          </div>
          <div className="rounded border border-neutral-800 bg-neutral-950 p-4">
            <h2 className="text-lg font-semibold">Most Liked</h2>
            <p className="text-sm text-neutral-400">Community favorites</p>
          </div>
          <div className="rounded border border-neutral-800 bg-neutral-950 p-4">
            <h2 className="text-lg font-semibold">Most Commented</h2>
            <p className="text-sm text-neutral-400">Biggest discussions</p>
          </div>
        </main>

        <aside className="col-span-12 md:col-span-3">
          <RightRailAd />
        </aside>
      </div>
    </Providers>
  );
}
