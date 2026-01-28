// components/Logo.jsx
"use client";

import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      {/* Mobile: mark only */}
      <span className="inline-flex md:hidden">
        <Image
          src="/logo-mark.png"
          alt="NinePlans"
          width={34}
          height={34}
          priority
        />
      </span>

      {/* Desktop: single logo (full) */}
      <span className="hidden md:inline-flex">
        <Image
          src="/logo-full.png"
          alt="NinePlans"
          width={42}
          height={42}
          priority
        />
      </span>
    </Link>
  );
}
