// components/Logo.jsx
import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3">
      {/* Round mark */}
      <Image
        src="/logo-circle-1024.png"
        alt="NinePlans logo"
        width={36}
        height={36}
        priority
        className="h-9 w-9 rounded-full border border-neutral-200 bg-white object-cover"
      />

      {/* Title + Tagline */}
      <div className="hidden sm:block leading-tight">
        <div className="text-sm font-semibold tracking-tight text-neutral-900">
          NinePlans
        </div>
        <div className="text-[11px] text-neutral-500">Post anonymous</div>
      </div>

      <span className="sr-only">NinePlans</span>
    </Link>
  );
}
