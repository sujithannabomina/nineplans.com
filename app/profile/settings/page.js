// app/profile/settings/page.js
import AliasCard from '@/components/AliasCard';

export const metadata = {
  title: 'Profile Settings • NinePlans',
};

export default function ProfileSettingsPage() {
  return (
    <div className="space-y-6">
      {/* Alias controls */}
      <AliasCard />

      {/* The rest of the profile summary boxes (consistent look with /profile) */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-neutral-800 bg-neutral-900/40 p-4">
          <div className="font-semibold">Your posts</div>
          <p className="mt-2 text-sm text-neutral-400">No posts yet.</p>
        </div>
        <div className="rounded-lg border border-neutral-800 bg-neutral-900/40 p-4">
          <div className="font-semibold">Liked</div>
          <p className="mt-2 text-sm text-neutral-400">No likes yet.</p>
        </div>
        <div className="rounded-lg border border-neutral-800 bg-neutral-900/40 p-4">
          <div className="font-semibold">Saved</div>
          <p className="mt-2 text-sm text-neutral-400">No saved posts yet.</p>
        </div>
        <div className="rounded-lg border border-neutral-800 bg-neutral-900/40 p-4">
          <div className="font-semibold">Comments</div>
          <p className="mt-2 text-sm text-neutral-400">No comments yet.</p>
        </div>
      </div>
    </div>
  );
}
