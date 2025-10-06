// app/submit/page.jsx
import LeftNav from '@/components/LeftNav';
import RightRailAd from '@/components/RightRailAd';
import SubmitClient from '@/components/SubmitClient';

export const dynamic = 'force-dynamic';

export default function SubmitPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex gap-6">
        <LeftNav />
        <main className="flex-1 min-w-0">
          <SubmitClient />
        </main>
        <aside className="hidden xl:block w-72 shrink-0">
          <RightRailAd />
        </aside>
      </div>
    </div>
  );
}
