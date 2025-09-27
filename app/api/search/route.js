import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const q = (searchParams.get("q") || "").trim();
    const category = (searchParams.get("category") || "").trim();
    const limit = Math.min(Number(searchParams.get("limit") || "20"), 50);

    let query = db.collection("posts").where("published", "==", true);
    if (category) query = query.where("category", "==", category);
    // naive "text search": filter by title/content contains q (Firestore needs full-text via 3rd party for real search)
    query = query.orderBy("createdAt", "desc").limit(limit);

    const snap = await query.get();
    let items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

    if (q) {
      const qLower = q.toLowerCase();
      items = items.filter(
        (p) =>
          (p.title || "").toLowerCase().includes(qLower) ||
          (p.content || "").toLowerCase().includes(qLower)
      );
    }

    return NextResponse.json({ items });
  } catch (err) {
    console.error("GET /api/search error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
