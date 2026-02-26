// components/Logo.jsx
"use client";

import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 shrink-0">
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

      {/* Desktop: full logo + light text */}
      <span className="hidden md:inline-flex items-center gap-2">
        <Image
          src="/logo-full.png"
          alt="NinePlans"
          width={38}
          height={38}
          priority
        />
        {/* Fix #3: light font weight, not bold */}
        <span className="text-[15px] font-light tracking-wide text-neutral-300">
          Nine<span className="font-normal text-neutral-200">Plans</span>
        </span>
      </span>
    </Link>
  );
}