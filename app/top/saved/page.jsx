// app/top/saved/page.jsx
import LeftRail from '@/components/LeftRail';
import RightRailAd from '@/components/RightRailAd';

export const metadata = { title: 'Most Saved • NinePlans' };

export default function TopSaved() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6 grid grid-cols-12 gap-6">
      <LeftRail />
      <main className="col-span-12 lg:col-span-9 xl:col-span-6">
        <h1 className="text-xl font-semibold mb-4">Most Saved</h1>
        <div className="rounded-xl border border-zinc-800/70 bg-zinc-950/40 p-4">
          <p className="text-sm text-zinc-400">No posts yet.</p>
        </div>
      </main>
      <RightRailAd />
    </div>
  );
}
