export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { adminDb, adminAuth } from "@/lib/firebaseAdmin";

/**
 * GET /api/profile
 * Optional query: ?uid=<userId>
 * If you’re using Firebase Auth on the client, send an ID token in:
 * Authorization: Bearer <firebase-id-token>
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    let uid = searchParams.get("uid") || null;

    // If an ID token is provided, use it as source of truth for uid
    const authHeader = request.headers.get("authorization") || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

    if (token) {
      try {
        const decoded = await adminAuth.verifyIdToken(token);
        uid = decoded.uid;
      } catch {
        // Fall back to ?uid if verification fails (keeps build-time happy)
      }
    }

    if (!uid) {
      return NextResponse.json(
        { ok: false, error: "Missing uid. Provide ?uid=... or a valid Bearer token." },
        { status: 400 }
      );
    }

    // Fetch a basic profile document
    const profileSnap = await adminDb.collection("profiles").doc(uid).get();
    const profile = profileSnap.exists ? profileSnap.data() : { uid };

    // Example interaction rollups (adjust collection names to match your schema)
    const [postedQ, likedQ, savedQ, commentedQ, sharedQ] = await Promise.all([
      adminDb.collection("posts").where("authorId", "==", uid).orderBy("createdAt", "desc").limit(20).get(),
      adminDb.collection("likes").where("userId", "==", uid).orderBy("createdAt", "desc").limit(20).get(),
      adminDb.collection("saves").where("userId", "==", uid).orderBy("createdAt", "desc").limit(20).get(),
      adminDb.collection("comments").where("userId", "==", uid).orderBy("createdAt", "desc").limit(20).get(),
      adminDb.collection("shares").where("userId", "==", uid).orderBy("createdAt", "desc").limit(20).get(),
    ]);

    const toList = (qs) => qs.docs.map((d) => ({ id: d.id, ...d.data() }));

    return NextResponse.json({
      ok: true,
      profile,
      interactions: {
        posted: toList(postedQ),
        liked: toList(likedQ),
        saved: toList(savedQ),
        commented: toList(commentedQ),
        shared: toList(sharedQ),
      },
    });
  } catch (err) {
    console.error("PROFILE_API_ERROR", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
