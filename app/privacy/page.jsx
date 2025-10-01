// app/privacy/page.jsx
import LeftRail from '@/components/LeftRail';
import RightRailAd from '@/components/RightRailAd';

export const metadata = { title: 'Privacy • NinePlans' };

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6 grid grid-cols-12 gap-6">
      <LeftRail />
      <main className="col-span-12 lg:col-span-9 xl:col-span-6 space-y-4">
        <h1 className="text-2xl font-semibold">Privacy</h1>
        <p className="text-zinc-300">
          We respect your privacy. See our rules for what’s allowed. For posts made with an Alias,
          your public identity is hidden from other users.
        </p>
      </main>
      <RightRailAd />
    </div>
  );
}
