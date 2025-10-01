// app/top/viewed/page.jsx
import LeftRail from '@/components/LeftRail';
import RightRailAd from '@/components/RightRailAd';

export const metadata = { title: 'Most Viewed • NinePlans' };

export default function TopViewed() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6 grid grid-cols-12 gap-6">
      <LeftRail />
      <main className="col-span-12 lg:col-span-9 xl:col-span-6">
        <h1 className="text-xl font-semibold mb-4">Most Viewed</h1>
        <div className="rounded-xl border border-zinc-800/70 bg-zinc-950/40 p-4">
          <p className="text-sm text-zinc-400">No posts yet. Be the first to write one.</p>
        </div>
      </main>
      <RightRailAd />
    </div>
  );
}
