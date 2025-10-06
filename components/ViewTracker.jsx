// components/ViewTracker.jsx
'use client';

import { useEffect } from 'react';

export default function ViewTracker({ postId }) {
  useEffect(() => {
    if (!postId) return;
    fetch(`/api/post/${postId}/view`, { method: 'POST' }).catch(() => {});
  }, [postId]);
  return null;
}
