// components/LeftNav.jsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signIn } from 'next-auth/react';
import { CATEGORIES, STATIC_PAGES } from './CategoryLinks';

export default function LeftNav() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const Item = ({ href, children }) => (
    <Link
      href={href}
      className={`block rounded-md px-3 py-2 hover:bg-gray-800/60 ${
        pathname === href ? 'bg-gray-800/70 text-white' : 'text-gray-300'
      }`}
    >
      {children}
    </Link>
  );

  return (
    <aside className="hidden lg:block w-64 shrink-0 sticky top-20 self-start">
      <div className="text-sm text-gray-400 mb-2">NAVIGATE</div>
      <div className="mb-6">
        {status === 'authenticated' ? (
          <Item href="/profile">Profile</Item>
        ) : (
          <button
            onClick={() => signIn('google')}
            className="block w-full rounded-md px-3 py-2 text-left bg-gray-800/60 hover:bg-gray-800/80 text-gray-200"
          >
            Profile (login)
          </button>
        )}
      </div>

      <div className="text-sm text-gray-400 mb-2">CATEGORIES</div>
      <div className="space-y-1 max-h-[55vh] overflow-y-auto pr-1">
        {CATEGORIES.map(({ name }) => (
          <Item key={name} href={`/c/${encodeURIComponent(name.toLowerCase().replace(/\s+/g, '-'))}`}>
            {name}
          </Item>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-800 space-y-1">
        {STATIC_PAGES.map(p => (
          <Item key={p.href} href={p.href}>{p.name}</Item>
        ))}
      </div>
    </aside>
  );
}
