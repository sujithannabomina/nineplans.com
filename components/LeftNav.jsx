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

// Active: neutral-700 bg, neutral-100 text. Matches softer theme.
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
      <span className="text-base leading-none">{icon}</span>
      <span className="leading-none">{label}</span>
    </Link>
  );
}

// Collapsible section — children always mounted so Firestore loads immediately
function CollapsibleSection({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-bold uppercase tracking-widest text-neutral-600 hover:text-neutral-400 hover:bg-neutral-800/50 transition"
      >
        {title}
        {open ? <ChevronUp className="h-3 w-3 shrink-0" /> : <ChevronDown className="h-3 w-3 shrink-0" />}
      </button>

      {/* 
        KEY FIX: children are always mounted (not conditional on open)
        This means listenCategories fires immediately on page load
        We only toggle visibility with CSS
      */}
      <div className={`space-y-0.5 mt-0.5 overflow-hidden transition-all duration-200 ${open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}>
        {children}
      </div>
    </div>
  );
}

export default function LeftNav() {
  const pathname = usePathname();
  const [categories, setCategories] = useState([]);
  const [catLoading, setCatLoading] = useState(true);

  // Load categories on mount — always, regardless of dropdown state
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

  // Show ALL categories in the dropdown (not just top 10)
  const allCats = useMemo(() => categories, [categories]);

  return (
    <div className="space-y-2 pb-8">

      {/* EXPLORE — always expanded, no toggle needed */}
      <div className="card p-2">
        <p className="section-title px-3 pt-1">Explore</p>
        <div className="space-y-0.5">
          <NavItem href="/" icon="🏠" label="Home" active={pathname === "/"} />
          <NavItem href="/?feed=trending" icon="🔥" label="Trending" active={false} />
          <NavItem href="/?feed=latest" icon="🆕" label="Latest" active={false} />
        </div>
      </div>

      {/* CATEGORIES — collapsible, full list */}
      <div className="card p-2">
        <CollapsibleSection title="Categories" defaultOpen={false}>
          {catLoading ? (
            <div className="space-y-1 px-1 py-1">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-8 rounded-xl bg-neutral-800 animate-pulse" />
              ))}
            </div>
          ) : allCats.length === 0 ? (
            <div className="px-3 py-2 text-xs text-neutral-600">No categories yet.</div>
          ) : (
            <>
              {allCats.map((c) => (
                <NavItem
                  key={c.id}
                  href={`/c/${c.slug}`}
                  icon={CATEGORY_ICONS[c.slug] || "📌"}
                  label={c.name}
                  active={pathname === `/c/${c.slug}`}
                />
              ))}
              <div className="border-t border-neutral-800 mt-1 pt-1">
                <Link
                  href="/categories"
                  className="flex items-center gap-2.5 rounded-xl px-3 py-1.5 text-xs text-neutral-600 hover:text-neutral-400 transition"
                >
                  ↗ View all categories page
                </Link>
              </div>
            </>
          )}
        </CollapsibleSection>
      </div>

      {/* MY ACTIVITY — collapsible */}
      <div className="card p-2">
        <CollapsibleSection title="My Activity" defaultOpen={false}>
          <NavItem href="/profile?tab=liked"     icon="👍" label="Most Liked" active={false} />
          <NavItem href="/profile?tab=commented" icon="💬" label="Commented"  active={false} />
          <NavItem href="/profile?tab=saved"     icon="🔖" label="Saved"      active={false} />
          <NavItem href="/profile?tab=viewed"    icon="👀" label="Viewed"     active={false} />
        </CollapsibleSection>
      </div>

      {/* NINEPLANS LEGAL */}
      <div className="card p-2">
        <p className="section-title px-3 pt-1">NinePlans</p>
        <div className="space-y-0.5">
          <NavItem href="/rules"   icon="📋" label="Rules"   active={pathname === "/rules"} />
          <NavItem href="/policy"  icon="🛡️" label="Policy"  active={pathname === "/policy"} />
          <NavItem href="/faq"     icon="❓" label="FAQ"     active={pathname === "/faq"} />
          <NavItem href="/terms"   icon="📜" label="Terms"   active={pathname === "/terms"} />
          <NavItem href="/privacy" icon="🔒" label="Privacy" active={pathname === "/privacy"} />
          <NavItem href="/contact" icon="✉️" label="Contact" active={pathname === "/contact"} />
        </div>
        <div className="mt-2 pt-2 border-t border-neutral-800 text-[10px] text-neutral-700 text-center pb-1">
          © {new Date().getFullYear()} NinePlans™
        </div>
      </div>

    </div>
  );
}