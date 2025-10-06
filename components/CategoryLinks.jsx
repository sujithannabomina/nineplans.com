// components/CategoryLinks.jsx
import Link from 'next/link';

// Single source of truth for categories shown in the left rail and elsewhere.
export const CATEGORIES = [
  { slug: 'confessions', label: 'Confessions' },
  { slug: 'posts', label: 'Posts' },
  { slug: 'product-reviews', label: 'Product Reviews' },
  { slug: 'movie-reviews', label: 'Movie Reviews' },
  { slug: 'place-reviews', label: 'Place Reviews' },
  { slug: 'post-ideas', label: 'Post Ideas' },
  { slug: 'post-ads', label: 'Post Ads' },
  { slug: 'business-info', label: 'Business Info' },
  { slug: 'sports', label: 'Sports' },
  { slug: 'science', label: 'Science' },
  { slug: 'automobile', label: 'Automobile' },
  { slug: 'education', label: 'Education' },
  { slug: 'anime', label: 'Anime' },
  { slug: 'technology', label: 'Technology' },
  { slug: 'travel', label: 'Travel' },
  { slug: 'food', label: 'Food' },
  { slug: 'health', label: 'Health' },
  { slug: 'finance', label: 'Finance' },
  { slug: 'fashion', label: 'Fashion' },
];

// Static pages list (what you’re showing under “Community” in the left nav)
export const STATIC_PAGES = [
  { href: '/community', label: 'Community' },
  { href: '/faq',       label: 'FAQ' },
  { href: '/rules',     label: 'Rules' },
  { href: '/policy',    label: 'Policy' },
  { href: '/privacy',   label: 'Privacy' },
  { href: '/terms',     label: 'Terms' },
  { href: '/trademark', label: 'Trademark' },
];

// NEW: helper used by app/c/[slug]/page.js
export function getCategoryBySlug(slug) {
  return CATEGORIES.find((c) => c.slug === slug) || null;
}

// Optional small renderer (if you’re already using a separate LeftNav/LeftRail, keep those components)
export default function CategoryLinks() {
  return (
    <nav className="space-y-2">
      <div className="text-xs uppercase tracking-wide text-neutral-400 mb-2">Categories</div>
      <ul className="space-y-2">
        {CATEGORIES.map(({ slug, label }) => (
          <li key={slug}>
            <Link href={`/c/${slug}`} className="hover:underline">
              {label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-6 text-xs uppercase tracking-wide text-neutral-400 mb-2">Community</div>
      <ul className="space-y-2">
        {STATIC_PAGES.map(({ href, label }) => (
          <li key={href}>
            <Link href={href} className="hover:underline">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
