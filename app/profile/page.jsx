// app/profile/page.jsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { db } from "@/lib/db";
import {
  collection,
  doc,
  getDoc,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";

function PostCard({ post }) {
  return (
    <Link
      href={`/post/${post.id}`}
      className="block rounded-2xl border bg-white p-4 shadow-sm hover:shadow-md transition"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-base font-semibold">{post.title}</div>
          <div className="mt-1 text-sm text-gray-600 line-clamp-3">
            {post.body}
          </div>
        </div>
        <div className="text-xs text-gray-500">
          {post.categoryName || "General Posts"}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
        <div>
          {post.isAnonymous ? (
            <span className="rounded-full bg-gray-100 px-2 py-1">Anonymous</span>
          ) : (
            <span className="rounded-full bg-gray-100 px-2 py-1">
              {post.authorAlias || "User"}
            </span>
          )}
        </div>
        <div className="flex gap-3">
          <span>👍 {post.upvotes || 0}</span>
          <span>💬 {post.commentsCount || 0}</span>
          <span>👀 {post.views || 0}</span>
        </div>
      </div>
    </Link>
  );
}

async function hydratePostsByIds(ids) {
  const unique = Array.from(new Set(ids)).slice(0, 30);
  const docs = await Promise.all(
    unique.map(async (id) => {
      try {
        const snap = await getDoc(doc(db, "posts", id));
        if (!snap.exists()) return null;
        return { id: snap.id, ...snap.data() };
      } catch {
        return null;
      }
    })
  );
  return docs.filter(Boolean);
}

function safeTabFromUrl() {
  if (typeof window === "undefined") return "posts";
  const sp = new URLSearchParams(window.location.search);
  const t = (sp.get("tab") || "").toLowerCase().trim();
  const allowed = ["posts", "saved", "liked", "commented", "shared", "viewed"];
  return allowed.includes(t) ? t : "posts";
}

export default function ProfilePage() {
  const router = useRouter();

  // ✅ Make this page safe even if useAuth() returns null during prerender
  const auth = useAuth?.() || {};
  const user = auth.user || null;
  const userDoc = auth.userDoc || null;
  const loading = !!auth.loading;

  const [tab, setTab] = useState("posts");

  const [myPosts, setMyPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [commentedPosts, setCommentedPosts] = useState([]);
  const [sharedPosts, setSharedPosts] = useState([]);
  const [viewedPosts, setViewedPosts] = useState([]);

  // Init tab from URL + listen back/forward navigation
  useEffect(() => {
    const apply = () => setTab(safeTabFromUrl());
    apply();
    window.addEventListener("popstate", apply);
    return () => window.removeEventListener("popstate", apply);
  }, []);

  function goTab(next) {
    setTab(next);
    router.push(`/profile?tab=${next}`);
  }

  // My posts
  useEffect(() => {
    if (!user) return;

    const qy = query(
      collection(db, "posts"),
      where("authorUid", "==", user.uid),
      orderBy("createdAt", "desc"),
      limit(30)
    );

    const unsub = onSnapshot(
      qy,
      (snap) => {
        setMyPosts(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      },
      () => setMyPosts([])
    );

    return () => unsub();
  }, [user]);

  // Saved posts (users/{uid}/saves)
  useEffect(() => {
    if (!user) return;

    const savesRef = collection(db, "users", user.uid, "saves");
    const qy = query(savesRef, orderBy("createdAt", "desc"), limit(30));

    const unsub = onSnapshot(
      qy,
      async (snap) => {
        const ids = snap.docs.map((d) => d.id); // doc id == postId
        const hydrated = await hydratePostsByIds(ids);
        setSavedPosts(hydrated);
      },
      () => setSavedPosts([])
    );

    return () => unsub();
  }, [user]);

  // Liked posts (users/{uid}/votes where value == 1)
  useEffect(() => {
    if (!user) return;

    const votesRef = collection(db, "users", user.uid, "votes");
    const qy = query(votesRef, where("value", "==", 1), limit(30));

    const unsub = onSnapshot(
      qy,
      async (snap) => {
        const ids = snap.docs.map((d) => d.id); // doc id == postId
        const hydrated = await hydratePostsByIds(ids);
        setLikedPosts(hydrated);
      },
      () => setLikedPosts([])
    );

    return () => unsub();
  }, [user]);

  // Activity helpers (commented/shared/viewed) from users/{uid}/activity
  function listenActivity(type, setter) {
    if (!user) return () => {};
    const actRef = collection(db, "users", user.uid, "activity");
    const qy = query(
      actRef,
      where("type", "==", type),
      orderBy("createdAt", "desc"),
      limit(30)
    );

    return onSnapshot(
      qy,
      async (snap) => {
        const ids = snap.docs
          .map((d) => d.data()?.postId)
          .filter(Boolean)
          .slice(0, 30);
        const hydrated = await hydratePostsByIds(ids);
        setter(hydrated);
      },
      () => setter([])
    );
  }

  useEffect(() => {
    if (!user) return;
    const unsub = listenActivity("comment", setCommentedPosts);
    return () => unsub?.();
  }, [user]);

  useEffect(() => {
    if (!user) return;
    const unsub = listenActivity("share", setSharedPosts);
    return () => unsub?.();
  }, [user]);

  // Viewed activity may be empty unless you also record it when opening posts.
  useEffect(() => {
    if (!user) return;
    const unsub = listenActivity("view", setViewedPosts);
    return () => unsub?.();
  }, [user]);

  const displayName =
    userDoc?.name || user?.displayName || userDoc?.alias || "User";
  const email = userDoc?.email || user?.email || "";
  const phone = userDoc?.phone || "";

  const activeList = useMemo(() => {
    if (tab === "saved") return savedPosts;
    if (tab === "liked") return likedPosts;
    if (tab === "commented") return commentedPosts;
    if (tab === "shared") return sharedPosts;
    if (tab === "viewed") return viewedPosts;
    return myPosts;
  }, [tab, myPosts, savedPosts, likedPosts, commentedPosts, sharedPosts, viewedPosts]);

  const counts = {
    posts: myPosts.length,
    saved: savedPosts.length,
    liked: likedPosts.length,
    commented: commentedPosts.length,
    shared: sharedPosts.length,
    viewed: viewedPosts.length,
  };

  return (
    <>
      <div className="rounded-2xl border bg-white p-4 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-lg font-semibold">Profile</div>
            <div className="text-sm text-gray-600">
              Manage your info and your activity.
            </div>
          </div>

          <Link
            href="/profile/settings"
            className="rounded-xl bg-black px-4 py-2 text-sm text-white hover:bg-gray-900"
          >
            Settings
          </Link>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="rounded-2xl border bg-white p-4">
            <div className="text-xs font-semibold text-gray-500">Name</div>
            <div className="mt-1 text-sm font-medium text-gray-900">
              {loading ? "Loading…" : displayName}
            </div>
          </div>

          <div className="rounded-2xl border bg-white p-4">
            <div className="text-xs font-semibold text-gray-500">Phone</div>
            <div className="mt-1 text-sm font-medium text-gray-900">
              {loading ? "Loading…" : phone || "Not added"}
            </div>
            {!phone ? (
              <div className="mt-1 text-xs text-gray-500">
                Add phone in{" "}
                <Link className="underline" href="/profile/settings">
                  Settings
                </Link>
                .
              </div>
            ) : null}
          </div>

          <div className="rounded-2xl border bg-white p-4">
            <div className="text-xs font-semibold text-gray-500">Email</div>
            <div className="mt-1 text-sm font-medium text-gray-900">
              {loading ? "Loading…" : email || "Not available"}
            </div>
          </div>
        </div>

        {/* Tabs (works with /profile?tab=xxx) */}
        <div className="mt-4 flex flex-wrap gap-2">
          {[
            ["posts", "My Posts"],
            ["saved", "Saved"],
            ["liked", "Liked"],
            ["commented", "Commented"],
            ["shared", "Shared"],
            ["viewed", "Viewed"],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => goTab(key)}
              className={`rounded-xl px-3 py-2 text-sm border transition ${
                tab === key
                  ? "bg-black text-white border-black"
                  : "bg-white hover:bg-gray-50"
              }`}
            >
              {label} ({counts[key] ?? 0})
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 space-y-4">
        {!user ? (
          <div className="rounded-2xl border bg-white p-6 text-sm text-gray-600 shadow-sm">
            Please{" "}
            <Link className="underline" href="/login">
              login
            </Link>{" "}
            to view your profile.
          </div>
        ) : activeList?.length ? (
          activeList.map((p) => <PostCard key={p.id} post={p} />)
        ) : (
          <div className="rounded-2xl border bg-white p-6 text-sm text-gray-600 shadow-sm">
            Nothing here yet.
            <div className="text-xs text-gray-500 mt-1">
              Create a post from the Home page, or save/like/comment/share posts
              to see them here.
            </div>
          </div>
        )}
      </div>
    </>
  );
}
