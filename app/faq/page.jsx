// app/faq/page.jsx
import LeftRail from '@/components/LeftRail';
import RightRailAd from '@/components/RightRailAd';

export const metadata = { title: 'FAQ • NinePlans' };

export default function FAQPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6 grid grid-cols-12 gap-6">
      <LeftRail />
      <main className="col-span-12 lg:col-span-9 xl:col-span-6 space-y-6">
        <h1 className="text-2xl font-semibold">Frequently Asked Questions</h1>

        <section>
          <h2 className="font-semibold mb-1">Do I need an account to read posts?</h2>
          <p className="text-zinc-300">No. Reading and searching are open to everyone. You’ll need to log in to write posts, like, save, or comment.</p>
        </section>

        <section>
          <h2 className="font-semibold mb-1">Can I post anonymously?</h2>
          <p className="text-zinc-300">
            Yes. Create an Alias in Profile → Settings and choose <em>Post as: Alias</em> on the submit form.
          </p>
        </section>

        <section>
          <h2 className="font-semibold mb-1">What categories are allowed?</h2>
          <p className="text-zinc-300">
            General discussion, reviews, and ideas across our listed categories. Hate speech, harassment, and illegal content are not allowed.
          </p>
        </section>
      </main>
      <RightRailAd />
    </div>
  );
}
