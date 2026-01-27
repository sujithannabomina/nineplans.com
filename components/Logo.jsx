import Image from "next/image";

/**
 * Brand logo: round mark + wordmark.
 *
 * Put these files inside /public (root):
 *  - /public/logo-mark.png
 *  - /public/logo-full.png
 */
export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      {/* Round mark */}
      <Image
        src="/logo-mark.png"
        alt="NinePlans"
        width={36}
        height={36}
        priority
        className="h-9 w-9 rounded-full border border-neutral-200 bg-white object-cover"
      />

      {/* Wordmark (hide on very small screens) */}
      <Image
        src="/logo-full.png"
        alt="NinePlans"
        width={180}
        height={36}
        priority
        className="hidden sm:block h-6 w-auto object-contain"
      />

      <span className="sr-only">NinePlans</span>
    </div>
  );
}
