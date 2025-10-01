// app/top/page.jsx
import Link from 'next/link';
import LeftRail from '@/components/LeftRail';
import RightRailAd from '@/components/RightRailAd';

export const metadata = { title: 'Top • NinePlans' };

export default function TopPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6 grid grid-cols-12 gap-6">
      <LeftRail />

      <main className="col-span-12 lg:col-span-9 xl:col-span-6 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <Link
            href="/top/viewed"
            className="rounded-xl border border-zinc-800/70 bg-zinc-950/40 p-4 hover:border-zinc-700"
          >
            <h2 className="text-lg font-semibold mb-1">Most Viewed</h2>
            <p className="text-sm text-zinc-400">What everyone’s reading</p>
          </Link>

          <Link
            href="/top/liked"
            className="rounded-xl border border-zinc-800/70 bg-zinc-950/40 p-4 hover:border-zinc-700"
          >
            <h2 className="text-lg font-semibold mb-1">Most Liked</h2>
            <p className="text-sm text-zinc-400">Community favorites</p>
          </Link>
        </div>

        <Link
          href="/top/commented"
          className="block rounded-xl border border-zinc-800/70 bg-zinc-950/40 p-4 hover:border-zinc-700"
        >
          <h2 className="text-lg font-semibold mb-1">Most Commented</h2>
          <p className="text-sm text-zinc-400">Biggest discussions</p>
        </Link>

        <Link
          href="/top/saved"
          className="block rounded-xl border border-zinc-800/70 bg-zinc-950/40 p-4 hover:border-zinc-700"
        >
          <h2 className="text-lg font-semibold mb-1">Most Saved</h2>
          <p className="text-sm text-zinc-400">Bookmarked the most</p>
        </Link>
      </main>

      <RightRailAd />
    </div>
  );
}
