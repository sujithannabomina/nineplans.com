// app/api/profile/route.js
import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

// Force Node runtime (Admin SDK requires it)
export const runtime = "nodejs";

async function getUserId(req) {
  // Simplified: we read an auth cookie set by NextAuth
  // If your project already uses NextAuth, prefer requesting the userId from the client and posting it here.
  // To avoid coupling, we also accept x-user-id in headers for now.
  const explicit = req.headers.get("x-user-id");
  if (explicit) return explicit;

  // If you already expose the uid to the client in a secure way, keep using that.
  return null;
}

export async function GET(req) {
  try {
    const uid = await getUserId(req);
    if (!uid) {
      // Anonymous viewer: return minimal profile shell
      return NextResponse.json({ ok: true, profile: { alias: "" } }, { status: 200 });
    }

    const ref = adminDb.collection("users").doc(uid);
    const snap = await ref.get();
    const data = snap.exists ? snap.data() : {};
    return NextResponse.json({ ok: true, profile: { alias: data.alias || "" } });
  } catch (err) {
    console.error("GET /api/profile", err);
    return NextResponse.json({ ok: false, error: "PROFILE_READ_FAILED" }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const uid = await getUserId(req);
    if (!uid) return NextResponse.json({ ok: false, error: "UNAUTHENTICATED" }, { status: 401 });

    const body = await req.json();
    const newAlias = String(body.alias || "").trim().slice(0, 24); // soft limit

    await adminDb.collection("users").doc(uid).set(
      {
        alias: newAlias,
        updatedAt: Date.now(),
      },
      { merge: true }
    );

    return NextResponse.json({ ok: true, alias: newAlias });
  } catch (err) {
    console.error("PATCH /api/profile", err);
    return NextResponse.json({ ok: false, error: "PROFILE_UPDATE_FAILED" }, { status: 500 });
  }
}
