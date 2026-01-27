// app/policy/page.jsx
import Shell from "@/components/Shell";
import { SUPPORT_EMAIL } from "@/lib/constants";

export default function PolicyPage() {
  return (
    <Shell>
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold">Community Policy</h1>
        <p className="mt-2 text-sm text-gray-600">
          NinePlans is built for safe, alias-first discussion. You can post anonymously, but you are still responsible for what you publish.
          This policy explains what is allowed, how moderation works, and how we keep the platform advertiser-friendly.
        </p>

        <h2 className="mt-6 text-lg font-semibold">1) Core Principles</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700">
          <li><b>Safety first:</b> We prioritize protecting users from harm, harassment, and threats.</li>
          <li><b>Privacy aware:</b> Do not share personal data of yourself or others.</li>
          <li><b>Alias-first:</b> Regular posts show your alias. Anonymous posts show “Anonymous”.</li>
          <li><b>Ad-safe content:</b> Certain content will be limited or removed to keep the platform eligible for ads.</li>
        </ul>

        <h2 className="mt-6 text-lg font-semibold">2) Prohibited Content</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700">
          <li>Hate speech, harassment, bullying, threats, or incitement of violence.</li>
          <li>Doxxing: sharing phone numbers, addresses, IDs, private photos, or personal data without consent.</li>
          <li>Spam, scams, phishing links, or deceptive promotions.</li>
          <li>Explicit sexual content involving minors or any illegal content (immediate removal & reporting).</li>
          <li>Instructions or encouragement for self-harm or violence.</li>
        </ul>

        <h2 className="mt-6 text-lg font-semibold">3) Moderation Workflow</h2>
        <p className="mt-2 text-sm text-gray-700">
          When users report a post, it can be automatically flagged as <b>Under Review</b>. Under Review posts may be hidden from ads and may be
          deprioritized until a moderator decision is made.
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700">
          <li><b>Active:</b> visible in feeds.</li>
          <li><b>Under Review:</b> temporarily restricted while we verify the report.</li>
          <li><b>Removed:</b> not visible in feeds; may remain archived for compliance.</li>
        </ul>

        <h2 className="mt-6 text-lg font-semibold">4) Advertising & Brand Safety</h2>
        <p className="mt-2 text-sm text-gray-700">
          To protect AdSense eligibility, we reserve the right to limit content that is excessively violent, hateful, explicit, or misleading.
          This does not replace freedom of expression; it ensures the platform can remain sustainable and safe.
        </p>

        <h2 className="mt-6 text-lg font-semibold">5) Appeals & Contact</h2>
        <p className="mt-2 text-sm text-gray-700">
          If your post was removed incorrectly, you can contact us with the post link and a short explanation.
        </p>
        <p className="mt-2 text-sm text-gray-700">
          Email: <b>{SUPPORT_EMAIL}</b>
        </p>

        <p className="mt-6 text-xs text-gray-500">
          This policy may evolve over time. Continued use of the platform means you accept the updated policy.
        </p>
      </div>
    </Shell>
  );
}
