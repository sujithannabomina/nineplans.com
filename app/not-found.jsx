import Link from "next/link";
import Shell from "@/components/Shell";

export default function NotFound() {
  return (
    <Shell>
      <div className="card p-12 text-center">
        <div className="text-6xl mb-4">🌑</div>
        <h1 className="text-2xl font-bold text-white mb-2">Page Not Found</h1>
        <p className="text-white/50 text-sm mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Link href="/" className="rounded-full bg-white px-5 py-2 text-sm font-bold text-black hover:bg-neutral-200 transition">
            Go Home
          </Link>
          <Link href="/categories" className="rounded-full border border-white/20 px-5 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white transition">
            Browse Categories
          </Link>
          <Link href="/submit" className="rounded-full border border-white/20 px-5 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white transition">
            Create Post
          </Link>
        </div>
      </div>
    </Shell>
  );
}
