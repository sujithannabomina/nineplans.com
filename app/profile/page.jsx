"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Shell from "@/components/Shell";
import PostCard from "@/components/PostCard";
import useAuth from "@/hooks/useAuth";
import { timeAgo } from "@/lib/utils";
import { db } from "@/lib/db";
import {
  collection, query, where, orderBy,
  getDocs, limit, doc, getDoc
} from "firebase/firestore";
import {
  Settings, Grid3X3, Heart, Bookmark,
  MessageCircle, Eye, Calendar, MapPin,
  UserCircle2, Loader2
} from "lucide-react";

const TABS = [
  { key: "posts",     label: "Posts",     icon: Grid3X3 },
  { key: "liked",     label: "Liked",     icon: Heart },
  { key: "saved",     label: "Saved",     icon: Bookmark },
  { key: "commented", label: "Commented", icon: MessageCircle },
];

async function fetchTabPosts(tab, uid) {
  if (!uid) return [];
  try {
    if (tab === "posts") {
      // Only show non-anonymous posts on profile
      const q = query(
        collection(db, "posts"),
        where("authorUid", "==", uid),
        where("isAnonymous", "==", false),
        where("status", "==", "active"),
        orderBy("createdAt", "desc"),
        limit(20)
      );
      const snap = await getDocs(q);
      return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    }

    if (tab === "liked") {
      const votesQ = query(
        collection(db, "votes"),
        where("uid", "==", uid),
        where("vote", "==", 1),
        orderBy("updatedAt", "desc"),
        limit(20)
      );
      const votesSnap = await getDocs(votesQ);
      const postIds = votesSnap.docs.map((d) => d.data().postId).filter(Boolean);
      return fetchPostsByIds(postIds);
    }

    if (tab === "saved") {
      const savesQ = query(
        collection(db, `users/${uid}/saves`),
        orderBy("savedAt", "desc"),
        limit(20)
      );
      const savesSnap = await getDocs(savesQ);
      const postIds = savesSnap.docs.map((d) => d.id);
      return fetchPostsByIds(postIds);
    }

    if (tab === "commented") {
      // Get unique post IDs the user commented on
      // Search across all posts' comment subcollections is expensive,
      // so we store a comments_made collection on the user
      const q = query(
        collection(db, `users/${uid}/activity`),
        where("type", "==", "comment"),
        orderBy("createdAt", "desc"),
        limit(20)
      );
      const snap = await getDocs(q);
      const postIds = [...new Set(snap.docs.map((d) => d.data().postId).filter(Boolean))];
      return fetchPostsByIds(postIds);
    }
  } catch (e) {
    console.error(e);
  }
  return [];
}

async function fetchPostsByIds(ids) {
  if (!ids.length) return [];
  const results = await Promise.all(
    ids.map(async (id) => {
      try {
        const snap = await getDoc(doc(db, "posts", id));
        return snap.exists() ? { id: snap.id, ...snap.data() } : null;
      } catch { return null; }
    })
  );
  return results.filter(Boolean);
}

function StatBox({ value, label }) {
  return (
    <div className="text-center">
      <div className="text-lg font-bold text-white">{value ?? 0}</div>
      <div className="text-xs text-white/40">{label}</div>
    </div>
  );
}

function ProfilePageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, userDoc, loading: authLoading } = useAuth();

  const activeTab = searchParams.get("tab") || "posts";
  const [posts, setPosts]       = useState([]);
  const [postLoading, setPostLoading] = useState(true);
  const [stats, setStats]       = useState({ posts: 0, liked: 0, saved: 0 });

  useEffect(() => {
    if (!user?.uid) return;
    setPostLoading(true);
    fetchTabPosts(activeTab, user.uid).then((list) => {
      setPosts(list);
      setPostLoading(false);
    });
  }, [activeTab, user?.uid]);

  useEffect(() => {
    if (!user?.uid) return;
    // Fetch rough stats
    Promise.all([
      getDocs(query(collection(db, "posts"), where("authorUid", "==", user.uid), where("isAnonymous", "==", false))),
      getDocs(query(collection(db, "votes"), where("uid", "==", user.uid), where("vote", "==", 1))),
    ]).then(([postsSnap, likesSnap]) => {
      setStats({ posts: postsSnap.size, liked: likesSnap.size });
    }).catch(() => {});
  }, [user?.uid]);

  if (authLoading) {
    return (
      <Shell>
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-6 w-6 animate-spin text-white/40" />
        </div>
      </Shell>
    );
  }

  if (!user) {
    return (
      <Shell>
        <div className="card p-10 text-center max-w-md mx-auto">
          <UserCircle2 className="h-12 w-12 text-white/20 mx-auto mb-3" />
          <div className="text-lg font-bold text-white mb-2">Sign in to view your profile</div>
          <p className="text-sm text-white/50 mb-5">Your profile, posts, and activity are all here.</p>
          <button onClick={() => router.push("/login")}
            className="rounded-full bg-white px-6 py-2.5 text-sm font-bold text-black hover:bg-neutral-200 transition">
            Continue with Google
          </button>
        </div>
      </Shell>
    );
  }

  const displayName = userDoc?.name || user.displayName || "User";
  const alias       = userDoc?.alias;
  const email       = userDoc?.email || user.email;
  const avatar      = user.photoURL;
  const joinedAt    = user.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString("en-IN", { year: "numeric", month: "long" })
    : null;

  return (
    <Shell>
      <div className="max-w-2xl mx-auto space-y-0">

        {/* ── Cover + Avatar ── */}
        <div className="card overflow-hidden p-0">
          {/* Cover bar */}
          <div className="h-24 bg-gradient-to-r from-white/5 via-white/10 to-white/5 relative">
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
          </div>

          {/* Avatar row */}
          <div className="px-5 pb-5">
            <div className="flex items-end justify-between -mt-10 mb-3">
              {/* Avatar */}
              <div className="relative">
                {avatar ? (
                  <img src={avatar} alt={displayName}
                    className="w-20 h-20 rounded-full border-4 border-black object-cover" />
                ) : (
                  <div className="w-20 h-20 rounded-full border-4 border-black bg-white/10 flex items-center justify-center">
                    <UserCircle2 className="h-10 w-10 text-white/30" />
                  </div>
                )}
              </div>

              {/* Settings button */}
              <Link href="/profile/settings"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5 text-sm text-white/60 hover:bg-white/10 hover:text-white transition">
                <Settings className="h-4 w-4" />
                <span>Edit Profile</span>
              </Link>
            </div>

            {/* Name + alias */}
            <div className="mb-1">
              <div className="text-xl font-bold text-white leading-tight">{displayName}</div>
              {alias && alias !== displayName.split(" ")[0] && (
                <div className="text-sm text-white/40 mt-0.5">@{alias}</div>
              )}
            </div>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-white/40 mb-4">
              {email && (
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> {email}
                </span>
              )}
              {joinedAt && (
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> Joined {joinedAt}
                </span>
              )}
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 pt-4 border-t border-white/10">
              <StatBox value={stats.posts} label="Posts" />
              <div className="w-px h-8 bg-white/10" />
              <StatBox value={stats.liked} label="Liked" />
              <div className="w-px h-8 bg-white/10" />
              <div className="text-center">
                <div className="text-xs text-white/40 mt-1">
                  {alias ? (
                    <span className="inline-flex items-center gap-1 text-green-400/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                      Alias active
                    </span>
                  ) : (
                    <span className="text-yellow-400/70">No alias set</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Tabs ── */}
        <div className="card p-0 overflow-hidden">
          <div className="flex border-b border-white/10">
            {TABS.map(({ key, label, icon: Icon }) => (
              <Link
                key={key}
                href={`/profile?tab=${key}`}
                className={`flex-1 flex items-center justify-center gap-1.5 py-3.5 text-sm font-medium transition border-b-2 ${
                  activeTab === key
                    ? "border-white text-white"
                    : "border-transparent text-white/40 hover:text-white/70 hover:bg-white/5"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:block">{label}</span>
              </Link>
            ))}
          </div>

          {/* Tab content */}
          <div className="divide-y divide-white/5">
            {postLoading ? (
              [...Array(3)].map((_, i) => (
                <div key={i} className="p-5">
                  <div className="space-y-2">
                    <div className="h-3 w-1/3 rounded bg-white/5 animate-pulse" />
                    <div className="h-5 w-3/4 rounded bg-white/5 animate-pulse" />
                    <div className="h-3 w-full rounded bg-white/5 animate-pulse" />
                  </div>
                </div>
              ))
            ) : posts.length === 0 ? (
              <div className="py-14 text-center">
                {activeTab === "posts" && (
                  <>
                    <div className="text-3xl mb-3">📝</div>
                    <div className="text-sm font-semibold text-white mb-1">No public posts yet</div>
                    <p className="text-xs text-white/40 mb-4">Anonymous posts don't appear here to protect your privacy.</p>
                    <Link href="/submit"
                      className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-bold text-black hover:bg-neutral-200 transition">
                      Create a Post
                    </Link>
                  </>
                )}
                {activeTab === "liked" && (
                  <><div className="text-3xl mb-3">❤️</div><div className="text-sm text-white/40">Posts you upvote will appear here.</div></>
                )}
                {activeTab === "saved" && (
                  <><div className="text-3xl mb-3">🔖</div><div className="text-sm text-white/40">Posts you save will appear here.</div></>
                )}
                {activeTab === "commented" && (
                  <><div className="text-3xl mb-3">💬</div><div className="text-sm text-white/40">Posts you've commented on will appear here.</div></>
                )}
              </div>
            ) : (
              posts.map((p) => <PostCard key={p.id} post={p} />)
            )}
          </div>
        </div>

        {/* ── Privacy notice ── */}
        <div className="card p-4 flex items-start gap-3">
          <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center shrink-0 mt-0.5">
            <Eye className="h-3.5 w-3.5 text-white/30" />
          </div>
          <div className="text-xs text-white/30 leading-relaxed">
            Your profile only shows posts made under your real name. Posts made with your alias or anonymously never appear here, keeping your identity fully protected.
          </div>
        </div>

      </div>
    </Shell>
  );
}

export default function ProfilePage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-20">
        <div className="h-6 w-6 rounded-full border-2 border-white/20 border-t-white animate-spin" />
      </div>
    }>
      <ProfilePageInner />
    </Suspense>
  );
}
