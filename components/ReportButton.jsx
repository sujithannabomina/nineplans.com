'use client';

import { submitReport } from '@/lib/db';
import { useState } from 'react';

export default function ReportButton({ postId }) {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  if (sent) {
    return <span className="text-xs text-zinc-400">Reported</span>;
  }

  return (
    <button
      disabled={sending}
      onClick={async () => {
        setSending(true);
        try {
          await submitReport({ postId });
          setSent(true);
        } finally {
          setSending(false);
        }
      }}
      className="text-xs text-red-300 hover:text-red-200 underline disabled:opacity-60"
      aria-label="Report this post"
    >
      {sending ? 'Reporting…' : 'Report'}
    </button>
  );
}
