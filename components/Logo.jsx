// components/Logo.jsx
"use client";

import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 shrink-0">
      {/*
        logo.png = your 9P mark on a light circle (#e5e5e5 bg, dark marks)
        This is ALWAYS clearly visible on the dark website header at any size
        We use this for both mobile and desktop — just different sizes
      */}

      {/* Mobile: 32px logo only, no text */}
      <span className="inline-flex md:hidden">
        <Image
          src="/logo.png"
          alt="NinePlans"
          width={32}
          height={32}
          className="rounded-full"
          priority
        />
      </span>

      {/* Desktop: 36px logo + light text */}
      <span className="hidden md:inline-flex items-center gap-2">
        <Image
          src="/logo.png"
          alt="NinePlans"
          width={36}
          height={36}
          className="rounded-full"
          priority
        />
        {/* Light font — not bold, clean */}
        <span className="text-[15px] font-light tracking-wide text-neutral-300">
          Nine<span className="font-normal text-neutral-100">Plans</span>
        </span>
      </span>
    </Link>
  );
}