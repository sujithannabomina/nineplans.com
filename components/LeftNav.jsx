"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, TrendingUp, Clock, LayoutGrid, HelpCircle, Shield, FileText, Mail } from "lucide-react";
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

  const topCats = useMemo(() => categories.slice(0, 10), [categories]);

  const navLink = (href, label, icon) => {
    const active = pathname === href || (href !== "/" && pathname.startsWith(href));
    return (
      <Link
        key={href}
        href={href}
        className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm transition ${
          active ? "bg-white text-black font-semibold" : "text-white/70 hover:bg-white/10 hover:text-white"
        }`}
      >
        <span className="text-base">{icon}</span>
        {label}
      </Link>
    );
  };

  return (
    <div className="space-y-3">
      {/* Explore */}
      <div className="card p-3">
        <div className="section-title">Explore</div>
        <div className="space-y-0.5">
          {navLink("/", "Home", "🏠")}
          {navLink("/?feed=trending", "Trending", "🔥")}
          {navLink("/?feed=latest", "Latest", "🆕")}
        </div>
      </div>

      {/* Categories */}
      <div className="card p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="section-title mb-0">Categories</div>
          <Link href="/categories" className="text-xs text-white/40 hover:text-white transition">
            All →
          </Link>
        </div>

        {catLoading ? (
          <div className="space-y-1.5">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-8 rounded-xl bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="space-y-0.5">
            {topCats.map((c) => (
              <Link
                key={c.id}
                href={`/c/${c.slug}`}
                className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm transition ${
                  pathname === `/c/${c.slug}` ? "bg-white text-black font-semibold" : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span>{CATEGORY_ICONS[c.slug] || "📌"}</span>
                {c.name}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Most popular shortcuts */}
      <div className="card p-3">
        <div className="section-title">My Activity</div>
        <div className="space-y-0.5">
          {navLink("/profile?tab=liked", "Most Liked", "👍")}
          {navLink("/profile?tab=commented", "Commented", "💬")}
          {navLink("/profile?tab=saved", "Saved", "🔖")}
          {navLink("/profile?tab=viewed", "Viewed", "👀")}
        </div>
      </div>

      {/* Legal / Policy */}
      <div className="card p-3">
        <div className="section-title">NinePlans</div>
        <div className="space-y-0.5">
          {navLink("/rules", "Rules", "📋")}
          {navLink("/policy", "Policy", "🛡️")}
          {navLink("/faq", "FAQ", "❓")}
          {navLink("/terms", "Terms", "📜")}
          {navLink("/privacy", "Privacy", "🔒")}
          {navLink("/contact", "Contact", "✉️")}
        </div>
        <div className="mt-3 pt-3 border-t border-white/10 text-xs text-white/25 text-center">
          © {new Date().getFullYear()} NinePlans™
        </div>
      </div>
    </div>
  );
}
