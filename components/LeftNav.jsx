// components/LeftNav.jsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";
import { listenCategories, seedDefaultCategoriesIfEmpty } from "@/lib/firestore";

const CATEGORY_ICONS = {
  confessions: "🤫",
  posts: "📝",
  "product-reviews": "🛍️",
  "movie-reviews": "🎬",
  "place-reviews": "📍",
  "post-ideas": "💡",
  "post-ads": "📢",
  "business-info": "💼",
  sports: "⚽",
  science: "🔬",
  automobile: "🚗",
  education: "📚",
  anime: "⛩️",
  games: "🎮",
  technology: "💻",
  "health-fitness": "💪",
  relationships: "❤️",
  "career-jobs": "👔",
  finance: "💰",
  "food-reviews": "🍜",
  travel: "✈️",
  "photography-art": "📸",
};

// Fix #4: active state uses neutral-800 bg + neutral-100 text instead of pure white bg
function NavItem({ href, icon, label, active }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm transition ${
        active
          ? "bg-neutral-700 text-neutral-100 font-medium"
          : "text-neutral-500 hover:bg-neutral-800/80 hover:text-neutral-300"
      }`}
    >
      <span className="text-base">{icon}</span>
      {label}
    </Link>
  );
}

// Fix #2: collapsible section component
function CollapsibleSection({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-1 py-1.5 text-xs font-bold uppercase tracking-widest text-neutral-600 hover:text-neutral-400 transition mb-0.5"
      >
        {title}
        {open
          ? <ChevronUp className="h-3 w-3" />
          : <ChevronDown className="h-3 w-3" />
        }
      </button>
      {open && <div className="space-y-0.5">{children}</div>}
    </div>
  );
}

export default function LeftNav() {
  const pathname = usePathname();
  const [categories, setCategories] = useState([]);
  const [catLoading, setCatLoading] = useState(true);

  useEffect(() => {
    let unsub = null;
    (async () => {
      try { await seedDefaultCategoriesIfEmpty(); } catch {}
      try {
        unsub = listenCategories((list) => {
          setCategories(Array.isArray(list) ? list : []);
          setCatLoading(false);
        });
      } catch {
        setCategories([]);
        setCatLoading(false);
      }
    })();
    return () => { try { unsub?.(); } catch {} };
  }, []);

  const topCats = useMemo(() => categories.slice(0, 14), [categories]);

  return (
    <div className="space-y-3 pb-8">

      {/* EXPLORE — always visible, no dropdown needed */}
      <div className="card p-3">
        <div className="section-title">Explore</div>
        <div className="space-y-0.5">
          <NavItem href="/" icon="🏠" label="Home" active={pathname === "/"} />
          <NavItem href="/?feed=trending" icon="🔥" label="Trending" active={false} />
          <NavItem href="/?feed=latest" icon="🆕" label="Latest" active={false} />
        </div>
      </div>

      {/* CATEGORIES — Fix #2: collapsible dropdown */}
      <div className="card p-3">
        <CollapsibleSection title="Categories" defaultOpen={false}>
          {catLoading ? (
            <div className="space-y-1.5 mt-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-8 rounded-xl bg-neutral-800 animate-pulse" />
              ))}
            </div>
          ) : (
            <>
              {topCats.map((c) => (
                <NavItem
                  key={c.id}
                  href={`/c/${c.slug}`}
                  icon={CATEGORY_ICONS[c.slug] || "📌"}
                  label={c.name}
                  active={pathname === `/c/${c.slug}`}
                />
              ))}
              <Link
                href="/categories"
                className="flex items-center gap-2.5 rounded-xl px-3 py-1.5 text-xs text-neutral-600 hover:text-neutral-400 transition"
              >
                <span>↗</span> View all categories
              </Link>
            </>
          )}
        </CollapsibleSection>
      </div>

      {/* MY ACTIVITY — Fix #2: collapsible dropdown */}
      <div className="card p-3">
        <CollapsibleSection title="My Activity" defaultOpen={false}>
          <NavItem href="/profile?tab=liked" icon="👍" label="Most Liked" active={false} />
          <NavItem href="/profile?tab=commented" icon="💬" label="Commented" active={false} />
          <NavItem href="/profile?tab=saved" icon="🔖" label="Saved" active={false} />
          <NavItem href="/profile?tab=viewed" icon="👀" label="Viewed" active={false} />
        </CollapsibleSection>
      </div>

      {/* NINEPLANS LEGAL */}
      <div className="card p-3">
        <div className="section-title">NinePlans</div>
        <div className="space-y-0.5">
          <NavItem href="/rules" icon="📋" label="Rules" active={pathname === "/rules"} />
          <NavItem href="/policy" icon="🛡️" label="Policy" active={pathname === "/policy"} />
          <NavItem href="/faq" icon="❓" label="FAQ" active={pathname === "/faq"} />
          <NavItem href="/terms" icon="📜" label="Terms" active={pathname === "/terms"} />
          <NavItem href="/privacy" icon="🔒" label="Privacy" active={pathname === "/privacy"} />
          <NavItem href="/contact" icon="✉️" label="Contact" active={pathname === "/contact"} />
        </div>
        <div className="mt-3 pt-3 border-t border-neutral-800 text-xs text-neutral-700 text-center">
          © {new Date().getFullYear()} NinePlans™
        </div>
      </div>

    </div>
  );
}