// app/rules/page.jsx
import PageShell from "@/components/PageShell";

export const metadata = { title: "Community Rules • NinePlans" };

export default function RulesPage() {
  return (
    <PageShell>
      <h1 className="text-3xl font-bold mb-6">Community Rules</h1>
      <div className="space-y-6">
        <section>
          <h3 className="text-xl font-semibold">Be respectful</h3>
          <p className="text-zinc-300">No harassment, hate speech, or personal attacks.</p>
        </section>
        <section>
          <h3 className="text-xl font-semibold">No illegal or dangerous content</h3>
          <p className="text-zinc-300">Don’t post or request illegal content or instructions to cause harm.</p>
        </section>
        <section>
          <h3 className="text-xl font-semibold">Protect privacy</h3>
          <p className="text-zinc-300">No doxxing or sharing personal information without consent.</p>
        </section>
      </div>
    </PageShell>
  );
}
