"use client";

import { useEffect, useMemo, useState } from "react";
import Shell from "@/components/Shell";
import useAuth from "@/hooks/useAuth";
import { listenCategories, createPost } from "@/lib/firestore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, UserCheck, EyeOff } from "lucide-react";

export default function SubmitPage() {
  const { user, userDoc, login } = useAuth();
  const router = useRouter();
  const [cats, setCats] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [categorySlug, setCategorySlug] = useState("posts");
  const [postAs, setPostAs] = useState("alias");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    const unsub = listenCategories(setCats);
    return () => unsub?.();
  }, []);

  const selectedCat = useMemo(() => cats.find((c) => c.slug === categorySlug) || null, [cats, categorySlug]);

  const realName = userDoc?.name || user?.displayName || "";
  const aliasName = userDoc?.alias || "";
  const anonPersona = userDoc?.anonName || "";

  const titleLimit = 200;
  const needsAlias = postAs === "alias" && !aliasName;
  const needsAnon = postAs === "anonymous" && !anonPersona;

  const identityOptions = [
    {
      value: "real",
      label: "Real Name",
      desc: realName || "Your full name",
      Icon: User,
      color: "text-green-300",
      borderSel: "border-green-500/40",
      bgSel: "bg-green-500/10",
      hint: realName ? `Posting as "${realName}"` : "Set your name in settings",
    },
    {
      value: "alias",
      label: "Alias",
      desc: aliasName || "⚠️ Not set yet",
      Icon: UserCheck,
      color: "text-blue-300",
      borderSel: "border-blue-500/40",
      bgSel: "bg-blue-500/10",
      hint: aliasName ? `Posting as "${aliasName}" — profile hidden` : "Set your alias in Profile Settings first",
      notSet: !aliasName,
    },
    {
      value: "anonymous",
      label: "Anonymous",
      desc: anonPersona || "No persona set",
      Icon: EyeOff,
      color: "text-purple-300",
      borderSel: "border-purple-500/40",
      bgSel: "bg-purple-500/10",
      hint: anonPersona
        ? `Posting as "${anonPersona}" — fully untraceable`
        : `Posting as "Anonymous" — set a persona in settings for a custom name`,
    },
  ];

  const activeOpt = identityOptions.find((o) => o.value === postAs);

  async function submit() {
    if (!user) return login();
    setErr("");
    if (!title.trim()) return setErr("Please add a title to your post.");
    if (!body.trim()) return setErr("Please write something in your post.");
    if (needsAlias) return setErr("You haven't set an alias yet. Go to Profile Settings to add one.");

    setBusy(true);
    try {
      const isAnonymous = postAs === "anonymous";
      const isAlias = postAs === "alias";
      let authorAlias;
      if (postAs === "real") authorAlias = realName || user.displayName || "User";
      else if (postAs === "alias") authorAlias = aliasName;
      else authorAlias = anonPersona || "Anonymous";

      const id = await createPost({
        uid: user.uid, title, body, categorySlug,
        categoryName: selectedCat?.name || "Posts",
        isAnonymous, isAlias, alias: authorAlias,
      });
      router.push(`/post/${id}`);
    } catch (e) {
      setErr(e.message || "Failed to post. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Shell>
      <div className="card p-5">
        <div className="text-xl font-bold text-white mb-1">Create a Post</div>
        <p className="text-sm text-white/50 mb-5">Share anything. Choose how you want to appear.</p>

        {!user ? (
          <div className="text-center py-8">
            <div className="text-3xl mb-3">🔐</div>
            <p className="text-white/60 text-sm mb-4">You need to be signed in to post.</p>
            <button onClick={login} className="rounded-full bg-white px-6 py-2.5 text-sm font-bold text-black hover:bg-neutral-200 transition">
              Continue with Google
            </button>
          </div>
        ) : (
          <div className="space-y-4">

            {/* Post As selector */}
            <div>
              <label className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2 block">Post As</label>
              <div className="grid grid-cols-3 gap-2">
                {identityOptions.map((opt) => {
                  const { Icon } = opt;
                  const sel = postAs === opt.value;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => setPostAs(opt.value)}
                      className={`rounded-xl border p-3 text-left transition ${
                        sel ? `${opt.borderSel} ${opt.bgSel}` : "border-white/10 hover:border-white/30 hover:bg-white/5"
                      }`}
                    >
                      <Icon className={`h-5 w-5 mb-1.5 ${sel ? opt.color : "text-white/40"}`} />
                      <div className={`text-xs font-semibold ${sel ? "text-white" : "text-white/70"}`}>{opt.label}</div>
                      <div className={`text-xs mt-0.5 truncate ${opt.notSet ? "text-red-400/70" : "text-white/40"}`}>{opt.desc}</div>
                    </button>
                  );
                })}
              </div>

              {/* Hint bar */}
              {activeOpt && (
                <div className={`mt-2 rounded-lg px-3 py-2 text-xs flex items-center gap-2 ${
                  needsAlias
                    ? "bg-red-500/10 text-red-400 border border-red-500/20"
                    : `${activeOpt.bgSel} ${activeOpt.color} border ${activeOpt.borderSel}`
                }`}>
                  <span className="flex-1">{activeOpt.hint}</span>
                  {(needsAlias || needsAnon) && (
                    <Link href="/profile/settings" className="underline font-semibold whitespace-nowrap hover:opacity-80">
                      Go to settings →
                    </Link>
                  )}
                </div>
              )}
            </div>

            {/* Title */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">Post Title *</label>
                <span className={`text-xs ${title.length > 180 ? "text-red-400" : "text-white/30"}`}>{title.length}/{titleLimit}</span>
              </div>
              <input
                className="input"
                value={title}
                onChange={(e) => setTitle(e.target.value.slice(0, titleLimit))}
                placeholder="What's on your mind?"
              />
            </div>

            {/* Category */}
            <div>
              <label className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-1 block">Category *</label>
              <select className="select" value={categorySlug} onChange={(e) => setCategorySlug(e.target.value)}>
                <option value="">Select a category...</option>
                {cats.map((c) => <option key={c.id} value={c.slug}>{c.name}</option>)}
              </select>
            </div>

            {/* Content */}
            <div>
              <label className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-1 block">Content *</label>
              <textarea
                className="textarea"
                rows={10}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Share your thoughts, story, or question…"
              />
            </div>

            {err && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">{err}</div>
            )}

            <button
              onClick={submit}
              disabled={busy || needsAlias}
              className="w-full rounded-full bg-white py-3 text-sm font-bold text-black hover:bg-neutral-200 transition disabled:opacity-50"
            >
              {busy ? "Posting…" : "🚀 Post"}
            </button>

            <p className="text-xs text-white/30 text-center">
              By posting, you agree to our{" "}
              <a href="/rules" className="underline hover:text-white">Rules</a> and{" "}
              <a href="/terms" className="underline hover:text-white">Terms</a>.
            </p>
          </div>
        )}
      </div>
    </Shell>
  );
}
