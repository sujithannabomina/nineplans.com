import Shell from "@/components/Shell";
import Link from "next/link";

export const metadata = {
  title: "Contact — NinePlans",
  description: "Contact NinePlans support.",
};

export default function ContactPage() {
  return (
    <Shell>
      <article className="card p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Contact Us</h1>
          <p className="text-sm text-white/40 mt-1">We're here to help. Usually respond within 24–72 hours.</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { icon: "🛠️", title: "General Support", email: "support@nineplans.com", desc: "Account issues, bugs, general help" },
            { icon: "🚨", title: "Report Abuse", email: "report@nineplans.com", desc: "Harmful content, harassment, violations" },
            { icon: "💼", title: "Business", email: "business@nineplans.com", desc: "Advertising, partnerships, press" },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-xl mb-2">{item.icon}</div>
              <div className="text-sm font-semibold text-white mb-1">{item.title}</div>
              <a href={`mailto:${item.email}`} className="text-xs text-white/60 underline hover:text-white block mb-1">
                {item.email}
              </a>
              <div className="text-xs text-white/40">{item.desc}</div>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="text-sm font-semibold text-white mb-2">Before emailing, please include:</div>
          <ul className="space-y-1 text-sm text-white/60">
            <li>→ The post URL (if about a specific post)</li>
            <li>→ What happened and what you expected</li>
            <li>→ Your username or email</li>
            <li>→ Screenshots if relevant</li>
          </ul>
        </div>

        <div className="text-sm text-white/50">
          You can also browse our{" "}
          <Link href="/faq" className="text-white underline hover:text-white/70">FAQ</Link>,{" "}
          <Link href="/rules" className="text-white underline hover:text-white/70">Rules</Link>, or{" "}
          <Link href="/policy" className="text-white underline hover:text-white/70">Policy</Link>{" "}
          for quick answers.
        </div>
      </article>
    </Shell>
  );
}
