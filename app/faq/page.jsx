// app/faq/page.jsx
import PageShell from "@/components/PageShell";

export const metadata = { title: "FAQ • NinePlans" };

export default function FAQPage() {
  return (
    <PageShell>
      <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold">Do I need an account to read posts?</h3>
          <p className="text-zinc-300">
            No. Reading and searching are open to everyone. You’ll need to log in to write posts,
            like, save, or comment.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Can I post anonymously?</h3>
          <p className="text-zinc-300">
            Yes. Create an alias in Profile → Settings and choose <b>Post as: Alias</b> when submitting.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">What categories are allowed?</h3>
          <p className="text-zinc-300">
            General discussion, reviews, and ideas across our listed categories. No hate speech,
            harassment, or illegal content.
          </p>
        </div>
      </div>
    </PageShell>
  );
}
