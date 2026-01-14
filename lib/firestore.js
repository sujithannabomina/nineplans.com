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
  runTransaction,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "@/lib/db";
import { makeAlias } from "@/lib/alias";
import { FEED_LIMIT, COMMENT_LIMIT } from "@/lib/constants";
import { categoryFallback } from "@/lib/categories";

/**
 * Firestore schema (MVP)
 * - users/{uid}
 * - categories/{slug}
 * - posts/{postId}
 *   - votes/{uid}
 *   - comments/{commentId}
 *     - votes/{uid}
 * - reports/{reportId}
 */

export const refs = {
  user: (uid) => doc(db, "users", uid),
  categories: () => collection(db, "categories"),
  category: (slug) => doc(db, "categories", slug),
  posts: () => collection(db, "posts"),
  post: (id) => doc(db, "posts", id),
  postVote: (postId, uid) => doc(db, "posts", postId, "votes", uid),
  comments: (postId) => collection(db, "posts", postId, "comments"),
  comment: (postId, id) => doc(db, "posts", postId, "comments", id),
  commentVote: (postId, commentId, uid) =>
    doc(db, "posts", postId, "comments", commentId, "votes", uid),
  reports: () => collection(db, "reports"),
  report: (id) => doc(db, "reports", id),
};

// =========================
// USERS
// =========================

export async function fetchUserDoc(uid) {
  if (!uid) return null;
  const snap = await getDoc(refs.user(uid));
  return snap.exists() ? snap.data() : null;
}

export async function ensureUserDoc(fbUser) {
  const ref = refs.user(fbUser.uid);
  const snap = await getDoc(ref);
  const now = Date.now();

  if (!snap.exists()) {
    const alias = makeAlias(fbUser.displayName || fbUser.email || "Anon");
    await setDoc(ref, {
      uid: fbUser.uid,
      email: fbUser.email || null,
      displayName: fbUser.displayName || null,
      photoURL: fbUser.photoURL || null,
      primaryAlias: alias,
      karma: 0,
      role: "user",
      createdAt: now,
      lastActiveAt: now,
    });
  } else {
    await updateDoc(ref, {
      lastActiveAt: now,
      email: fbUser.email || null,
      displayName: fbUser.displayName || null,
      photoURL: fbUser.photoURL || null,
    });
  }

  const fresh = await getDoc(ref);
  return fresh.data();
}

export async function updateAlias(uid, nextAlias) {
  const a = (nextAlias || "").trim();
  if (!uid) throw new Error("Not signed in");
  if (a.length < 3) throw new Error("Alias must be at least 3 characters");
  if (a.length > 24) throw new Error("Alias too long (max 24)");

  await updateDoc(refs.user(uid), {
    primaryAlias: a,
    updatedAt: Date.now(),
  });

  return a;
}

// =========================
// CATEGORIES
// =========================

/**
 * If categories collection is empty or snapshot fails,
 * we provide fallback categories from lib/categories.js
 */
export function listenTopCategories(cb) {
  const qy = query(refs.categories(), orderBy("postCount", "desc"), limit(50));
  return onSnapshot(
    qy,
    (snap) => {
      const arr = snap.docs.map((d) => d.data());
      cb(arr.length ? arr : categoryFallback());
    },
    (err) => {
      console.error("listenTopCategories error:", err);
      cb(categoryFallback());
    }
  );
}

// =========================
// FEED / POSTS / COMMENTS
// =========================

