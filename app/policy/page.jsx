import Shell from "@/components/Shell";

export const metadata = {
  title: "Community Policy — NinePlans",
  description: "NinePlans community guidelines and content policy.",
};

export default function PolicyPage() {
  return (
    <Shell>
      <article className="card p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Community Policy</h1>
          <p className="text-sm text-white/40 mt-1">How we keep NinePlans safe, honest, and sustainable.</p>
        </div>

        <p className="text-sm text-white/70 leading-relaxed">
          NinePlans is built on the principle of honest, anonymous-friendly discussion. This policy explains how we handle content, protect users, maintain a safe advertising environment, and ensure platform integrity.
        </p>

        <section>
          <h2 className="text-base font-bold text-white mb-2">1. Core Principles</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              { icon: "🛡️", title: "Safety First", desc: "We prioritize user protection from harm, harassment, and threats above everything else." },
              { icon: "🔒", title: "Privacy Aware", desc: "We protect user identities. Anonymous posting is a genuine privacy feature, not a loophole." },
              { icon: "🎭", title: "Alias-First", desc: "Your alias is your public identity. Anonymous posts never reveal your identity to others." },
              { icon: "📢", title: "Ad-Safe Content", desc: "We maintain content standards required by Google AdSense to keep the platform free for all users." },
            ].map((p) => (
              <div key={p.title} className="rounded-xl border border-white/10 bg-white/5 p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span>{p.icon}</span>
                  <div className="text-sm font-semibold text-white">{p.title}</div>
                </div>
                <div className="text-xs text-white/60">{p.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-base font-bold text-white mb-2">2. Prohibited Content</h2>
          <ul className="space-y-2 text-sm text-white/70">
            {[
              "Hate speech, harassment, bullying, threats, or incitement of violence.",
              "Doxxing: sharing phone numbers, addresses, IDs, private photos, or personal data without consent.",
              "Spam, scams, phishing links, or deceptive promotions.",
              "Sexual content involving minors — immediate removal and reporting to authorities.",
              "Instructions or encouragement for self-harm, suicide, or violence.",
              "Content that violates any applicable law.",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-red-400 shrink-0 mt-0.5">✗</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-white mb-2">3. Moderation Workflow</h2>
          <div className="space-y-2">
            {[
              { status: "Active", color: "text-green-400", desc: "Visible in all feeds. Content passes guidelines." },
              { status: "Under Review", color: "text-yellow-400", desc: "Flagged by users or automated detection. Temporarily restricted pending moderator decision." },
              { status: "Removed", color: "text-red-400", desc: "Violates policy. Not shown in feeds. May be archived for legal compliance." },
            ].map((s) => (
              <div key={s.status} className="flex items-start gap-3 rounded-xl border border-white/10 p-3">
                <span className={`text-sm font-bold shrink-0 ${s.color}`}>{s.status}</span>
                <span className="text-sm text-white/60">{s.desc}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-base font-bold text-white mb-2">4. Advertising & Brand Safety</h2>
          <p className="text-sm text-white/70 leading-relaxed">
            NinePlans is funded by Google AdSense advertising. To maintain this, we restrict content that is excessively violent, hateful, explicitly sexual, or misleading. Posts under review have ads suppressed to protect advertiser safety. This does not limit your freedom of expression — it ensures the platform remains free and sustainable.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-white mb-2">5. Appeals</h2>
          <p className="text-sm text-white/70 leading-relaxed">
            If your post was removed and you believe it was a mistake, contact us at{" "}
            <a href="mailto:support@nineplans.com" className="text-white underline hover:text-white/70">support@nineplans.com</a>{" "}
            with the post link and a brief explanation. We review appeals within 48 hours.
          </p>
        </section>

        <p className="text-xs text-white/30">
          This policy may evolve. Continued use means you accept the current version.
        </p>
      </article>
    </Shell>
  );
}
