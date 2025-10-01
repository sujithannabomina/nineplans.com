import LeftRail from "@/components/LeftRail";
import RightRailAd from "@/components/RightRailAd";
import Providers from "@/components/Providers";

export default function RulesPage() {
  return (
    <Providers>
      <div className="mx-auto grid max-w-6xl grid-cols-12 gap-6 px-4 py-6">
        <aside className="col-span-12 hidden md:col-span-3 md:block">
          <LeftRail />
        </aside>

        <main className="col-span-12 space-y-6 md:col-span-6">
          <h1 className="text-2xl font-bold">Community Rules</h1>

          <div className="rounded border border-neutral-800 bg-neutral-950 p-4">
            <h3 className="mb-1 font-semibold">Be respectful</h3>
            <p>No harassment, hate speech, or personal attacks. Debate ideas, not people.</p>
          </div>

          <div className="rounded border border-neutral-800 bg-neutral-950 p-4">
            <h3 className="mb-1 font-semibold">No illegal or dangerous content</h3>
            <p>Don’t post or request illegal content or instructions to cause harm.</p>
          </div>

          <div className="rounded border border-neutral-800 bg-neutral-950 p-4">
            <h3 className="mb-1 font-semibold">Protect privacy</h3>
            <p>No doxxing or sharing personal information without consent.</p>
          </div>

          <div className="rounded border border-neutral-800 bg-neutral-950 p-4">
            <h3 className="mb-1 font-semibold">No spam or scams</h3>
            <p>Self-promotion must add value and follow disclosure laws. No link spam.</p>
          </div>

          <div className="rounded border border-neutral-800 bg-neutral-950 p-4">
            <h3 className="mb-1 font-semibold">Vote & report responsibly</h3>
            <p>Upvote quality, downvote off-topic, and use report for rule violations.</p>
          </div>
        </main>

        <aside className="col-span-12 md:col-span-3">
          <RightRailAd />
        </aside>
      </div>
    </Providers>
  );
}
