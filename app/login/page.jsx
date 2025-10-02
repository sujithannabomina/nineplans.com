// app/login/page.jsx
import PageShell from "@/components/PageShell";
import Link from "next/link";

export const metadata = { title: "Log in • NinePlans" };

export default function LoginPage() {
  return (
    <PageShell>
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
        <h1 className="text-xl font-semibold mb-2">Log in to NinePlans</h1>
        <p className="text-sm text-zinc-400 mb-4">
          You can still post using an Alias after logging in.
        </p>
        <Link
          href="/api/auth/signin/google"
          className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 hover:bg-blue-500"
        >
          Sign in with Google
        </Link>
      </div>
    </PageShell>
  );
}
