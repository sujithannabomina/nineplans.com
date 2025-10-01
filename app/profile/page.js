// app/profile/page.js
import LeftRail from "@/components/LeftRail";
import RightRailAd from "@/components/RightRailAd";
import ProfileHeader from "@/components/ProfileClient";
import Providers from "@/components/Providers";

export default function ProfilePage() {
  return (
    <Providers>
      <div className="mx-auto grid max-w-6xl grid-cols-12 gap-6 px-4 py-6">
        <aside className="col-span-12 hidden md:col-span-3 md:block">
          <LeftRail />
        </aside>

        <main className="col-span-12 space-y-6 md:col-span-6">
          <ProfileHeader />
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded border border-neutral-800 bg-neutral-950 p-4">
              <h3 className="mb-2 font-semibold">Your posts</h3>
              <p className="text-sm text-neutral-400">No posts yet.</p>
            </div>
            <div className="rounded border border-neutral-800 bg-neutral-950 p-4">
              <h3 className="mb-2 font-semibold">Liked</h3>
              <p className="text-sm text-neutral-400">No likes yet.</p>
            </div>
            <div className="rounded border border-neutral-800 bg-neutral-950 p-4">
              <h3 className="mb-2 font-semibold">Saved</h3>
              <p className="text-sm text-neutral-400">No saved posts yet.</p>
            </div>
            <div className="rounded border border-neutral-800 bg-neutral-950 p-4">
              <h3 className="mb-2 font-semibold">Comments</h3>
              <p className="text-sm text-neutral-400">No comments yet.</p>
            </div>
          </div>
        </main>

        <aside className="col-span-12 md:col-span-3">
          <RightRailAd />
        </aside>
      </div>
    </Providers>
  );
}
