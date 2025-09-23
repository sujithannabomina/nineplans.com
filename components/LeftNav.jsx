import Link from "next/link";

const CAT = [
  "Confessions","Posts","Product Reviews","Movie Reviews","Place Reviews",
  "Post Ideas","Post Ads","Business Info","Sports","Science","Automobile",
  "Education","Anime","Games",
];

export default function LeftNav() {
  return (
    <div className="py-4">
      <div className="mb-3 text-xs uppercase text-white/40 px-2">Categories</div>
      <nav className="flex flex-col">
        {CAT.map((c) => (
          <Link
            key={c}
            href={`/post?cat=${encodeURIComponent(c)}`}
            className="px-2 py-2 rounded hover:bg-white/5"
          >
            {c}
          </Link>
        ))}
      </nav>

      <div className="mt-6 border-t border-white/10 pt-4">
        <div className="mb-3 text-xs uppercase text-white/40 px-2">Pages</div>
        <nav className="flex flex-col">
          <Link href="/community" className="px-2 py-2 rounded hover:bg-white/5">Community</Link>
          <Link href="/faq" className="px-2 py-2 rounded hover:bg-white/5">FAQ</Link>
          <Link href="/policy" className="px-2 py-2 rounded hover:bg-white/5">Policy</Link>
          <Link href="/terms" className="px-2 py-2 rounded hover:bg-white/5">Terms</Link>
          <Link href="/trademark" className="px-2 py-2 rounded hover:bg-white/5">Trademark</Link>
          <Link href="/privacy" className="px-2 py-2 rounded hover:bg-white/5">Privacy</Link>
        </nav>
      </div>
    </div>
  );
}
