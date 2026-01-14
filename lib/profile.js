import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/db";

/**
 * Create user doc if missing and keep name/email/photo in sync.
 */
export async function ensureUserDoc(firebaseUser) {
  const ref = doc(db, "users", firebaseUser.uid);
  const snap = await getDoc(ref);

  const base = {
    uid: firebaseUser.uid,
    name: firebaseUser.displayName || "",
    email: firebaseUser.email || "",
    photoURL: firebaseUser.photoURL || "",
    updatedAt: serverTimestamp(),
  };

  if (!snap.exists()) {
    await setDoc(ref, {
      ...base,
      phone: "",
      createdAt: serverTimestamp(),
      role: "user",
      defaultPostMode: "anonymous",
    });
  } else {
    // keep name/email/photo updated
    await updateDoc(ref, base);
  }
}

export async function getUserProfile(uid) {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
}

export async function saveUserProfile(uid, { name, phone }) {
  const ref = doc(db, "users", uid);
  await updateDoc(ref, {
    name: (name || "").trim(),
    phone: (phone || "").trim(),
    updatedAt: serverTimestamp(),
  });
}