export function listenFeed({ categorySlug, sort = "latest", cb }) {
  const clauses = [where("status", "==", "active")];
  if (categorySlug) clauses.push(where("categorySlug", "==", categorySlug));

  const order = sort === "top" ? orderBy("score", "desc") : orderBy("createdAt", "desc");
  const qy = query(refs.posts(), ...clauses, order, limit(FEED_LIMIT));

  return onSnapshot(
    qy,
    (snap) => cb(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
    (err) => {
      console.error("listenFeed error:", err);
      cb([]);
    }
  );
}

export function listenPost(postId, cb) {
  return onSnapshot(
    refs.post(postId),
    (snap) => cb(snap.exists() ? { id: snap.id, ...snap.data() } : null),
    () => cb(null)
  );
}

export function listenComments(postId, cb) {
  const qy = query(
    refs.comments(postId),
    where("status", "==", "active"),
    orderBy("createdAt", "asc"),
    limit(COMMENT_LIMIT)
  );

  return onSnapshot(
    qy,
    (snap) => cb(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
    () => cb([])
  );
}

/**
 * Production-safe post creation:
 * - creates post
 * - ensures category doc exists
 * - increments category postCount safely (merge + increment)
 */
export async function createPost({
  categorySlug,
  categoryName,
  title,
  body,
  tags,
  authorUid,
  authorAlias,
  authorPhoto,
}) {
  const now = Date.now();

  const docData = {
    categorySlug,
    categoryName,
    title: title.trim(),
    body: body.trim(),
    type: "text",
    authorUid,
    authorAlias,
    authorPhoto: authorPhoto || null,
    score: 0,
    commentCount: 0,
    status: "active",
    tags: tags || [],
    createdAt: now,
    updatedAt: now,
  };

  const postRef = await addDoc(refs.posts(), docData);

  await setDoc(
    refs.category(categorySlug),
    {
      slug: categorySlug,
      name: categoryName || categorySlug,
      postCount: increment(1),
      updatedAt: now,
    },
    { merge: true }
  );

  return postRef.id;
}

export async function createComment({ postId, parentId = null, authorUid, authorAlias, body }) {
  const now = Date.now();

  await addDoc(refs.comments(postId), {
    postId,
    parentId,
    authorUid,
    authorAlias,
    body: body.trim(),
    score: 0,
    status: "active",
    createdAt: now,
    updatedAt: now,
  });

  await updateDoc(refs.post(postId), { commentCount: increment(1) });
}

export async function votePost(postId, uid, value) {
  await runTransaction(db, async (tx) => {
    const voteRef = refs.postVote(postId, uid);
    const postRef = refs.post(postId);

    const [voteSnap, postSnap] = await Promise.all([tx.get(voteRef), tx.get(postRef)]);
    if (!postSnap.exists()) throw new Error("Post not found");

    const prev = voteSnap.exists() ? voteSnap.data().value : 0;
    const next = value;
    if (prev === next) return;

    tx.update(postRef, { score: increment(next - prev), updatedAt: Date.now() });

    if (next === 0) tx.delete(voteRef);
    else tx.set(voteRef, { value: next, updatedAt: Date.now() }, { merge: true });
  });
}

export async function voteComment(postId, commentId, uid, value) {
  await runTransaction(db, async (tx) => {
    const voteRef = refs.commentVote(postId, commentId, uid);
    const cRef = refs.comment(postId, commentId);

    const [voteSnap, cSnap] = await Promise.all([tx.get(voteRef), tx.get(cRef)]);
    if (!cSnap.exists()) throw new Error("Comment not found");

    const prev = voteSnap.exists() ? voteSnap.data().value : 0;
    const next = value;
    if (prev === next) return;

    tx.update(cRef, { score: increment(next - prev), updatedAt: Date.now() });

    if (next === 0) tx.delete(voteRef);
    else tx.set(voteRef, { value: next, updatedAt: Date.now() }, { merge: true });
  });
}

// =========================
// REPORTS (used by ReportModal + Admin page)
// =========================

export async function reportPost({ postId, reporterUid, reason, details = "" }) {
  const now = Date.now();
  if (!postId) throw new Error("Missing postId");
  if (!reporterUid) throw new Error("Not signed in");
  if (!reason) throw new Error("Select a reason");

  await addDoc(refs.reports(), {
    postId,
    reporterUid,
    reason,
    details: (details || "").trim().slice(0, 500),
    status: "open",
    createdAt: now,
    updatedAt: now,
  });

  return true;
}

export async function listOpenReports() {
  const qy = query(refs.reports(), where("status", "==", "open"), orderBy("createdAt", "desc"), limit(200));
  const snap = await getDocs(qy);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function closeReport(reportId, adminUid) {
  if (!reportId) throw new Error("Missing reportId");
  const now = Date.now();
  await updateDoc(refs.report(reportId), {
    status: "closed",
    closedAt: now,
    closedBy: adminUid || null,
    updatedAt: now,
  });
  return true;
}

// =========================
// ADMIN (used by /admin)
// =========================

export async function adminSetPostStatus(postId, status, adminUid) {
  if (!postId) throw new Error("Missing postId");
  const now = Date.now();

  // Allowed: active | removed | under_review
  const allowed = new Set(["active", "removed", "under_review"]);
  const next = allowed.has(status) ? status : "under_review";

  await updateDoc(refs.post(postId), {
    status: next,
    moderatedAt: now,
    moderatedBy: adminUid || null,
    updatedAt: now,
  });

  return true;
}
