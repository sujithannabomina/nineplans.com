// app/not-found.jsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <p className="mt-2 text-sm text-gray-600">
        The page you tried to open doesn’t exist or has been moved.
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        <Link
          href="/"
          className="rounded-xl bg-black px-4 py-2 text-sm text-white hover:bg-gray-900"
        >
          Go Home
        </Link>
        <Link href="/profile" className="rounded-xl border px-4 py-2 text-sm hover:bg-gray-50">
          Profile
        </Link>
        <Link href="/rules" className="rounded-xl border px-4 py-2 text-sm hover:bg-gray-50">
          Rules
        </Link>
        <Link href="/policy" className="rounded-xl border px-4 py-2 text-sm hover:bg-gray-50">
          Policy
        </Link>
        <Link href="/faq" className="rounded-xl border px-4 py-2 text-sm hover:bg-gray-50">
          FAQ
        </Link>
        <Link href="/contact" className="rounded-xl border px-4 py-2 text-sm hover:bg-gray-50">
          Contact
        </Link>
      </div>
    </div>
  );
}
