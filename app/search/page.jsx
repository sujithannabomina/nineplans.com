// app/search/page.jsx
'use client';
export const dynamic = 'force-dynamic';

import { Suspense } from 'react';
import SearchClient from './search-client';

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-4">Loading search…</div>}>
      <SearchClient />
    </Suspense>
  );
}
