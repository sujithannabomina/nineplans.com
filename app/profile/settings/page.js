// app/profile/settings/page.js
import LeftRail from "@/components/LeftRail";
import RightRailAd from "@/components/RightRailAd";
import ProfileHeader from "@/components/ProfileClient"; // reuse header block
import Providers from "@/components/Providers";

export const runtime = "nodejs";

async function readProfile(uid) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/profile`, {
    headers: { "x-user-id": uid || "" },
    cache: "no-store",
  });
  const json = await res.json();
  return json?.profile || { alias: "" };
}

export default async function ProfileSettingsPage() {
  // NOTE: In your app, you already have session fetching.
  // Keep this compatible by reading a cookie you set, or pass UID via middleware.
  const uid = ""; // leave empty here; client will still PATCH with header if set.
  const profile = await readProfile(uid);

  return (
    <Providers>
      <div className="mx-auto grid max-w-6xl grid-cols-12 gap-6 px-4 py-6">
        <aside className="col-span-12 hidden md:col-span-3 md:block">
          <LeftRail />
        </aside>

        <main className="col-span-12 md:col-span-6 space-y-6">
          <ProfileHeader />

          <section className="rounded border border-neutral-800 bg-neutral-950 p-4">
            <h2 className="mb-3 text-lg font-semibold">Settings</h2>
            <AliasForm initialAlias={profile.alias || ""} />
          </section>

          {/* Empty blocks to keep page height consistent */}
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

function AliasForm({ initialAlias }) {
  return (
    <form className="space-y-3" action="/api/profile" method="post" onSubmit={saveAlias}>
      <label className="block text-sm text-neutral-300">Alias</label>
      <input
        name="alias"
        defaultValue={initialAlias}
        maxLength={24}
        className="w-full rounded border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm"
        placeholder="e.g., Blue Comet"
      />
      <p className="text-xs text-neutral-400">Changes affect future posts/comments. Old alias stays on old posts.</p>
      <button type="submit" className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white">
        Save
      </button>
    </form>
  );
}

async function saveAlias(e) {
  e.preventDefault();
  const form = e.currentTarget;
  const alias = new FormData(form).get("alias");

  try {
    const res = await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ alias }),
    });
    const json = await res.json();
    if (!json.ok) throw new Error(json.error || "Failed");
    alert("Saved!");
  } catch (err) {
    console.error(err);
    alert("Could not save alias");
  }
}
