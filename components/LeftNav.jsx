import Link from "next/link";

const cats = [
  "confessions","posts","product-reviews","movie-reviews","place-reviews","post-ideas","post-ads",
  "business-info","sports","science","automobile","education","anime","technology","travel","food",
  "health","finance","fashion","books","music","gaming","photography","art","history","relationships",
  "career","pets","gardening","diy","parenting","fitness"
];

export default function LeftNav() {
  return (
    <nav className="sticky top-[64px] space-y-4">
      {/* Navigate */}
      <div>
        <p className="mb-2 text-xs font-semibold text-zinc-400">NAVIGATE</p>
        <div className="space-y-2 text-sm">
          <Link href="/profile" className="block hover:underline">Profile</Link>
        </div>
      </div>

      {/* Categories */}
      <div>
        <p className="mb-2 text-xs font-semibold text-zinc-400">CATEGORIES</p>
        <div className="space-y-2 text-sm">
          {cats.map((slug) => (
            <Link
              key={slug}
              href={`/c/${slug}`}
              className="block hover:underline"
            >
              {slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
            </Link>
          ))}
        </div>
      </div>

      <div className="h-px bg-zinc-800" />

      {/* Static pages (kept compact) */}
      <div className="space-y-2 text-sm">
        {[
          ["/community","Community"],
          ["/faq","FAQ"],
          ["/rules","Rules"],
          ["/policy","Policy"],
          ["/privacy","Privacy"],
          ["/terms","Terms"],
          ["/trademark","Trademark"]
        ].map(([href,label]) => (
          <Link key={href} href={href} className="block hover:underline">
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
