import Shell from "@/components/Shell";

export const metadata = {
  title: "Community Rules — NinePlans",
  description: "The rules of NinePlans community.",
};

export default function RulesPage() {
  return (
    <Shell>
      <article className="card p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Community Rules</h1>
          <p className="text-sm text-white/40 mt-1">These rules protect everyone, including you.</p>
        </div>

        <p className="text-sm text-white/70 leading-relaxed">
          NinePlans is a platform for open, honest discussion — including anonymous sharing. These rules exist to keep the community safe, respectful, and valuable for everyone.
        </p>

        <div className="space-y-4">
          {[
            {
              num: "1",
              title: "Be Respectful",
              icon: "🤝",
              rules: [
                "Debate ideas, not people.",
                "No hate speech, racism, sexism, or discrimination based on religion, nationality, or identity.",
                "No targeted harassment or bullying of any individual.",
                "Criticism is allowed — cruelty is not.",
              ],
            },
            {
              num: "2",
              title: "No Doxxing or Privacy Violations",
              icon: "🔒",
              rules: [
                "Do not share personal information about others — phone numbers, addresses, IDs, or private photos.",
                "Do not share someone's identity if they post anonymously.",
                "Do not record or screenshot private conversations without consent.",
              ],
            },
            {
              num: "3",
              title: "No Spam or Scams",
              icon: "🚫",
              rules: [
                "No repetitive or mass-posted content.",
                "No misleading promotions or get-rich-quick schemes.",
                "Ads posted in the 'Post Ads' category must be honest and clearly labeled.",
                "No phishing links, malware, or deceptive URLs.",
              ],
            },
            {
              num: "4",
              title: "Anonymous = Privacy, Not Immunity",
              icon: "🕵️",
              rules: [
                "Anonymous posting protects your identity from other users.",
                "It does not protect you from consequences for rule violations.",
                "Serious violations (illegal content, threats) can still be actioned.",
              ],
            },
            {
              num: "5",
              title: "No Illegal Content",
              icon: "⚖️",
              rules: [
                "No content that violates applicable laws.",
                "No child sexual abuse material (CSAM) — immediate removal and reporting.",
                "No instructions for illegal activities.",
                "No piracy links.",
              ],
            },
            {
              num: "6",
              title: "Use the Right Category",
              icon: "📂",
              rules: [
                "Post in the correct category so content reaches the right people.",
                "Deliberately misusing categories may result in post removal.",
              ],
            },
            {
              num: "7",
              title: "Reporting",
              icon: "🚨",
              rules: [
                "Use the Report button for genuine rule violations only.",
                "False or abuse reporting may result in restrictions.",
                "Reports are reviewed by moderators — usually within 24 hours.",
              ],
            },
          ].map((section) => (
            <div key={section.num} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{section.icon}</span>
                <h2 className="text-base font-bold text-white">Rule {section.num}: {section.title}</h2>
              </div>
              <ul className="space-y-1.5">
                {section.rules.map((r, i) => (
                  <li key={i} className="text-sm text-white/70 flex items-start gap-2">
                    <span className="text-white/30 shrink-0">→</span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="text-sm font-semibold text-white mb-1">Enforcement</div>
          <p className="text-sm text-white/70">
            Violations may result in post removal, account warning, posting restrictions, or account termination depending on severity. We aim to be fair — contact us if you think a decision was wrong.
          </p>
        </div>

        <p className="text-xs text-white/30">
          These rules may be updated over time. Continued use of the platform means you accept the current rules.
        </p>
      </article>
    </Shell>
  );
}
