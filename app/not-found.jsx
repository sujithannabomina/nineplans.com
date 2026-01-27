// app/not-found.jsx
"use client";

import Shell from "@/components/Shell";
import Link from "next/link";

export default function NotFound() {
  return (
    <Shell>
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="text-xl font-semibold">Page not found</div>
        <p className="mt-2 text-sm text-gray-600">
          The page you tried to open doesn’t exist or has been moved.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <Link href="/" className="rounded-xl bg-black px-4 py-2 text-sm text-white hover:bg-gray-900">
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
    </Shell>
  );
}
