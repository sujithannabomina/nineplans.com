// app/api/post/route.js
import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";
import { findCategory } from "@/lib/categories";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      // required
      uid,                // client-provided current user id
      content,            // text
      categorySlug,       // category
      // name model
      mode,               // "alias" | "account"
      alias,              // user's current alias string (if any)
      accountName,        // user's account display name
    } = body || {};

    if (!uid || !content || !categorySlug || !mode) {
      return NextResponse.json({ ok: false, error: "BAD_REQUEST" }, { status: 400 });
    }

    const cat = findCategory(categorySlug);
    if (!cat) return NextResponse.json({ ok: false, error: "INVALID_CATEGORY" }, { status: 400 });

    // Snapshot display name rules
    const authorType = mode === "account" ? "account" : "alias";
    const aliasSnapshot = authorType === "alias" ? String(alias || "").trim() : "";
    const accountSnapshot = authorType === "account" ? String(accountName || "").trim() : "";

    const displayName = authorType === "alias" ? (aliasSnapshot || "Alias") : (accountSnapshot || "User");

    const doc = {
      uid,
      authorType,
      aliasSnapshot,
      accountSnapshot,
      displayName,            // **always render from this field**
      content: String(content).slice(0, 2000),
      categorySlug: cat.slug,
      categoryName: cat.name,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      likes: 0,
      saves: 0,
      views: 0,
      status: "ok",
    };

    const ref = await adminDb.collection("posts").add(doc);
    return NextResponse.json({ ok: true, id: ref.id });
  } catch (err) {
    console.error("POST /api/post", err);
    return NextResponse.json({ ok: false, error: "POST_CREATE_FAILED" }, { status: 500 });
  }
}
