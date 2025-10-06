'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export default function Comments({ postId }) {
  const { data: session } = useSession();
  const [list, setList] = useState([]);
  const [text, setText] = useState('');
  const [useAlias, setUseAlias] = useState(true);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  async function load() {
    const res = await fetch(`/api/post/${postId}/comments`, { cache: 'no-store' });
    const j = await res.json();
    setList(Array.isArray(j?.comments) ? j.comments : []);
  }
  useEffect(() => { if (postId) load().catch(()=>{}); }, [postId]);

  function authHeaders() {
    const headers = { 'content-type': 'application/json' };
    const uid = session?.user?.id || session?.user?.email || '';
    const email = session?.user?.email || '';
    if (uid) headers['x-np-uid'] = String(uid);
    if (email) headers['x-np-email'] = String(email);
    return headers;
  }

  async function submitComment(e) {
    e.preventDefault();
    if (!text.trim()) return;
    setLoading(true);
    try {
      const headers = authHeaders();
      headers['x-np-use-alias'] = useAlias ? '1' : '0';
      const res = await fetch(`/api/post/${postId}/comments`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ text }),
      });
      const j = await res.json();
      if (j?.ok) { setText(''); await load(); }
      else alert(j?.error || 'Failed to post comment');
    } finally { setLoading(false); }
  }

  async function remove(id) {
    const res = await fetch(`/api/comments/${id}`, { method: 'DELETE', headers: authHeaders() });
    const j = await res.json();
    if (j?.ok) setList(cur => cur.filter(c => c.id !== id));
    else alert(j?.error || 'Failed to delete');
  }

  function startEdit(c){ setEditingId(c.id); setEditText(c.text || ''); }
  function cancelEdit(){ setEditingId(null); setEditText(''); }
  async function saveEdit(id) {
    if (!editText.trim()) return;
    const res = await fetch(`/api/comments/${id}`, {
      method: 'PATCH',
      headers: authHeaders(),
      body: JSON.stringify({ text: editText }),
    });
    const j = await res.json();
    if (j?.ok) { setList(cur => cur.map(c => c.id === id ? { ...c, text: editText } : c)); cancelEdit(); }
    else alert(j?.error || 'Failed to update');
  }

  const myId = session?.user?.id || session?.user?.email || '';
  const myEmail = session?.user?.email || '';

  return (
    <section className="mt-6">
      <h3 className="font-semibold mb-2">Comments</h3>

      <form onSubmit={submitComment} className="mb-4 space-y-2">
        <textarea
          className="w-full border rounded-lg p-3 text-sm"
          rows={3}
          placeholder="Write a comment…"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={useAlias} onChange={(e)=>setUseAlias(e.target.checked)} />
            Post as alias
          </label>
          <button type="submit" disabled={loading} className="px-3 py-1 rounded-lg border hover:bg-gray-50 disabled:opacity-50">
            {loading ? 'Posting…' : 'Post'}
          </button>
        </div>
      </form>

      <ul className="space-y-3">
        {list.map((c) => {
          const mine = !!(
            (myId && (myId === c.uid || myId === c.email)) ||
            (myEmail && myEmail === c.email)
          );
          return (
            <li key={c.id} className="border rounded-xl p-3">
              <div className="text-sm">
                <span className="font-medium">{c.displayName || 'someone'}</span>
                <span className="text-gray-500 text-xs"> · {new Date(c.createdAt?._seconds ? c.createdAt._seconds * 1000 : c.createdAt || Date.now()).toLocaleString()}</span>
              </div>

              {editingId === c.id ? (
                <div className="mt-2 space-y-2">
                  <textarea className="w-full border rounded-lg p-2 text-sm" rows={3} value={editText} onChange={(e)=>setEditText(e.target.value)} />
                  <div className="flex gap-2">
                    <button type="button" onClick={()=>saveEdit(c.id)} className="px-3 py-1 rounded-lg border hover:bg-gray-50">Save</button>
                    <button type="button" onClick={cancelEdit} className="px-3 py-1 rounded-lg border hover:bg-gray-50">Cancel</button>
                  </div>
                </div>
              ) : (
                <p className="text-sm mt-1 whitespace-pre-wrap">{c.text}</p>
              )}

              {mine && editingId !== c.id && (
                <div className="mt-2 flex gap-3 text-xs">
                  <button onClick={()=>startEdit(c)} className="text-blue-600 hover:underline">Edit</button>
                  <button onClick={()=>remove(c.id)} className="text-red-600 hover:underline">Delete</button>
                </div>
              )}
            </li>
          );
        })}
        {!list.length && <li className="text-sm text-gray-500">No comments yet.</li>}
      </ul>
    </section>
  );
}
