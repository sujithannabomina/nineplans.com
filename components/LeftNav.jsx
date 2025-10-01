// components/LeftNav.jsx
import Link from 'next/link';

const categories = [
  'Confessions','Posts','Product Reviews','Movie Reviews','Place Reviews','Post Ideas','Post Ads','Business Info',
  'Sports','Science','Automobile','Education','Anime','Technology','Travel','Food','Health','Finance','Fashion',
  'Books','Music','Gaming','Photography','Art','History','Relationships','Career','Pets','Gardening','DIY',
  'Parenting','Fitness'
];

const staticPages = [
  { href: '/community', label: 'Community' },
  { href: '/faq', label: 'FAQ' },
  { href: '/rules', label: 'Rules' },
  { href: '/policy', label: 'Policy' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
  { href: '/trademark', label: 'Trademark' },
];

export default function LeftNav() {
  return (
    <nav className="text-sm">
      <div className="mb-6">
        <div className="mb-2 text-[11px] uppercase tracking-widest text-neutral-400">Navigate</div>
        <ul className="space-y-1">
          <li>
            <Link href="/profile" className="block rounded-md px-3 py-2 hover:bg-neutral-900">
              Profile
            </Link>
          </li>
        </ul>
      </div>

      <div className="mb-6">
        <div className="mb-2 text-[11px] uppercase tracking-widest text-neutral-400">Categories</div>
        <ul className="space-y-1">
          {categories.map((label) => {
            const slug = label.toLowerCase().replace(/\s+/g, '-');
            return (
              <li key={slug}>
                <Link href={`/c/${slug}`} className="block rounded-md px-3 py-2 hover:bg-neutral-900">
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <hr className="mb-6 border-neutral-800" />

      <div className="mb-6">
        <ul className="space-y-1">
          {staticPages.map((p) => (
            <li key={p.href}>
              <Link href={p.href} className="block rounded-md px-3 py-2 hover:bg-neutral-900">
                {p.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
