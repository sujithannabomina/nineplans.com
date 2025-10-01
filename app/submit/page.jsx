// app/submit/page.jsx
import LeftRail from '@/components/LeftRail';
import RightRailAd from '@/components/RightRailAd';
import SubmitClient from '@/components/SubmitClient';

export const metadata = { title: 'Submit • NinePlans' };

export default function SubmitPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6 grid grid-cols-12 gap-6">
      <LeftRail />
      <main className="col-span-12 lg:col-span-9 xl:col-span-6">
        <SubmitClient />
      </main>
      <RightRailAd />
    </div>
  );
}
