// app/top/saved/page.jsx
export const dynamic = 'force-dynamic';

import LeftNav from '@/components/LeftNav';
import RightRail from '@/components/RightRail';
import TopList from '@/components/TopList';

export default async function TopSavedPage() {
  return (
    <div className="container mx-auto px-3 lg:px-6 py-4">
      <div className="grid grid-cols-12 gap-4">
        <aside className="hidden lg:block col-span-12 lg:col-span-3">
          <LeftNav />
        </aside>

        <main className="col-span-12 lg:col-span-6">
          <h1 className="text-xl font-semibold mb-4">Top — Most Saved</h1>
          <TopList by="saved" />
        </main>

        <aside className="hidden lg:block col-span-12 lg:col-span-3">
          <RightRail />
        </aside>
      </div>
    </div>
  );
}
