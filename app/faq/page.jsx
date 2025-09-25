// app/faq/page.jsx
export const metadata = { title: "FAQ • NinePlans" };

const QA = ({ q, a }) => (
  <div className="rounded-lg border border-white/10 bg-black/30 p-4">
    <h3 className="font-semibold">{q}</h3>
    <p className="mt-1 text-zinc-300">{a}</p>
  </div>
);

export default function FaqPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Frequently Asked Questions</h1>
      <QA
        q="Do I need an account to read posts?"
        a="No. Reading and searching are open to everyone. You’ll need to log in to write posts, like, save, or comment."
      />
      <QA
        q="Can I post anonymously?"
        a="Yes. Set an alias in Profile → Settings and choose 'Post as: Alias' when submitting."
      />
      <QA
        q="What categories are allowed?"
        a="General discussion, reviews, and ideas across our listed categories. Hate speech, harassment, and illegal content are not allowed."
      />
    </div>
  );
}
