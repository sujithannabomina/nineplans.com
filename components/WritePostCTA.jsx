<<<<<<< HEAD
"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function WritePostCTA() {
  const sp = useSearchParams();
  const cat = sp.get("cat") || "Confessions";
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-semibold">Recent Posts {cat ? `— ${cat}` : ""}</h2>
      <Link
        href={`/submit?cat=${encodeURIComponent(cat)}`}
        className="rounded-xl border border-zinc-700 px-4 py-2 hover:bg-zinc-900"
      >
        Write in {cat}
      </Link>
    </div>
  );
}
=======
"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function WritePostCTA() {
  const sp = useSearchParams();
  const cat = sp.get("cat") || "Confessions";
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-semibold">Recent Posts {cat ? `— ${cat}` : ""}</h2>
      <Link
        href={`/submit?cat=${encodeURIComponent(cat)}`}
        className="rounded-xl border border-zinc-700 px-4 py-2 hover:bg-zinc-900"
      >
        Write in {cat}
      </Link>
    </div>
  );
}
>>>>>>> 724b0ef (Initial commit from local working folder)
