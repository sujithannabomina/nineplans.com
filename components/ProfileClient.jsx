"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const tabs = ["Posted", "Liked", "Commented", "Saved"];

export default function ProfileClient() {
  const [active, setActive] = useState("Posted");
  const [data, setData] = useState({
    posted: [],
    liked: [],
    commented: [],
    saved: [],
  });

  useEffect(() => {
    (async () => {
      const r = await fetch("/api/profile/interactions");
      const j = await r.json();
      setData(j);
    })();
  }, []);

  const list =
    active === "Posted"
      ? data.posted
      : active === "Liked"
      ? data.liked
      : active === "Commented"
      ? data.commented
      : data.saved;

  return (
    <div className="rounded-lg border border-zinc-800">
      <div className="flex flex-wrap gap-2 border-b border-zinc-800 p-3">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActive(t)}
            className={`rounded-md px-3 py-1.5 text-sm ${
              active === t
                ? "bg-zinc-800 text-zinc-100"
                : "text-zinc-300 hover:bg-zinc-800/60"
            }`}
          >
            {t}
          </button>
        ))}
        <Link
          href="/profile/settings"
          className="ml-auto rounded-md border border-zinc-700 px-3 py-1.5 text-sm text-zinc-300 hover:bg-zinc-800"
        >
          Settings
        </Link>
      </div>

      <div className="p-4">
        {list.length === 0 ? (
          <div className="text-zinc-400">Nothing here yet.</div>
        ) : (
          <ul className="space-y-2">
            {list.map((p) => (
              <li key={p.id} className="rounded-md border border-zinc-800 p-3">
                <Link href={`/post/${p.id}`} className="text-sky-300 hover:underline">
                  {p.title}
                </Link>
                <div className="text-xs text-zinc-500">{p.category}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
