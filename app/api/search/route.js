// app/api/search/route.js
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";
import { CATEGORY_BY_SLUG } from "@/lib/categories";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const q = (searchParams.get("q") || "").trim().toLowerCase();
    const cat = (searchParams.get("cat") || "").trim();
    const limit = Math.min(parseInt(searchParams.get("limit") || "25", 10), 50);

    let ref = db.collection("posts").where("hidden", "==", false);

    if (cat) {
      if (!CATEGORY_BY_SLUG[cat]) {
        return NextResponse.json({ ok: true, items: [], note: "invalid-category" });
      }
      ref = ref.where("category", "==", cat);
    }

    if (q) {
      // Title prefix search. Create index: (category asc, titleLower asc) when cat is used.
      ref = ref.orderBy("titleLower").where("titleLower", ">=", q).where("titleLower", "<=", q + "\uf8ff");
    } else {
      ref = ref.orderBy("createdAt", "desc");
    }

    const snap = await ref.limit(limit).get();
    const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

    return NextResponse.json({ ok: true, items });
  } catch (err) {
    console.error("GET /api/search:", err);
    // When an index is missing, Firestore throws; surface an actionable hint (no stack).
    return NextResponse.json({ ok: false, error: "Search failed (check Firestore indexes)." }, { status: 500 });
  }
}
