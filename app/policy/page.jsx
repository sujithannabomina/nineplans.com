// app/policy/page.jsx
import LeftRail from '@/components/LeftRail';
import RightRailAd from '@/components/RightRailAd';

export const metadata = { title: 'Content & Advertising Policy • NinePlans' };

export default function PolicyPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6 grid grid-cols-12 gap-6">
      <LeftRail />
      <main className="col-span-12 lg:col-span-9 xl:col-span-6 space-y-6">
        <h1 className="text-2xl font-semibold">Content & Advertising Policy</h1>
        <ul className="list-disc pl-5 space-y-2 text-zinc-300">
          <li>No hate speech, harassment, doxxing, or illegal content.</li>
          <li>Keep reviews and opinions honest; disclose material connections.</li>
          <li>Ads and self-promotion must follow local laws and be clearly labeled.</li>
          <li>Repeated or severe violations may result in account restrictions or removal of content.</li>
        </ul>
      </main>
      <RightRailAd />
    </div>
  );
}
