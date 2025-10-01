// components/LeftRail.jsx
import Link from 'next/link';
import { CATEGORIES, STATIC_PAGES } from './CategoryLinks';

export default function LeftRail() {
  return (
    <aside className="sticky top-20 hidden lg:block col-span-3">
      <nav className="space-y-8 text-sm">
        <div>
          <p className="mb-3 text-xs font-semibold text-zinc-400">NAVIGATE</p>
          <ul className="space-y-2">
            <li>
              <Link href="/profile" className="hover:underline">
                Profile
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold text-zinc-400">CATEGORIES</p>
          <div className="max-h-[60vh] overflow-y-auto pr-2">
            <ul className="space-y-2">
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link href={`/c/${c.slug}`} className="hover:underline">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-800 pt-6">
          <ul className="space-y-2">
            {STATIC_PAGES.map((p) => (
              <li key={p.href}>
                <Link href={p.href} className="hover:underline">
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </aside>
  );
}
