// components/Logo.jsx
import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <Image
        src="/logo-mark.png"
        alt="NinePlans"
        width={36}
        height={36}
        priority
        className="h-9 w-9 rounded-full border border-neutral-200 bg-white object-cover"
      />
      <span className="hidden sm:block text-base font-semibold tracking-tight">
        NinePlans
      </span>
      <span className="sr-only">NinePlans</span>
    </Link>
  );
}
