// app/profile/page.jsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Shell from "@/components/Shell";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { listenMyActivity, listenPost } from "@/lib/firestore";

function MiniPost({ postId }) {
  const [post, setPost] = useState(null);

  useEffect(() => {
    const unsub = listenPost(postId, setPost);
    return () => unsub?.();
  }, [postId]);

  if (!post) return null;

  return (
    <Link href={`/post/${postId}`} className="block rounded-2xl border bg-white p-4 shadow-sm hover:shadow-md transition">
      <div className="text-base font-semibold">{post.title}</div>
      <div className="mt-1 text-sm text-gray-600 line-clamp-2">{post.body}</div>
      <div className="mt-3 text-xs text-gray-500">
        {post.isAnonymous ? "Anonymous post" : "Regular post"} • {post.categoryName || "General Posts"}
      </div>
    </Link>
  );
}

export default function ProfilePage() {
  const { user, userDoc, loading, login } = useAuth();
  const sp = useSearchParams();
  const tab = sp.get("tab") || "liked";

  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!user?.uid) return;
    const unsub = listenMyActivity(user.uid, tab, setItems);
    return () => unsub?.();
  }, [user?.uid, tab]);

  const tabs = useMemo(() => ([
    { key: "liked", label: "Liked" },
    { key: "saved", label: "Saved" },
    { key: "comment", label: "Commented" },
    { key: "share", label: "Shared" },
  ]), []);

  if (loading) {
    return <Shell><div className="rounded-2xl border bg-white p-6 shadow-sm">Loading…</div></Shell>;
  }

  if (!user) {
    return (
      <Shell>
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="text-lg font-semibold">Profile</div>
          <p className="mt-1 text-sm text-gray-600">Sign in to view your profile activity.</p>
          <button onClick={login} className="mt-4 rounded-xl bg-black px-4 py-2 text-sm text-white hover:bg-gray-900">
            Continue with Google
          </button>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <div className="rounded-2xl border bg-white p-5 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-lg font-semibold">
              {userDoc?.alias || userDoc?.name || "User"}
            </div>
            <div className="mt-1 text-sm text-gray-600">
              Email: <span className="font-medium">{userDoc?.email || user.email}</span>
            </div>
            <div className="mt-1 text-sm text-gray-600">
              Phone: <span className="font-medium">{userDoc?.phone || "Not set"}</span>
            </div>
          </div>

          <Link href="/profile/settings" className="rounded-xl border px-4 py-2 text-sm hover:bg-gray-50">
            Settings
          </Link>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Link href="/profile?tab=like" className="rounded-full border px-3 py-2 text-sm hover:bg-gray-50">Liked</Link>
          <Link href="/profile?tab=save" className="rounded-full border px-3 py-2 text-sm hover:bg-gray-50">Saved</Link>
          <Link href="/profile?tab=comment" className="rounded-full border px-3 py-2 text-sm hover:bg-gray-50">Commented</Link>
          <Link href="/profile?tab=share" className="rounded-full border px-3 py-2 text-sm hover:bg-gray-50">Shared</Link>
        </div>
      </div>

      <div className="mt-4 space-y-4">
        {items?.length ? (
          items.map((it) => <MiniPost key={it.id} postId={it.postId} />)
        ) : (
          <div className="rounded-2xl border bg-white p-6 text-sm text-gray-600 shadow-sm">
            No activity yet in this section.
          </div>
        )}
      </div>
    </Shell>
  );
}
