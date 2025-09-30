"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

const categories = [
  "Confessions","Posts","Product Reviews","Movie Reviews","Place Reviews","Post Ideas","Post Ads","Business Info","Sports","Science","Automobile","Education","Anime","Technology","Travel","Food","Health","Finance","Fashion","Books","Music","Gaming","Photography","Art","History","Relationships","Career","Pets","Gardening","DIY","Parenting","Fitness"
];

export default function LeftNav() {
  const { data: session } = useSession();

  return (
    <div>
      <div className="nav-section-title">Navigate</div>

      {/* Remove Home/Top/Search/Submit here per your request */}
      <Link href="/profile" className="nav-item">
        {session?.user ? "Profile" : "Profile (login)"}
      </Link>

      <div className="nav-section-title">Categories</div>
      <ul className="space-y-1">
        {categories.map((c) => (
          <li key={c}>
            <Link href={`/c/${encodeURIComponent(c.toLowerCase().replace(/\s+/g, "-"))}`} className="nav-item">
              {c}
            </Link>
          </li>
        ))}
      </ul>

      <div className="hr" />

      <ul className="space-y-1">
        <li><Link href="/community" className="nav-item">Community</Link></li>
        <li><Link href="/faq" className="nav-item">FAQ</Link></li>
        <li><Link href="/rules" className="nav-item">Rules</Link></li>
        <li><Link href="/policy" className="nav-item">Policy</Link></li>
        <li><Link href="/privacy" className="nav-item">Privacy</Link></li>
        <li><Link href="/terms" className="nav-item">Terms</Link></li>
        <li><Link href="/trademark" className="nav-item">Trademark</Link></li>
      </ul>
    </div>
  );
}
