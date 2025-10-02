// app/profile/settings/page.jsx
import PageShell from "@/components/PageShell";
import AliasCard from "@/components/AliasCard";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export const metadata = { title: "Settings • NinePlans" };

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  // If your session includes alias, pass it down
  const initialAlias = session.user?.alias ?? "";

  return (
    <PageShell>
      <AliasCard initialAlias={initialAlias} />
      {/* Keep your four profile cards for Posts/Likes/Saved/Comments if desired */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
          <h3 className="font-semibold mb-1">Your posts</h3>
          <p className="text-sm text-zinc-400">No posts yet.</p>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
          <h3 className="font-semibold mb-1">Liked</h3>
          <p className="text-sm text-zinc-400">No likes yet.</p>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
          <h3 className="font-semibold mb-1">Saved</h3>
          <p className="text-sm text-zinc-400">No saved posts yet.</p>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
          <h3 className="font-semibold mb-1">Comments</h3>
          <p className="text-sm text-zinc-400">No comments yet.</p>
        </div>
      </div>
    </PageShell>
  );
}
