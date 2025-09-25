export const metadata = { title: "Community Rules • NinePlans" };

const Card = ({ title, children }) => (
  <div className="rounded-lg border border-white/10 bg-black/30 p-4">
    <h2 className="text-lg font-semibold">{title}</h2>
    <div className="mt-2 text-zinc-300">{children}</div>
  </div>
);

export default function RulesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Community Rules</h1>

      <Card title="Be respectful">
        No harassment, hate speech, or personal attacks. Debate ideas, not people.
      </Card>

      <Card title="No illegal or dangerous content">
        Don’t post or request illegal content or instructions to cause harm.
      </Card>

      <Card title="Protect privacy">
        No doxxing or sharing personal information without consent.
      </Card>

      <Card title="No spam or scams">
        Self-promotion must add value and follow disclosure laws. No link spam.
      </Card>

      <Card title="Vote & report responsibly">
        Upvote quality, downvote off-topic, and use report for rule violations.
      </Card>
    </div>
  );
}
