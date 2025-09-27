// app/submit/page.jsx
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { Suspense } from 'react';
import SubmitClient from '@/components/SubmitClient';

export default function Page() {
  return (
    <Suspense fallback={<div />}>
      <SubmitClient />
    </Suspense>
  );
}
