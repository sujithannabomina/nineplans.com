import { Suspense } from 'react';
import SubmitClient from '../../components/SubmitClient';

export const metadata = { title: 'Submit • NinePlans' };

export default function SubmitPage() {
  // Wrap client hook usage in Suspense (fixes Next warning)
  return (
    <Suspense fallback={<div className="text-zinc-400">Loading form…</div>}>
      <SubmitClient />
    </Suspense>
  );
}
