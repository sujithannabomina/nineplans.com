"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Shell from "@/components/Shell";
import PostCard from "@/components/PostCard";
import useAuth from "@/hooks/useAuth";
import { db } from "@/lib/db";
import { collection, doc, getDoc, limit, onSnapshot, orderBy, query, where } from "firebase/firestore";

async function hydratePostsByIds(ids) {
  const unique = Array.from(new Set(ids)).slice(0, 30);
  const docs = await Promise.all(
    unique.map(async (id) => {
      try {
        const snap = await getDoc(doc(db, "posts", id));
        return snap.exists() ? { id: snap.id, ...snap.data() } : null;
      } catch { return null; }
    })
  );
  return docs.filter(Boolean);
}

const TABS = [
  { key: "posts", label: "My Posts", icon: "📝" },
  { key: "liked", label: "Liked", icon: "👍" },
  { key: "saved", label: "Saved", icon: "🔖" },
  { key: "commented", label: "Commented", icon: "💬" },
  { key: "shared", label: "Shared", icon: "↗️" },
];

export default function ProfilePage() {
  const router = useRouter();
  const { user, userDoc, loading, login } = useAuth();
  const [tab, setTab] = useState("posts");
  const [lists, setLists] = useState({ posts: [], liked: [], saved: [], commented: [], shared: [] });

  function goTab(key) {
    setTab(key);
    router.push(`/profile?tab=${key}`, { scroll: false });
  }

  // My posts
  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "posts"), where("authorUid", "==", user.uid), orderBy("createdAt", "desc"), limit(30));
    const unsub = onSnapshot(q, (snap) => {
      setLists((l) => ({ ...l, posts: snap.docs.map((d) => ({ id: d.id, ...d.data() })) }));
    }, () => {});
    return () => unsub();
  }, [user]);

  // Saved
  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "users", user.uid, "saves"), orderBy("createdAt", "desc"), limit(30));
    const unsub = onSnapshot(q, async (snap) => {
      const hydrated = await hydratePostsByIds(snap.docs.map((d) => d.id));
      setLists((l) => ({ ...l, saved: hydrated }));
    }, () => {});
    return () => unsub();
  }, [user]);

  // Liked
  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "users", user.uid, "votes"), where("value", "==", 1), limit(30));
    const unsub = onSnapshot(q, async (snap) => {
      const hydrated = await hydratePostsByIds(snap.docs.map((d) => d.id));
      setLists((l) => ({ ...l, liked: hydrated }));
    }, () => {});
    return () => unsub();
  }, [user]);

  // Commented + Shared
  useEffect(() => {
    if (!user) return;
    const makeQ = (type) => query(collection(db, "users", user.uid, "activity"), where("type", "==", type), orderBy("createdAt", "desc"), limit(30));
    const unsub1 = onSnapshot(makeQ("comment"), async (snap) => {
      const ids = snap.docs.map((d) => d.data()?.postId).filter(Boolean);
      const hydrated = await hydratePostsByIds(ids);
      setLists((l) => ({ ...l, commented: hydrated }));
    }, () => {});
    const unsub2 = onSnapshot(makeQ("share"), async (snap) => {
      const ids = snap.docs.map((d) => d.data()?.postId).filter(Boolean);
      const hydrated = await hydratePostsByIds(ids);
      setLists((l) => ({ ...l, shared: hydrated }));
    }, () => {});
    return () => { unsub1(); unsub2(); };
  }, [user]);

  const activeList = lists[tab] || [];
  const displayName = userDoc?.name || user?.displayName || "User";
  const alias = userDoc?.alias || "";
  const email = userDoc?.email || user?.email || "";

  return (
    <Shell>
      {/* Profile header */}
      <div className="card p-5 mb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            {user?.photoURL ? (
              <img src={user.photoURL} alt="" className="h-14 w-14 rounded-full border-2 border-white/20" />
            ) : (
              <div className="h-14 w-14 rounded-full bg-white/10 flex items-center justify-center text-xl text-white/50">
                {displayName[0]?.toUpperCase() || "?"}
              </div>
            )}
            <div>
              <div className="text-lg font-bold text-white">{loading ? "Loading…" : displayName}</div>
              {alias && <div className="text-sm text-white/50">@{alias}</div>}
              <div className="text-xs text-white/30 mt-0.5">{email}</div>
            </div>
          </div>
          <Link
            href="/profile/settings"
            className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white transition"
          >
            ⚙️ Settings
          </Link>
        </div>

        {/* Stats row */}
        <div className="mt-4 grid grid-cols-5 gap-2">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => goTab(t.key)}
              className={`rounded-xl p-2 text-center transition ${
                tab === t.key ? "bg-white text-black" : "border border-white/10 text-white/60 hover:bg-white/10"
              }`}
            >
              <div className="text-base">{t.icon}</div>
              <div className="text-xs font-medium mt-0.5 truncate">{t.label}</div>
              <div className={`text-sm font-bold ${tab === t.key ? "text-black" : "text-white/80"}`}>
                {lists[t.key]?.length || 0}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {!user ? (
        <div className="card p-8 text-center">
          <div className="text-3xl mb-3">🔐</div>
          <p className="text-white/60 mb-4 text-sm">Sign in to view your profile and activity.</p>
          <button onClick={login} className="rounded-full bg-white px-6 py-2.5 text-sm font-bold text-black hover:bg-neutral-200 transition">
            Continue with Google
          </button>
        </div>
      ) : activeList.length ? (
        <div className="space-y-3">
          {activeList.map((p) => <PostCard key={p.id} post={p} />)}
        </div>
      ) : (
        <div className="card p-8 text-center">
          <div className="text-3xl mb-3">📭</div>
          <div className="text-sm text-white/50">Nothing here yet.</div>
          {tab === "posts" && (
            <Link href="/submit" className="mt-3 inline-block rounded-full bg-white px-5 py-2 text-sm font-bold text-black hover:bg-neutral-200 transition">
              Create your first post →
            </Link>
          )}
        </div>
      )}
    </Shell>
  );
}
