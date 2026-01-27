// lib/firestore.js
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/lib/db";
import { DEFAULT_CATEGORIES } from "@/lib/categories";
import { POST_STATUS } from "@/lib/constants";

/* -----------------------------
  USERS
-------------------------------- */

export async function ensureUserDoc(user) {
  if (!user?.uid) return null;

  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    const email = user.email || "";
    const name = user.displayName || "";
    const photoURL = user.photoURL || "";

    await setDoc(ref, {
      uid: user.uid,
      email,
      name,
      phone: "",
      alias: name ? name.split(" ")[0] : "User",
      photoURL,
      role: "user",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } else {
    await updateDoc(ref, { updatedAt: serverTimestamp() }).catch(() => {});
  }

  return ref;
}

export async function fetchUserDoc(uid) {
  if (!uid) return null;
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

export async function updateProfileInfo(uid, { name = "", phone = "" }) {
  if (!uid) throw new Error("Missing uid");
  await updateDoc(doc(db, "users", uid), {
    name,
    phone,
    updatedAt: serverTimestamp(),
  });
}

export async function updateAlias(uid, alias) {
  if (!uid) throw new Error("Missing uid");
  const safe = String(alias || "").trim().slice(0, 30);
  await updateDoc(doc(db, "users", uid), {
    alias: safe || "User",
    updatedAt: serverTimestamp(),
  });
}

/* -----------------------------
  CATEGORIES (seed + listen)
-------------------------------- */

export async function seedDefaultCategoriesIfEmpty() {
  const colRef = collection(db, "categories");
  const existing = await getDocs(query(colRef, limit(1)));
  if (!existing.empty) return;

  // Seed categories with slug + name (stable)
  for (const c of DEFAULT_CATEGORIES) {
    // keep ids auto, but store slug field
    await addDoc(colRef, {
      name: c.name,
      slug: c.slug,
      createdAt: serverTimestamp(),
      postCount: 0,
    });
  }
}

export function listenCategories(cb) {
  // ✅ Ensure categories exist (best-effort, no UI blocking)
  seedDefaultCategoriesIfEmpty().catch(() => {});

  const qy = query(collection(db, "categories"), orderBy("name", "asc"));

  return onSnapshot(
    qy,
    (snap) => {
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      cb(list);
    },
    () => {
      // never crash UI
      cb([]);
    }
  );
}

/* -----------------------------
  POSTS
-------------------------------- */

export async function createPost({
  uid,
  title,
  body,
  categorySlug,
  categoryName,
  isAnonymous,
  alias,
}) {
  if (!uid) throw new Error("Login required");
  const t = String(title || "").trim().slice(0, 120);
  const b = String(body || "").trim().slice(0, 5000);

  if (!t || !b) throw new Error("Title and content are required");

  const postRef = await addDoc(collection(db, "posts"), {
    title: t,
    body: b,
    categorySlug: categorySlug || "general-posts",
    categoryName: categoryName || "General Posts",
    isAnonymous: !!isAnonymous,
    authorUid: uid,
    authorAlias: alias || "User",
    status: POST_STATUS.ACTIVE,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    upvotes: 0,
    downvotes: 0,
    commentsCount: 0,
    views: 0,
    shares: 0,
    savedCount: 0,
  });

  // increment category postCount if category exists (best-effort)
  try {
    const cats = await getDocs(
      query(collection(db, "categories"), where("slug", "==", categorySlug))
    );
    if (!cats.empty) {
      await updateDoc(cats.docs[0].ref, { postCount: increment(1) });
    }
  } catch {}

  await setDoc(doc(db, "users", uid, "activity", `post_${postRef.id}`), {
    type: "post",
    postId: postRef.id,
    createdAt: serverTimestamp(),
  });

  return postRef.id;
}

export function listenFeed({ mode = "latest", categorySlug = null }, cb) {
  let unsub = () => {};

  const start = (qy) => {
    unsub = onSnapshot(
      qy,
      (snap) => cb(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
      () => cb([])
    );
  };

  const latestQ = query(
    collection(db, "posts"),
    where("status", "==", POST_STATUS.ACTIVE),
    orderBy("createdAt", "desc"),
    limit(30)
  );

  if (categorySlug) {
    const catQ = query(
      collection(db, "posts"),
      where("categorySlug", "==", categorySlug),
      where("status", "==", POST_STATUS.ACTIVE),
      orderBy("createdAt", "desc"),
      limit(30)
    );
    start(catQ);
    return () => unsub();
  }

  if (mode === "trending") {
    // Trending can fail if Firestore index isn't created yet
    const trendingQ = query(
      collection(db, "posts"),
      where("status", "==", POST_STATUS.ACTIVE),
      orderBy("upvotes", "desc"),
      orderBy("createdAt", "desc"),
      limit(30)
    );

    unsub = onSnapshot(
      trendingQ,
      (snap) => cb(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
      () => {
        // ✅ fallback to latest so it never breaks UI
        start(latestQ);
      }
    );

    return () => unsub();
  }

  start(latestQ);
  return () => unsub();
}

export function listenPost(postId, cb) {
  return onSnapshot(doc(db, "posts", postId), (snap) => {
    cb(snap.exists() ? { id: snap.id, ...snap.data() } : null);
  });
}

export async function incrementPostView(postId) {
  if (!postId) return;
  await updateDoc(doc(db, "posts", postId), { views: increment(1) }).catch(
    () => {}
  );
}

/* -----------------------------
  VOTES (likes/dislikes)
-------------------------------- */

export async function votePost(uid, postId, value) {
  if (!uid) throw new Error("Login required");
  if (!postId) return;

  const voteRef = doc(db, "users", uid, "votes", postId);
  const postRef = doc(db, "posts", postId);

  const existing = await getDoc(voteRef);
  const prev = existing.exists() ? existing.data().value : 0;
  const next = value; // -1,0,1

  const updates = {};
  if (prev === 1) updates.upvotes = increment(-1);
  if (prev === -1) updates.downvotes = increment(-1);
  if (next === 1) updates.upvotes = increment(1);
  if (next === -1) updates.downvotes = increment(1);

  if (Object.keys(updates).length) await updateDoc(postRef, updates);

  if (next === 0) {
    if (existing.exists()) await deleteDoc(voteRef);
  } else {
    await setDoc(voteRef, { value: next, updatedAt: serverTimestamp() });
  }

  if (next === 1) {
    await setDoc(doc(db, "users", uid, "activity", `like_${postId}`), {
      type: "like",
      postId,
      createdAt: serverTimestamp(),
    });
  } else if (prev === 1 && next !== 1) {
    await deleteDoc(doc(db, "users", uid, "activity", `like_${postId}`)).catch(
      () => {}
    );
  }
}

export function listenMyVote(uid, postId, cb) {
  if (!uid || !postId) return () => {};
  return onSnapshot(doc(db, "users", uid, "votes", postId), (snap) => {
    cb(snap.exists() ? snap.data().value : 0);
  });
}

/* -----------------------------
  SAVES
-------------------------------- */

export async function toggleSave(uid, postId) {
  if (!uid) throw new Error("Login required");
  const saveRef = doc(db, "users", uid, "saves", postId);
  const postRef = doc(db, "posts", postId);

  const existing = await getDoc(saveRef);
  if (existing.exists()) {
    await deleteDoc(saveRef);
    await updateDoc(postRef, { savedCount: increment(-1) }).catch(() => {});
    await deleteDoc(doc(db, "users", uid, "activity", `save_${postId}`)).catch(
      () => {}
    );
    return false;
  } else {
    await setDoc(saveRef, { createdAt: serverTimestamp() });
    await updateDoc(postRef, { savedCount: increment(1) }).catch(() => {});
    await setDoc(doc(db, "users", uid, "activity", `save_${postId}`), {
      type: "save",
      postId,
      createdAt: serverTimestamp(),
    });
    return true;
  }
}

export function listenIsSaved(uid, postId, cb) {
  if (!uid || !postId) return () => {};
  return onSnapshot(doc(db, "users", uid, "saves", postId), (snap) => {
    cb(snap.exists());
  });
}

/* -----------------------------
  COMMENTS
-------------------------------- */

export function listenComments(postId, cb) {
  const qy = query(
    collection(db, "posts", postId, "comments"),
    orderBy("createdAt", "asc")
  );
  return onSnapshot(qy, (snap) => {
    cb(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  });
}

export async function addComment({ uid, postId, text, alias }) {
  if (!uid) throw new Error("Login required");
  const t = String(text || "").trim().slice(0, 1500);
  if (!t) throw new Error("Comment cannot be empty");

  await addDoc(collection(db, "posts", postId, "comments"), {
    uid,
    alias: alias || "User",
    text: t,
    createdAt: serverTimestamp(),
  });

  await updateDoc(doc(db, "posts", postId), {
    commentsCount: increment(1),
    updatedAt: serverTimestamp(),
  });

  await setDoc(doc(db, "users", uid, "activity", `comment_${postId}`), {
    type: "comment",
    postId,
    createdAt: serverTimestamp(),
  });
}

/* -----------------------------
  SHARE
-------------------------------- */

export async function sharePost(uid, postId) {
  if (!postId) return;
  await updateDoc(doc(db, "posts", postId), { shares: increment(1) }).catch(
    () => {}
  );
  if (uid) {
    await setDoc(doc(db, "users", uid, "activity", `share_${postId}`), {
      type: "share",
      postId,
      createdAt: serverTimestamp(),
    });
  }
}

/* -----------------------------
  REPORTS (for moderation)
-------------------------------- */

export async function reportPost({ uid, postId, reason, details = "" }) {
  if (!uid) throw new Error("Login required");
  if (!postId) return;

  await addDoc(collection(db, "reports"), {
    postId,
    reporterUid: uid,
    reason: reason || "Other",
    details: String(details || "").slice(0, 1000),
    status: "open",
    createdAt: serverTimestamp(),
  });

  await updateDoc(doc(db, "posts", postId), { status: POST_STATUS.UNDER_REVIEW })
    .catch(() => {});
}

export function listOpenReports(cb) {
  const qy = query(
    collection(db, "reports"),
    where("status", "==", "open"),
    orderBy("createdAt", "desc"),
    limit(50)
  );
  return onSnapshot(qy, (snap) => {
    cb(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  });
}

export async function closeReport(reportId) {
  if (!reportId) return;
  await updateDoc(doc(db, "reports", reportId), {
    status: "closed",
    closedAt: serverTimestamp(),
  });
}

export async function adminSetPostStatus(postId, status) {
  if (!postId) return;
  const safe =
    status === POST_STATUS.ACTIVE ||
    status === POST_STATUS.UNDER_REVIEW ||
    status === POST_STATUS.REMOVED
      ? status
      : POST_STATUS.UNDER_REVIEW;

  await updateDoc(doc(db, "posts", postId), {
    status: safe,
    updatedAt: serverTimestamp(),
  });
}

export function listenMyActivity(uid, type, cb) {
  if (!uid) return () => {};
  const qy = query(
    collection(db, "users", uid, "activity"),
    where("type", "==", type),
    orderBy("createdAt", "desc"),
    limit(50)
  );
  return onSnapshot(qy, (snap) => {
    cb(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  });
}
