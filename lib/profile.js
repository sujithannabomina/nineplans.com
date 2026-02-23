import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/db";

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
    await setDoc(ref, { ...base, phone: "", alias: "", createdAt: serverTimestamp(), role: "user" });
  } else {
    await updateDoc(ref, base);
  }
}

export async function getUserProfile(uid) {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? snap.data() : null;
}

export async function saveUserProfile(uid, { name, phone, alias }) {
  await updateDoc(doc(db, "users", uid), {
    name: (name || "").trim(),
    phone: (phone || "").trim(),
    alias: (alias || "").trim().slice(0, 30),
    updatedAt: serverTimestamp(),
  });
}
