export const dynamic = 'force-dynamic';

import Feed from '@/components/Feed';
import WritePostCTA from '@/components/WritePostCTA';

export default function HomePage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Recent Posts</h1>
        <WritePostCTA />
      </div>
      <Feed />
    </div>
  );
}
