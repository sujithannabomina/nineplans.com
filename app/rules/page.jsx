// app/rules/page.jsx
import Shell from "@/components/Shell";

export default function RulesPage() {
  return (
    <Shell>
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold">Rules</h1>
        <p className="mt-2 text-sm text-gray-600">
          Rules exist to protect users and keep NinePlans safe, readable, and advertiser-friendly.
        </p>

        <h2 className="mt-6 text-lg font-semibold">Posting Rules</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700">
          <li>Be respectful. No harassment, hate, or threats.</li>
          <li>No doxxing. Never share private information.</li>
          <li>No spam/scams. Promotions must be honest and relevant.</li>
          <li>Use correct categories so posts reach the right audience.</li>
          <li>Illegal content is removed immediately.</li>
        </ul>

        <h2 className="mt-6 text-lg font-semibold">Anonymous Posting</h2>
        <p className="mt-2 text-sm text-gray-700">
          Anonymous posts show “Anonymous” publicly. Your account can still be moderated if rules are violated.
          Anonymous is for privacy, not for abuse.
        </p>

        <h2 className="mt-6 text-lg font-semibold">Reports & Enforcement</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700">
          <li>Reported posts can move to “Under Review”.</li>
          <li>Repeated violations may limit posting, commenting, or reporting abilities.</li>
          <li>Serious violations may lead to removal and account restriction.</li>
        </ul>

        <h2 className="mt-6 text-lg font-semibold">Commenting Rules</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700">
          <li>Debate the idea, not the person.</li>
          <li>No harassment or targeted abuse.</li>
          <li>No misleading links or phishing attempts.</li>
        </ul>

        <p className="mt-6 text-xs text-gray-500">
          Moderation decisions are made to protect the community and platform safety.
        </p>
      </div>
    </Shell>
  );
}
