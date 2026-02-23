import Shell from "@/components/Shell";
import Link from "next/link";

export const metadata = {
  title: "FAQ — NinePlans",
  description: "Frequently asked questions about NinePlans.",
};

const FAQS = [
  {
    q: "What is NinePlans?",
    a: "NinePlans is a community platform where you can post anything — confessions, reviews, discussions, and more — while staying anonymous if you choose. Think of it as a place for honest, open conversation.",
  },
  {
    q: "Is NinePlans free to use?",
    a: "Yes, completely free. You can read all posts without signing in. Creating an account to post, comment, like, and save is also free.",
  },
  {
    q: "How does anonymous posting work?",
    a: "When you create a post, you can choose to post as 'Anonymous'. This means other users will only see 'Anonymous' — not your real name or alias. Your identity is hidden from the public, but the platform still maintains records for moderation.",
  },
  {
    q: "What is an Alias?",
    a: "An alias is a public display name you choose when you don't want to post anonymously but also don't want to show your real name. You set it in your profile settings. For example: 'NightOwl99'.",
  },
  {
    q: "Do I need an account to read posts?",
    a: "No. All posts are publicly visible without an account. You only need to sign in to create posts, comment, like, save, or share.",
  },
  {
    q: "How do I sign in?",
    a: "Click 'Sign in' in the top right corner and choose 'Continue with Google'. We use Google for secure, password-free login.",
  },
  {
    q: "What categories can I post in?",
    a: "We have 22 categories including Confessions, Sports, Science, Movie Reviews, Product Reviews, Anime, Games, Technology, Relationships, and more. You can see all categories at nineplans.com/categories.",
  },
  {
    q: "Can I upload images in my post?",
    a: "Currently posts support text content. Image upload support is coming soon.",
  },
  {
    q: "What happens when I report a post?",
    a: "The post is flagged for moderator review. While under review, the post may be temporarily restricted. Our team usually reviews reports within 24 hours.",
  },
  {
    q: "Can I delete my account?",
    a: "Yes. Contact support@nineplans.com with your request and we will delete your account and associated data within 30 days.",
  },
  {
    q: "Are there ads on NinePlans?",
    a: "Yes, we display ads via Google AdSense to keep the platform free. Ads are non-intrusive and help us cover server costs.",
  },
  {
    q: "How do I contact support?",
    a: "Email us at support@nineplans.com. We usually respond within 24–72 hours.",
  },
];

export default function FAQPage() {
  return (
    <Shell>
      <article className="card p-6 space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Frequently Asked Questions</h1>
          <p className="text-sm text-white/40 mt-1">Everything you need to know about NinePlans.</p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <h2 className="text-sm font-bold text-white mb-1.5">Q: {faq.q}</h2>
              <p className="text-sm text-white/70 leading-relaxed">A: {faq.a}</p>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-white/10 p-4 text-center">
          <p className="text-sm text-white/60">
            Still have questions?{" "}
            <Link href="/contact" className="text-white underline hover:text-white/70">Contact us</Link> and we'll help you out.
          </p>
        </div>
      </article>
    </Shell>
  );
}
