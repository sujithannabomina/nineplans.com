// components/SubmitClient.jsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signIn } from 'next-auth/react';
import { CATEGORIES } from './CategoryLinks';

const MAX_FILES = 5;
const MAX_MB = 5;
const MAX_BYTES = MAX_MB * 1024 * 1024;

export default function SubmitClient() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [postAs, setPostAs] = useState('USER');
  const [category, setCategory] = useState(CATEGORIES[0]?.name || 'Posts');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState([]);
  const [uploaded, setUploaded] = useState([]); // [{url, path}]
  const [errors, setErrors] = useState([]);
  const [info, setInfo] = useState('');
  const [alias, setAlias] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/profile', { cache: 'no-store' })
        .then(r => (r.ok ? r.json() : null))
        .then(d => setAlias(d?.alias || ''))
        .catch(() => {});
    }
  }, [status]);

  const handleFilePick = (e) => {
    const picked = Array.from(e.target.files || []);
    const all = [...files, ...picked];

    const errs = [];
    const ok = [];

    for (const f of all.slice(0, MAX_FILES)) {
      if (f.size > MAX_BYTES) { errs.push(`"${f.name}" is over ${MAX_MB}MB.`); continue; }
      if (!/^image\/(png|jpe?g|gif|webp)$/i.test(f.type)) { errs.push(`"${f.name}" not supported.`); continue; }
      ok.push(f);
    }
    setFiles(ok);
    setErrors(errs);
    e.currentTarget.value = '';
  };

  const removeSelected = (idx) => {
    const next = files.slice();
    next.splice(idx, 1);
    setFiles(next);
  };

  const previews = useMemo(() => files.map(f => ({ name: f.name, url: URL.createObjectURL(f) })), [files]);

  const uploadOne = async (file) => {
    const body = new FormData();
    body.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body });
    if (!res.ok) throw new Error('upload_failed');
    return res.json(); // { url, path }
  };

  const uploadAll = async () => {
    if (!files.length) return [];
    const out = [];
    for (const f of files) {
      // sequential helps avoid cold-start edge cases; can be Promise.all too
      const r = await uploadOne(f);
      out.push(r);
    }
    return out;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors([]); setInfo('');

    if (status !== 'authenticated') { signIn('google'); return; }
    if (!content.trim()) { setErrors(['Please write something.']); return; }
    if (postAs === 'ALIAS' && !alias) { setErrors(['You don’t have an alias yet. Create one in Settings.']); return; }

    setSubmitting(true);
    try {
      let ups = [];
      try { ups = await uploadAll(); } catch { setInfo('Some images failed to upload. Posting text only for those.'); }
      setUploaded(ups);

      const payload = {
        content,
        category,
        postAs,
        images: ups.map(u => u.url),
        imagePaths: ups.map(u => u.path),
      };

      const res = await fetch('/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(await res.text());
      const json = await res.json().catch(() => ({}));
      router.push(json?.id ? `/post/${json.id}` : '/profile');
      router.refresh();
    } catch (err) {
      setErrors([err?.message || 'Failed to post.']);
    } finally {
      setSubmitting(false);
    }
  };

  if (status !== 'authenticated') {
    return (
      <div className="rounded-xl border border-gray-800 bg-black/40 p-6">
        <h2 className="text-xl font-semibold mb-2">Log in to write a post</h2>
        <p className="text-gray-400 mb-4">You can still post using an Alias after logging in.</p>
        <button onClick={() => signIn('google')} className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-500">
          Sign in with Google
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-xl border border-gray-800 bg-black/40 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Post as</label>
          <select
            value={postAs}
            onChange={(e) => setPostAs(e.target.value)}
            className="w-full rounded-md bg-gray-900 border border-gray-800 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="USER">Account name (User)</option>
            <option value="ALIAS">Alias</option>
          </select>
          {postAs === 'ALIAS' && !alias && (
            <p className="mt-2 text-amber-400 text-sm">You don’t have an alias. <a href="/profile/settings" className="underline">Create one in Settings</a>.</p>
          )}
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-md bg-gray-900 border border-gray-800 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-600"
          >
            {CATEGORIES.map(({ name }) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-sm text-gray-400 mb-1">Your post</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
          className="w-full rounded-md bg-gray-900 border border-gray-800 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="Write your post. Links allowed. No images/videos in comments."
        />
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between">
          <label className="block text-sm text-gray-400">Images (optional) — up to {MAX_FILES} files, {MAX_MB}MB each</label>
          <label className="inline-flex items-center px-3 py-2 rounded-md bg-gray-800 text-gray-200 hover:bg-gray-700 cursor-pointer">
            <input type="file" accept="image/png,image/jpeg,image/jpg,image/gif,image/webp" multiple hidden onChange={handleFilePick} />
            Add images
          </label>
        </div>
        {previews.length > 0 && (
          <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {previews.map((p, i) => (
              <div key={p.url} className="relative rounded-md overflow-hidden border border-gray-800">
                <img src={p.url} alt={p.name} className="w-full h-28 object-cover" />
                <button
                  type="button"
                  onClick={() => removeSelected(i)}
                  className="absolute top-1 right-1 text-xs bg-black/60 hover:bg-black/80 text-white rounded px-2 py-1"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {(errors.length > 0 || info) && (
        <div className="mt-4">
          {errors.map(e => <div key={e} className="text-red-400 text-sm">{e}</div>)}
          {info && <div className="text-amber-400 text-sm">{info}</div>}
        </div>
      )}

      <div className="mt-6">
        <button type="submit" disabled={submitting || (postAs === 'ALIAS' && !alias)}
          className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
          {submitting ? 'Posting…' : 'Post'}
        </button>
      </div>
    </form>
  );
}
