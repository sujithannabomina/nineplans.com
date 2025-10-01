// app/profile/page.js
export const dynamic = "force-dynamic";

export default function ProfilePage() {
  return (
    <div className="space-y-4">
      <section className="rounded-xl border border-neutral-800 bg-neutral-900 p-4">
        <div className="mb-2 text-lg font-semibold">Universe is Not Human Centric</div>
        <div className="text-sm text-neutral-400">0517supra@gmail.com</div>

        <div className="mt-3 flex gap-2">
          <a
            href="/profile/settings"
            className="rounded-md border border-neutral-700 px-3 py-1.5 hover:bg-neutral-800"
          >
            Settings
          </a>
          <a
            href="/api/auth/signout?callbackUrl=%2F"
            className="rounded-md bg-rose-600 px-3 py-1.5 text-white hover:bg-rose-500"
          >
            Sign out
          </a>
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-xl border border-neutral-800 bg-neutral-900 p-4">
          <div className="mb-2 font-semibold">Your posts</div>
          <div className="text-sm text-neutral-400">No posts yet.</div>
        </section>

        <section className="rounded-xl border border-neutral-800 bg-neutral-900 p-4">
          <div className="mb-2 font-semibold">Liked</div>
          <div className="text-sm text-neutral-400">No likes yet.</div>
        </section>

        <section className="rounded-xl border border-neutral-800 bg-neutral-900 p-4">
          <div className="mb-2 font-semibold">Saved</div>
          <div className="text-sm text-neutral-400">No saved posts yet.</div>
        </section>

        <section className="rounded-xl border border-neutral-800 bg-neutral-900 p-4">
          <div className="mb-2 font-semibold">Comments</div>
          <div className="text-sm text-neutral-400">No comments yet.</div>
        </section>
      </div>
    </div>
  );
}
