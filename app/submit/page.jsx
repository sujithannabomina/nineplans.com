// app/submit/page.jsx
import PageShell from "@/components/PageShell";
import SubmitClient from "@/components/SubmitClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const metadata = { title: "Submit • NinePlans" };

export default async function SubmitPage() {
  const session = await getServerSession(authOptions);

  return (
    <PageShell>
      {session ? (
        <SubmitClient userAlias={session.user?.alias ?? ""} />
      ) : (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
          <h1 className="text-xl font-semibold mb-2">Log in to write a post</h1>
          <p className="text-sm text-zinc-400 mb-4">
            You can still post using an Alias after logging in.
          </p>
          <a
            href="/api/auth/signin/google"
            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 hover:bg-blue-500"
          >
            Sign in with Google
          </a>
        </div>
      )}
    </PageShell>
  );
}
