import Shell from "@/components/Shell";
import Link from "next/link";

export const metadata = {
  title: "About — NinePlans",
  description: "NinePlans is a free, anonymous-friendly community platform for honest discussions, reviews, confessions, and more.",
};

export default function AboutPage() {
  return (
    <Shell>
      <article className="card p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">About NinePlans</h1>
          <p className="text-sm text-white/40 mt-1">The platform built for honest, open conversation.</p>
        </div>

        <p className="text-sm text-white/70 leading-relaxed">
          NinePlans is a free community platform where anyone can post, share opinions, write reviews,
          and have real conversations — with the option to stay completely anonymous. No judgment.
          No pressure. Just honest discussion.
        </p>

        <section>
          <h2 className="text-base font-bold text-white mb-2">What is NinePlans?</h2>
          <p className="text-sm text-white/70 leading-relaxed">
            NinePlans is a community forum covering everything from confessions and product reviews
            to sports, science, anime, career advice, and more. Whether you want to share something
            privately or build a public presence with your alias, NinePlans gives you the freedom to
            choose how you show up.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-white mb-3">Why NinePlans?</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { icon: "🕵️", title: "Anonymous First", desc: "Post freely without revealing your identity. Your privacy is protected by design." },
              { icon: "🌍", title: "Global Community", desc: "Connect with people from everywhere. No borders, no barriers." },
              { icon: "📂", title: "22 Categories", desc: "From confessions to technology, find or start discussions on anything that matters to you." },
              { icon: "🆓", title: "Always Free", desc: "NinePlans is free to use. No subscriptions, no paywalls, no hidden fees." },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="text-sm font-semibold text-white mb-1">{item.title}</div>
                <div className="text-sm text-white/60">{item.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-base font-bold text-white mb-2">Our Mission</h2>
          <p className="text-sm text-white/70 leading-relaxed">
            We believe everyone deserves a space to speak freely and honestly. NinePlans was built
            to give people a place where they can share real thoughts without fear — about life,
            products, places, relationships, and everything in between.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-white mb-2">How It Works</h2>
          <div className="space-y-2">
            {[
              { step: "1", text: "Sign in with Google — free and instant." },
              { step: "2", text: "Choose your alias (public name) or post fully anonymous." },
              { step: "3", text: "Post in any of 22 categories, comment, like, and save." },
              { step: "4", text: "Build your community or just explore what others are sharing." },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                <span className="shrink-0 w-6 h-6 rounded-full bg-white text-black text-xs font-bold flex items-center justify-center">
                  {item.step}
                </span>
                <span className="text-sm text-white/70">{item.text}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-base font-bold text-white mb-2">Contact & Support</h2>
          <p className="text-sm text-white/70">
            Questions or feedback? We'd love to hear from you.{" "}
            <Link href="/contact" className="text-white underline hover:text-white/70">
              Contact us here
            </Link>
            {" "}or email{" "}
            <a href="mailto:support@nineplans.com" className="text-white underline hover:text-white/70">
              support@nineplans.com
            </a>.
          </p>
        </section>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/" className="rounded-full bg-white px-5 py-2 text-sm font-bold text-black hover:bg-neutral-200 transition">
            Browse Posts
          </Link>
          <Link href="/categories" className="rounded-full border border-white/20 px-5 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white transition">
            View Categories
          </Link>
          <Link href="/rules" className="rounded-full border border-white/20 px-5 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white transition">
            Community Rules
          </Link>
        </div>
      </article>
    </Shell>
  );
}
