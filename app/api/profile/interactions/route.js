// app/api/profile/interactions/route.js
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  try {
    const session = await getServerSession(authOptions).catch(() => null);
    const user = session?.user;

    if (!user) {
      // Return empty sets instead of 401 so the UI can render a friendly state.
      return NextResponse.json({ posted: [], liked: [], commented: [], saved: [] });
    }

    const userId = user.id || user.email;

    // 1) Posted
    const postedSnap = await db
      .collection("posts")
      .where("uid", "==", userId)
      .where("hidden", "==", false)
      .orderBy("createdAt", "desc")
      .limit(25)
      .get();

    const posted = postedSnap.docs.map((d) => ({ id: d.id, ...d.data() }));

    // 2) Interactions document under users/{uid}
    const userDoc = await db.collection("users").doc(userId).get();
    const {
      likedPostIds = [],
      commentedPostIds = [],
      savedPostIds = [],
    } = userDoc.exists ? userDoc.data() : {};

    // Helper to batch-load by ids (Firestore allows "in" with up to 10; use chunking)
    async function fetchPostsByIds(ids) {
      const unique = Array.from(new Set(ids)).slice(0, 50);
      const chunks = [];
      while (unique.length) chunks.push(unique.splice(0, 10));
      const results = [];
      for (const ten of chunks) {
        const snap = await db
          .collection("posts")
          .where("__name__", "in", ten)
          .get();
        results.push(...snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      }
      return results;
    }

    const [liked, commented, saved] = await Promise.all([
      fetchPostsByIds(likedPostIds),
      fetchPostsByIds(commentedPostIds),
      fetchPostsByIds(savedPostIds),
    ]);

    return NextResponse.json({ posted, liked, commented, saved });
  } catch (err) {
    console.error("GET /api/profile/interactions:", err);
    return NextResponse.json({ posted: [], liked: [], commented: [], saved: [] });
  }
}
