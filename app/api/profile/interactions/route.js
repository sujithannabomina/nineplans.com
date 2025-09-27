import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const limitParam = Number(searchParams.get("limit") || "20");
    const limit = Number.isFinite(limitParam) ? Math.min(limitParam, 50) : 20;

    if (!userId) return NextResponse.json({ error: "Missing userId" }, { status: 400 });

    const fetchPostsByIds = async (ids) => {
      if (!ids.length) return [];
      const chunks = [];
      for (let i = 0; i < ids.length; i += 10) chunks.push(ids.slice(i, i + 10));
      const results = [];
      for (const ch of chunks) {
        const refs = ch.map((id) => db.collection("posts").doc(id));
        const docs = await db.getAll(...refs);
        for (const d of docs) if (d.exists) results.push({ id: d.id, ...d.data() });
      }
      return results;
    };

    const postedSnap = await db
      .collection("posts")
      .where("authorId", "==", userId)
      .orderBy("createdAt", "desc")
      .limit(limit)
      .get();
    const posted = postedSnap.docs.map((d) => ({ id: d.id, ...d.data() }));

    const likesSnap = await db
      .collection("likes")
      .where("userId", "==", userId)
      .orderBy("createdAt", "desc")
      .limit(limit)
      .get();
    const liked = await fetchPostsByIds(likesSnap.docs.map((d) => d.data()?.postId).filter(Boolean));

    const savesSnap = await db
      .collection("saves")
      .where("userId", "==", userId)
      .orderBy("createdAt", "desc")
      .limit(limit)
      .get();
    const saved = await fetchPostsByIds(savesSnap.docs.map((d) => d.data()?.postId).filter(Boolean));

    const commentsSnap = await db
      .collection("comments")
      .where("userId", "==", userId)
      .orderBy("createdAt", "desc")
      .limit(limit)
      .get();
    const commented = await fetchPostsByIds(
      commentsSnap.docs.map((d) => d.data()?.postId).filter(Boolean)
    );

    const sharesSnap = await db
      .collection("shares")
      .where("userId", "==", userId)
      .orderBy("createdAt", "desc")
      .limit(limit)
      .get();
    const shared = await fetchPostsByIds(sharesSnap.docs.map((d) => d.data()?.postId).filter(Boolean));

    return NextResponse.json({ posted, liked, saved, commented, shared });
  } catch (err) {
    console.error("GET /api/profile/interactions error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
