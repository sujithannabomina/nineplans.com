// app/api/post/route.js
import { NextResponse } from "next/server";
import { db, Timestamp, FieldValue } from "@/lib/firebaseAdmin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Create a new post
 * Body: { title, content, category, authorId, tags? }
 */
export async function POST(req) {
  try {
    const body = await req.json();
    const { title, content, category, authorId, tags = [] } = body || {};

    if (!title || !content || !category || !authorId) {
      return NextResponse.json(
        { error: "Missing required fields: title, content, category, authorId" },
        { status: 400 }
      );
    }

    const docRef = await db.collection("posts").add({
      title: String(title).trim(),
      content,
      category,
      authorId,
      tags,
      likeCount: 0,
      commentCount: 0,
      shareCount: 0,
      viewCount: 0,
      createdAt: Timestamp.now(),
      updatedAt: FieldValue.serverTimestamp(),
      published: true,
    });

    const snap = await docRef.get();
    return NextResponse.json({ id: docRef.id, ...snap.data() }, { status: 201 });
  } catch (err) {
    console.error("POST /api/post error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

/**
 * Get a post (by id) or list posts (by category/author)
 * Query: ?id=POST_ID | ?category=...&authorId=...&limit=20
 */
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const category = searchParams.get("category");
    const authorId = searchParams.get("authorId");
    const limitParam = Number(searchParams.get("limit") || "20");
    const limit = Number.isFinite(limitParam) ? Math.min(limitParam, 50) : 20;

    if (id) {
      const doc = await db.collection("posts").doc(id).get();
      if (!doc.exists) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }
      return NextResponse.json({ id: doc.id, ...doc.data() });
    }

    let q = db.collection("posts").orderBy("createdAt", "desc").limit(limit);
    if (category) q = q.where("category", "==", category);
    if (authorId) q = q.where("authorId", "==", authorId);

    const snap = await q.get();
    const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    return NextResponse.json({ items });
  } catch (err) {
    console.error("GET /api/post error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
