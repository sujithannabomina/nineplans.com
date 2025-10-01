import LeftRail from "@/components/LeftRail";
import RightRailAd from "@/components/RightRailAd";
import Providers from "@/components/Providers";

export default function FAQPage() {
  return (
    <Providers>
      <div className="mx-auto grid max-w-6xl grid-cols-12 gap-6 px-4 py-6">
        <aside className="col-span-12 hidden md:col-span-3 md:block">
          <LeftRail />
        </aside>

        <main className="col-span-12 space-y-6 md:col-span-6">
          <h1 className="text-2xl font-bold">Frequently Asked Questions</h1>

          <div className="rounded border border-neutral-800 bg-neutral-950 p-4">
            <h3 className="mb-1 font-semibold">Do I need an account to read posts?</h3>
            <p>No. Reading and searching are open to everyone. You’ll need to log in to write posts, like, save, or comment.</p>
          </div>

          <div className="rounded border border-neutral-800 bg-neutral-950 p-4">
            <h3 className="mb-1 font-semibold">Can I post anonymously?</h3>
            <p>Yes. Set an alias in Profile → Settings and choose “Post as: Alias” when submitting.</p>
          </div>

          <div className="rounded border border-neutral-800 bg-neutral-950 p-4">
            <h3 className="mb-1 font-semibold">What categories are allowed?</h3>
            <p>General discussion, reviews, and ideas across our listed categories. Hate speech, harassment, and illegal content are not allowed.</p>
          </div>
        </main>

        <aside className="col-span-12 md:col-span-3">
          <RightRailAd />
        </aside>
      </div>
    </Providers>
  );
}
