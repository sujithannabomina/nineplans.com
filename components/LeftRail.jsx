// components/LeftRail.jsx
import Link from "next/link";
import { CATEGORIES, STATIC_PAGES } from "./CategoryLinks";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function LeftRail() {
  const session = await getServerSession(authOptions);

  return (
    <aside className="hidden lg:block w-[260px]">
      <div className="sticky top-24 space-y-8">
        {/* Navigate */}
        <div>
          <h3 className="text-xs font-semibold tracking-wide text-zinc-400 mb-3">
            NAVIGATE
          </h3>
          <ul className="space-y-2">
            <li>
              <Link
                href={session ? "/profile" : "/login"}
                className="text-zinc-200 hover:text-white"
              >
                {session ? "Profile" : "Profile (login)"}
              </Link>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-xs font-semibold tracking-wide text-zinc-400 mb-3">
            CATEGORIES
          </h3>
          <div className="max-h-[48vh] overflow-y-auto pr-2">
            <ul className="space-y-2">
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/c/${c.slug}`}
                    className="text-zinc-200 hover:text-white"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-800" />

        {/* Pages */}
        <div>
          <ul className="space-y-2">
            {STATIC_PAGES.map((p) => (
              <li key={p.href}>
                <Link href={p.href} className="text-zinc-200 hover:text-white">
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}
