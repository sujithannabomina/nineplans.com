"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { CATEGORIES } from "@/lib/site";

export default function SubmitClient() {
  const { status } = useSession();
  const router = useRouter();
  const params = useSearchParams();

  const categories = useMemo(
    () => (CATEGORIES ?? []).map((c) => (typeof c === "string" ? c : c.name)),
    []
  );

  const [cat, setCat] = useState(
    params.get("cat") && categories.includes(params.get("cat"))
      ? params.get("cat")
      : categories[0] ?? "Confessions"
  );

  useEffect(() => {
    if (status === "unauthenticated") {
      // Send them to login and back to /submit afterwards
      router.push(`/login?next=${encodeURIComponent("/submit")}`);
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="rounded-md border border-zinc-800 bg-zinc-950/40 p-4 text-sm text-zinc-400">
        Checking session…
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="rounded-md border border-zinc-800 bg-zinc-950/40 p-4 text-sm text-zinc-300">
        You must be logged in to post.{" "}
        <button
          onClick={() => signIn("google", { callbackUrl: "/submit" })}
          className="ml-2 rounded border border-zinc-700 px-2 py-1 text-sm hover:bg-zinc-900"
        >
          Login with Google
        </button>
      </div>
    );
  }

  // …render your existing form here, using "cat" as the selected category.
  return (
    <div className="grid gap-4">
      <h1 className="text-3xl font-bold">Submit</h1>

      <label className="block text-sm text-zinc-300">
        Category
        <select
          className="mt-1 block w-full rounded-md border border-zinc-700 bg-black p-2 text-sm"
          value={cat}
          onChange={(e) => setCat(e.target.value)}
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>

      {/* TODO: your Title / Body fields and Post button */}
      <div className="rounded-md border border-zinc-800 bg-zinc-950/40 p-4 text-sm text-zinc-400">
        Form fields go here (title, body, etc.). Hook into Firestore as you had.
      </div>
    </div>
  );
}
