// app/search/page.jsx
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { Suspense } from 'react';
import SearchClient from '@/components/SearchClient';

export default function Page() {
  // Suspense is required around useSearchParams readers
  return (
    <Suspense fallback={<div />}>
      <SearchClient />
    </Suspense>
  );
}
