// app/profile/settings/page.jsx
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { Suspense } from 'react';
import ProfileClient from '@/components/ProfileClient';

export default function Page() {
  return (
    <Suspense fallback={<div />}>
      {/* ProfileClient can ignore props if it doesn't use them */}
      <ProfileClient view="settings" />
    </Suspense>
  );
}
