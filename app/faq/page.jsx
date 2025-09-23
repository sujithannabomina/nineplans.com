<<<<<<< HEAD
export const metadata = { title: 'FAQ • NinePlans' };

const QA = ({ q, a }) => (
  <details className="group rounded-lg border border-zinc-800 bg-zinc-950 p-4">
    <summary className="cursor-pointer list-none text-lg font-semibold">
      {q}
    </summary>
    <div className="mt-2 text-zinc-300">{a}</div>
  </details>
);

export default function FAQPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold">FAQ</h1>

      <QA q="What is NinePlans?"
          a="A place to share ideas and experiences. Post with your real name or an alias." />
      <QA q="Do I need an account to read posts?"
          a="No. You can read freely. Sign in to interact or post." />
      <QA q="How does real name vs alias work?"
          a="By default we show your Google display name. You can set an alias in Profile → Settings and post as that." />
      <QA q="How do I log in?"
          a="Use the Login button in the top-right. We support Google sign-in." />
      <QA q="What can I post? Any limits?"
          a="Keep it legal and respectful. See our Policy for details." />
      <QA q="What are the categories?"
          a="Confessions, Posts, reviews, places, sports, and more in the left sidebar." />
    </div>
  );
}
=======
export const metadata = { title: 'FAQ • NinePlans' };

const QA = ({ q, a }) => (
  <details className="group rounded-lg border border-zinc-800 bg-zinc-950 p-4">
    <summary className="cursor-pointer list-none text-lg font-semibold">
      {q}
    </summary>
    <div className="mt-2 text-zinc-300">{a}</div>
  </details>
);

export default function FAQPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold">FAQ</h1>

      <QA q="What is NinePlans?"
          a="A place to share ideas and experiences. Post with your real name or an alias." />
      <QA q="Do I need an account to read posts?"
          a="No. You can read freely. Sign in to interact or post." />
      <QA q="How does real name vs alias work?"
          a="By default we show your Google display name. You can set an alias in Profile → Settings and post as that." />
      <QA q="How do I log in?"
          a="Use the Login button in the top-right. We support Google sign-in." />
      <QA q="What can I post? Any limits?"
          a="Keep it legal and respectful. See our Policy for details." />
      <QA q="What are the categories?"
          a="Confessions, Posts, reviews, places, sports, and more in the left sidebar." />
    </div>
  );
}
>>>>>>> 724b0ef (Initial commit from local working folder)
