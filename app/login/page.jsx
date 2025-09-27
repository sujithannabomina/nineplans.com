// app/login/page.jsx
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { Suspense } from 'react';
import LoginClient from './LoginClient';

export default function Page() {
  return (
    <Suspense fallback={<div />}>
      <LoginClient />
    </Suspense>
  );
}
