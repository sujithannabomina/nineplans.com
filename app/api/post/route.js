// app/api/post/route.js
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { db, Timestamp } from "@/lib/firebaseAdmin";
import { CATEGORY_BY_SLUG } from "@/lib/categories";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

function bad(msg, code = 400) {
  return NextResponse.json({ ok: false, error: msg }, { status: code });
}

export async function POST(req) {
  try {
    const body = await req.json();
    let { alias = "", category, title, body: content } = body || {};

    title = (title || "").trim();
    content = (content || "").trim();
    category = (category || "").trim();

    if (!title || title.length > 140) return bad("Title is required (<= 140 chars).");
    if (!CATEGORY_BY_SLUG[category]) return bad("Invalid category.");
    if (!content) return bad("Post body is required.");

    const session = await getServerSession(authOptions).catch(() => null);
    const user = session?.user || null;
    const userId = user?.id || user?.email || null;

    const doc = {
      title,
      titleLower: title.toLowerCase(),
      body: content,
      category,                  // slug
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      uid: userId,               // nullable (anonymous allowed)
      authorName: user?.name || null,
      alias: alias || null,      // “Alias” / “Anonymous” / custom in future
      likesCount: 0,
      commentsCount: 0,
      viewsCount: 0,
      hidden: false,
    };

    const ref = await db.collection("posts").add(doc);
    return NextResponse.json({ ok: true, id: ref.id });
  } catch (err) {
    console.error("POST /api/post:", err);
    return bad("Server error.", 500);
  }
}
