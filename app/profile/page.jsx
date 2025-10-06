// app/profile/page.jsx
import LeftNav from '@/components/LeftNav';
import RightRailAd from '@/components/RightRailAd';
import ProfileClient from '@/components/ProfileClient';

export const dynamic = 'force-dynamic';

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex gap-6">
        <LeftNav />
        <main className="flex-1 min-w-0 space-y-4">
          <div className="rounded-xl border border-gray-800 bg-black/40 p-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold">Profile</h1>
              <div className="flex gap-2">
                <a href="/profile/settings" className="px-3 py-1 rounded-md border border-gray-700 hover:bg-gray-800">Settings</a>
                <a href="/submit" className="px-3 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-500">Write a post</a>
              </div>
            </div>
          </div>
          <ProfileClient />
        </main>
        <aside className="hidden xl:block w-72 shrink-0">
          <RightRailAd />
        </aside>
      </div>
    </div>
  );
}
