// components/LeftNav.jsx
"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { CATEGORIES, STATIC_LINKS, categoryHref } from "@/lib/site";

export default function LeftNav() {
  const pathname = usePathname();
  const params = useSearchParams();
  const cat = params?.get("cat") || "";

  return (
    <nav
      aria-label="Sidebar"
      className="hidden lg:block w-64 shrink-0"
    >
      <div className="sticky top-16 max-h-[calc(100vh-4rem)] overflow-y-auto pr-2">
        <Section title="Categories">
          <ul className="space-y-1">
            {CATEGORIES.map((name) => {
              const active = pathname === "/post" && cat === name;
              return (
                <li key={name}>
                  <Link
                    href={categoryHref(name)}
                    className={`block rounded-md px-3 py-2 text-sm transition ${
                      active
                        ? "bg-white/10 text-white"
                        : "text-zinc-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </Section>

        <div className="mt-6 border-t border-white/10 pt-4">
          <Section title="Pages">
            <ul className="space-y-1">
              {STATIC_LINKS.map((l) => {
                const active = l.href === pathname;
                return (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className={`block rounded-md px-3 py-2 text-sm transition ${
                        active
                          ? "bg-white/10 text-white"
                          : "text-zinc-300 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {l.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Section>
        </div>
      </div>
    </nav>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-4">
      <div className="px-3 pb-2 text-xs font-semibold uppercase tracking-wide text-zinc-400">
        {title}
      </div>
      {children}
    </div>
  );
}
