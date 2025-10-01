// app/rules/page.jsx
import LeftRail from '@/components/LeftRail';
import RightRailAd from '@/components/RightRailAd';

export const metadata = { title: 'Community Rules • NinePlans' };

export default function RulesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6 grid grid-cols-12 gap-6">
      <LeftRail />
      <main className="col-span-12 lg:col-span-9 xl:col-span-6 space-y-6">
        <h1 className="text-2xl font-semibold">Community Rules</h1>

        <section>
          <h2 className="font-semibold mb-1">Be respectful</h2>
          <p className="text-zinc-300">No harassment, hate speech, or personal attacks. Debate ideas, not people.</p>
        </section>

        <section>
          <h2 className="font-semibold mb-1">No illegal or dangerous content</h2>
          <p className="text-zinc-300">Don’t post or request illegal content or instructions to cause harm.</p>
        </section>

        <section>
          <h2 className="font-semibold mb-1">Protect privacy</h2>
          <p className="text-zinc-300">No doxxing or sharing personal information without consent.</p>
        </section>

        <section>
          <h2 className="font-semibold mb-1">No spam or scams</h2>
          <p className="text-zinc-300">Self-promotion must add value and follow disclosure laws. No link spam.</p>
        </section>
      </main>
      <RightRailAd />
    </div>
  );
}
