<<<<<<< HEAD
export const metadata = { title: 'Community Rules • NinePlans' };

const Card = ({ title, children }) => (
  <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
    <div className="font-semibold mb-2">{title}</div>
    <div className="text-zinc-300 text-sm">{children}</div>
  </div>
);

export default function RulesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold">Community Rules</h1>

      <Card title="Keep it human. No hate or harassment.">
        Debate ideas, not people. Targeted insults, slurs, and encouragement of self-harm are not allowed.
      </Card>
      <Card title="No sexual content involving minors or non-consensual acts.">
        Zero tolerance. This includes suggestive content of minors and sexual violence.
      </Card>
      <Card title="Protect privacy. No doxxing.">
        Don’t share private info like addresses, phone numbers, IDs, medical or financial records without consent.
      </Card>
      <Card title="No illegal or dangerous activity.">
        Don’t promote violence, terrorism, hacking, buying/selling illegal goods, or instructions to commit crimes.
      </Card>
    </div>
  );
}
=======
export const metadata = { title: 'Community Rules • NinePlans' };

const Card = ({ title, children }) => (
  <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
    <div className="font-semibold mb-2">{title}</div>
    <div className="text-zinc-300 text-sm">{children}</div>
  </div>
);

export default function RulesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold">Community Rules</h1>

      <Card title="Keep it human. No hate or harassment.">
        Debate ideas, not people. Targeted insults, slurs, and encouragement of self-harm are not allowed.
      </Card>
      <Card title="No sexual content involving minors or non-consensual acts.">
        Zero tolerance. This includes suggestive content of minors and sexual violence.
      </Card>
      <Card title="Protect privacy. No doxxing.">
        Don’t share private info like addresses, phone numbers, IDs, medical or financial records without consent.
      </Card>
      <Card title="No illegal or dangerous activity.">
        Don’t promote violence, terrorism, hacking, buying/selling illegal goods, or instructions to commit crimes.
      </Card>
    </div>
  );
}
>>>>>>> 724b0ef (Initial commit from local working folder)
