"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { X, ImagePlus, Loader2, User, EyeOff, UserCheck } from "lucide-react";
import Shell from "@/components/Shell";
import useAuth from "@/hooks/useAuth";
import { listenCategories } from "@/lib/firestore";
import { useEffect } from "react";
import { db } from "@/lib/db";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const MAX_IMAGES = 2;
const MAX_SIZE_MB = 10;

const IDENTITY_OPTIONS = [
  {
    key: "realname",
    icon: User,
    label: "Real Name",
    desc: "Post as your full name. Visible on your profile.",
    color: "border-white/20 hover:border-white/40",
    activeColor: "border-white bg-white/5",
  },
  {
    key: "alias",
    icon: UserCheck,
    label: "Alias",
    desc: "Post under your alias. Profile is hidden from others.",
    color: "border-white/20 hover:border-white/40",
    activeColor: "border-blue-400 bg-blue-400/5",
  },
  {
    key: "anonymous",
    icon: EyeOff,
    label: "Anonymous",
    desc: "Completely untraceable. No name, no profile link.",
    color: "border-white/20 hover:border-white/40",
    activeColor: "border-purple-400 bg-purple-400/5",
  },
];

export default function SubmitPage() {
  const router = useRouter();
  const { user, userDoc, login } = useAuth();

  const [title, setTitle]       = useState("");
  const [body, setBody]         = useState("");
  const [categorySlug, setCategorySlug] = useState("");
  const [identity, setIdentity] = useState("realname");
  const [images, setImages]     = useState([]); // { file, preview }
  const [categories, setCategories] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]       = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    const unsub = listenCategories((list) => setCategories(Array.isArray(list) ? list : []));
    return () => unsub?.();
  }, []);

  if (!user) {
    return (
      <Shell>
        <div className="card p-10 text-center max-w-md mx-auto">
          <div className="text-3xl mb-3">✍️</div>
          <div className="text-lg font-bold text-white mb-2">Sign in to post</div>
          <p className="text-sm text-white/50 mb-5">You need an account to create posts. It's free and takes 10 seconds.</p>
          <button onClick={login}
            className="rounded-full bg-white px-6 py-2.5 text-sm font-bold text-black hover:bg-neutral-200 transition">
            Continue with Google
          </button>
        </div>
      </Shell>
    );
  }

  function addImages(files) {
    const remaining = MAX_IMAGES - images.length;
    const toAdd = Array.from(files).slice(0, remaining);
    const errors = [];
    const valid = [];

    for (const f of toAdd) {
      if (!f.type.startsWith("image/")) { errors.push(`${f.name} is not an image.`); continue; }
      if (f.size > MAX_SIZE_MB * 1024 * 1024) { errors.push(`${f.name} exceeds ${MAX_SIZE_MB}MB.`); continue; }
      valid.push({ file: f, preview: URL.createObjectURL(f) });
    }

    if (errors.length) setError(errors.join(" "));
    setImages((prev) => [...prev, ...valid]);
  }

  function removeImage(i) {
    setImages((prev) => {
      URL.revokeObjectURL(prev[i].preview);
      return prev.filter((_, idx) => idx !== i);
    });
  }

  function handleDrop(e) {
    e.preventDefault();
    addImages(e.dataTransfer.files);
  }

  async function uploadImages(uid) {
    const storage = getStorage();
    const urls = [];
    for (const { file } of images) {
      const path = `posts/${uid}/${Date.now()}_${file.name}`;
      const storageRef = ref(storage, path);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      urls.push(url);
    }
    return urls;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!title.trim()) return setError("Title is required.");
    if (!body.trim())  return setError("Post content is required.");
    if (!categorySlug) return setError("Please select a category.");

    setSubmitting(true);
    try {
      const imageUrls = images.length > 0 ? await uploadImages(user.uid) : [];

      // Build author display based on identity choice
      const isAnonymous = identity === "anonymous";
      const isAlias     = identity === "alias";
      const authorAlias = isAnonymous ? null
        : isAlias ? (userDoc?.alias || userDoc?.name || "User")
        : (userDoc?.name || user.displayName || "User");

      const selectedCat = categories.find((c) => c.slug === categorySlug);

      const docRef = await addDoc(collection(db, "posts"), {
        title: title.trim(),
        body: body.trim(),
        categorySlug,
        categoryName: selectedCat?.name || "",
        authorUid: user.uid,
        authorAlias,
        isAnonymous,
        isAlias,
        images: imageUrls,
        upvotes: 0,
        downvotes: 0,
        commentsCount: 0,
        views: 0,
        shares: 0,
        status: "active",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      router.push(`/post/${docRef.id}`);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const canAddMore = images.length < MAX_IMAGES;

  return (
    <Shell>
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Identity Selector */}
          <div className="card p-5">
            <div className="text-sm font-semibold text-white mb-3">Post as</div>
            <div className="grid grid-cols-3 gap-2">
              {IDENTITY_OPTIONS.map(({ key, icon: Icon, label, desc, color, activeColor }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setIdentity(key)}
                  className={`rounded-xl border p-3 text-left transition ${
                    identity === key ? activeColor : color
                  }`}
                >
                  <Icon className={`h-5 w-5 mb-2 ${
                    identity === key
                      ? key === "alias" ? "text-blue-400" : key === "anonymous" ? "text-purple-400" : "text-white"
                      : "text-white/40"
                  }`} />
                  <div className={`text-sm font-semibold ${identity === key ? "text-white" : "text-white/60"}`}>{label}</div>
                  <div className="text-xs text-white/30 mt-0.5 leading-tight">{desc}</div>
                </button>
              ))}
            </div>
            {identity !== "realname" && (
              <div className="mt-3 rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-xs text-white/50">
                {identity === "alias"
                  ? `Posting as alias: "${userDoc?.alias || userDoc?.name || "User"}"`
                  : "Posting anonymously — no name or profile link will be shown."}
              </div>
            )}
          </div>

          {/* Title + Category */}
          <div className="card p-5 space-y-4">
            <div>
              <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">Title</label>
              <input
                id="postTitle"
                name="postTitle"
                className="input mt-1 text-base"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What's on your mind?"
                maxLength={200}
              />
              <div className="text-right text-xs text-white/20 mt-1">{title.length}/200</div>
            </div>

            <div>
              <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">Category</label>
              <select
                id="category"
                name="category"
                className="input mt-1"
                value={categorySlug}
                onChange={(e) => setCategorySlug(e.target.value)}
              >
                <option value="">Select a category...</option>
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.icon} {c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">Content</label>
              <textarea
                id="postBody"
                name="postBody"
                className="textarea mt-1"
                rows={6}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Share your thoughts, story, or question..."
              />
              <div className="text-right text-xs text-white/20 mt-1">{body.length} chars</div>
            </div>
          </div>

          {/* Image Upload */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-semibold text-white">Images</div>
              <div className="text-xs text-white/30">{images.length}/{MAX_IMAGES} — max {MAX_SIZE_MB}MB each</div>
            </div>

            {/* Preview grid */}
            {images.length > 0 && (
              <div className="grid grid-cols-2 gap-2 mb-3">
                {images.map(({ preview }, i) => (
                  <div key={i} className="relative rounded-xl overflow-hidden aspect-video bg-white/5">
                    <img src={preview} alt="" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/70 flex items-center justify-center text-white hover:bg-black transition"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Drop zone */}
            {canAddMore && (
              <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => fileInputRef.current?.click()}
                className="rounded-xl border border-dashed border-white/20 hover:border-white/40 bg-white/[0.02] hover:bg-white/5 transition cursor-pointer p-6 text-center"
              >
                <ImagePlus className="h-7 w-7 text-white/20 mx-auto mb-2" />
                <div className="text-sm text-white/40">
                  {images.length === 0 ? "Add up to 2 images" : "Add 1 more image"}
                </div>
                <div className="text-xs text-white/20 mt-1">Click or drag & drop • JPG, PNG, GIF, WebP • Max {MAX_SIZE_MB}MB</div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => { addImages(e.target.files); e.target.value = ""; }}
                />
              </div>
            )}
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Submit */}
          <div className="flex gap-3">
            <button type="button" onClick={() => router.back()}
              className="rounded-full border border-white/20 px-5 py-2.5 text-sm text-white/60 hover:bg-white/10 transition">
              Cancel
            </button>
            <button type="submit" disabled={submitting}
              className="flex-1 rounded-full bg-white py-2.5 text-sm font-bold text-black hover:bg-neutral-200 transition disabled:opacity-50 flex items-center justify-center gap-2">
              {submitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Posting...</> : "Publish Post"}
            </button>
          </div>
        </form>
      </div>
    </Shell>
  );
}