// components/LeftNav.jsx
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// If you already have these somewhere central, keep the single source of truth.
// Otherwise this inline list is fine and keeps the component self-contained.
export const CATEGORIES = [
  'Confessions','Posts','Product Reviews','Movie Reviews','Place Reviews','Post Ideas','Post Ads','Business Info',
  'Sports','Science','Automobile','Education','Anime','Technology','Travel','Food','Health','Finance','Fashion',
  'Books','Music','Gaming','Photography','Art','History','Relationships','Career','Pets','Gardening','DIY','Parenting','Fitness'
];

export const STATIC_PAGES = [
  { href: '/community', label: 'Community' },
  { href: '/faq',       label: 'FAQ' },
  { href: '/rules',     label: 'Rules' },
  { href: '/policy',    label: 'Policy' },
  { href: '/privacy',   label: 'Privacy' },
  { href: '/terms',     label: 'Terms' },
  { href: '/trademark', label: 'Trademark' },
];

function NavSectionTitle({ children }) {
  return (
    <div className="text-xs uppercase tracking-wide text-zinc-400 mb-3 select-none">
      {children}
    </div>
  );
}

function NavLink({ href, children }) {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <Link
      href={href}
      className={`block rounded-md px-3 py-2 text-sm transition-colors ${
        active
          ? 'bg-zinc-800 text-white'
          : 'text-zinc-300 hover:text-white hover:bg-zinc-800/60'
      }`}
    >
      {children}
    </Link>
  );
}

export default function LeftNav() {
  return (
    <aside className="sticky top-20 hidden lg:block w-64 shrink-0">
      <div className="space-y-8">
        {/* Navigate */}
        <div>
          <NavSectionTitle>NAVIGATE</NavSectionTitle>
          <div className="space-y-1">
            <NavLink href="/profile">Profile</NavLink>
          </div>
        </div>

        {/* Categories */}
        <div>
          <NavSectionTitle>CATEGORIES</NavSectionTitle>
          <div className="max-h-[52vh] overflow-y-auto pr-1 space-y-1">
            {CATEGORIES.map((c) => (
              <NavLink key={c} href={`/c/${encodeURIComponent(c.toLowerCase().replace(/\s+/g, '-'))}`}>
                {c}
              </NavLink>
            ))}
          </div>
        </div>

        <hr className="border-zinc-800" />

        {/* Static pages */}
        <div className="space-y-1">
          {STATIC_PAGES.map((p) => (
            <NavLink key={p.href} href={p.href}>
              {p.label}
            </NavLink>
          ))}
        </div>
      </div>
    </aside>
  );
}
