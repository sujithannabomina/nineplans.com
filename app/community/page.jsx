// app/community/page.jsx
import LeftRail from '@/components/LeftRail';
import RightRailAd from '@/components/RightRailAd';

export const metadata = { title: 'Community • NinePlans' };

export default function CommunityPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6 grid grid-cols-12 gap-6">
      <LeftRail />
      <main className="col-span-12 lg:col-span-9 xl:col-span-6 space-y-4">
        <h1 className="text-2xl font-semibold">Community</h1>
        <p className="text-zinc-300">
          Welcome! Community tools (groups, reputation, and events) are on the roadmap.
          For now, jump in by writing posts, commenting, and upvoting.
        </p>
      </main>
      <RightRailAd />
    </div>
  );
}
