<<<<<<< HEAD
import Link from 'next/link';
import { CATEGORIES, STATIC_PAGES } from './CategoryLinks';

export default function LeftRail({ compact = false, onNavigate }) {
  const Section = ({ title, children }) => (
    <div className="mb-6">
      <div className="mb-2 text-xs uppercase tracking-wide text-zinc-400">{title}</div>
      <div className="space-y-1">
        {children}
      </div>
    </div>
  );

  const Item = ({ href, children }) => (
    <Link
      href={href}
      onClick={onNavigate}
      className="block rounded px-2 py-2 text-sm text-zinc-200 hover:bg-zinc-900 hover:text-white"
    >
      {children}
    </Link>
  );

  return (
    <div className={compact ? '' : 'sticky top-[calc(56px+40px)]'}>
      <Section title="Categories">
        {CATEGORIES.map(c => (
          <Item key={c.slug} href={c.href}>{c.name}</Item>
        ))}
      </Section>

      <div className="my-4 border-t border-zinc-800" />

      <Section title="Pages">
        {STATIC_PAGES.map(p => (
          <Item key={p.href} href={p.href}>{p.name}</Item>
        ))}
      </Section>
    </div>
  );
}
=======
import Link from 'next/link';
import { CATEGORIES, STATIC_PAGES } from './CategoryLinks';

export default function LeftRail({ compact = false, onNavigate }) {
  const Section = ({ title, children }) => (
    <div className="mb-6">
      <div className="mb-2 text-xs uppercase tracking-wide text-zinc-400">{title}</div>
      <div className="space-y-1">
        {children}
      </div>
    </div>
  );

  const Item = ({ href, children }) => (
    <Link
      href={href}
      onClick={onNavigate}
      className="block rounded px-2 py-2 text-sm text-zinc-200 hover:bg-zinc-900 hover:text-white"
    >
      {children}
    </Link>
  );

  return (
    <div className={compact ? '' : 'sticky top-[calc(56px+40px)]'}>
      <Section title="Categories">
        {CATEGORIES.map(c => (
          <Item key={c.slug} href={c.href}>{c.name}</Item>
        ))}
      </Section>

      <div className="my-4 border-t border-zinc-800" />

      <Section title="Pages">
        {STATIC_PAGES.map(p => (
          <Item key={p.href} href={p.href}>{p.name}</Item>
        ))}
      </Section>
    </div>
  );
}
>>>>>>> 724b0ef (Initial commit from local working folder)
