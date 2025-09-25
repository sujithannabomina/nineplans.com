import Link from "next/link";

export default function NotFound() {
  return (
    <div className="px-4 py-10 text-center">
      <h1 className="text-2xl font-semibold mb-2">404 — Not Found</h1>
      <p className="text-zinc-400">We couldn’t find that page.</p>
      <div className="mt-6">
        <Link href="/" className="button">Go Home</Link>
      </div>
    </div>
  );
}
