// components/EngagementButtons.jsx
'use client';

import { useMemo, useState } from 'react';
import { useSession } from 'next-auth/react';

export default function EngagementButtons({ postId, counts = {} }) {
  const { data: session } = useSession();
  const [like, setLike] = useState(counts.likeCount || 0);
  const [save, setSave] = useState(counts.saveCount || 0);

  const uid = session?.user?.id || session?.user?.email || '';
  const email = session?.user?.email || '';

  const headers = useMemo(() => {
    const h = { 'content-type': 'application/json' };
    if (uid) h['x-np-uid'] = String(uid);
    if (email) h['x-np-email'] = String(email);
    return h;
  }, [uid, email]);

  async function hit(path, setter) {
    try {
      const res = await fetch(path, { method: 'POST', headers });
      const j = await res.json();
      if (j?.counts !== undefined) setter(j.counts);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => hit(`/api/post/${postId}/like`, setLike)}
        className="px-3 py-1 rounded-lg border hover:bg-gray-50"
        aria-label="Like"
      >
        ❤️ {like}
      </button>
      <button
        type="button"
        onClick={() => hit(`/api/post/${postId}/save`, setSave)}
        className="px-3 py-1 rounded-lg border hover:bg-gray-50"
        aria-label="Save"
      >
        💾 {save}
      </button>
    </div>
  );
}
