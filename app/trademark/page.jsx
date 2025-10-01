// app/trademark/page.jsx
import LeftRail from '@/components/LeftRail';
import RightRailAd from '@/components/RightRailAd';

export const metadata = { title: 'Trademark • NinePlans' };

export default function TrademarkPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6 grid grid-cols-12 gap-6">
      <LeftRail />
      <main className="col-span-12 lg:col-span-9 xl:col-span-6 space-y-4">
        <h1 className="text-2xl font-semibold">Trademark Policy</h1>
        <p className="text-zinc-300">
          “NinePlans”, the NinePlans logo, and related marks are trademarks or service marks of NinePlans.
          Refer to our brand fairly and don’t imply sponsorship.
        </p>
      </main>
      <RightRailAd />
    </div>
  );
}
