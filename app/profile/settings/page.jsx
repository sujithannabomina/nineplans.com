// app/profile/settings/page.jsx
import LeftRail from '@/components/LeftRail';
import RightRailAd from '@/components/RightRailAd';
import AliasCard from '@/components/AliasCard';

export const metadata = { title: 'Settings • NinePlans' };

export default function ProfileSettingsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6 grid grid-cols-12 gap-6">
      <LeftRail />

      <main className="col-span-12 lg:col-span-9 xl:col-span-6 space-y-6">
        {/* Alias editor */}
        <AliasCard />

        {/* Keep your existing panels so page looks consistent */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-zinc-800/70 bg-zinc-950/40 p-4">
            <h2 className="font-semibold mb-1">Your posts</h2>
            <p className="text-sm text-zinc-400">No posts yet.</p>
          </div>
          <div className="rounded-xl border border-zinc-800/70 bg-zinc-950/40 p-4">
            <h2 className="font-semibold mb-1">Liked</h2>
            <p className="text-sm text-zinc-400">No likes yet.</p>
          </div>
          <div className="rounded-xl border border-zinc-800/70 bg-zinc-950/40 p-4">
            <h2 className="font-semibold mb-1">Saved</h2>
            <p className="text-sm text-zinc-400">No saved posts yet.</p>
          </div>
          <div className="rounded-xl border border-zinc-800/70 bg-zinc-950/40 p-4">
            <h2 className="font-semibold mb-1">Comments</h2>
            <p className="text-sm text-zinc-400">No comments yet.</p>
          </div>
        </div>
      </main>

      <RightRailAd />
    </div>
  );
}
