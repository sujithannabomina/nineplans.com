// app/faq/page.jsx
import Shell from "@/components/Shell";
import { SUPPORT_EMAIL } from "@/lib/constants";

export default function FAQPage() {
  return (
    <Shell>
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold">FAQ</h1>
        <p className="mt-2 text-sm text-gray-600">
          Common questions about NinePlans — posting, anonymity, profile, and moderation.
        </p>

        <h2 className="mt-6 text-lg font-semibold">What does “Post anonymous” mean?</h2>
        <p className="mt-2 text-sm text-gray-700">
          It means you can publish posts that do not show your alias publicly. Those posts display “Anonymous”.
        </p>

        <h2 className="mt-6 text-lg font-semibold">Can anonymous posts be moderated?</h2>
        <p className="mt-2 text-sm text-gray-700">
          Yes. Anonymous is for privacy, not rule-breaking. The platform can still enforce rules if content violates policy.
        </p>

        <h2 className="mt-6 text-lg font-semibold">What is the difference between anonymous and regular posts?</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700">
          <li><b>Anonymous:</b> shows “Anonymous” publicly.</li>
          <li><b>Regular:</b> shows your alias publicly.</li>
          <li>Both follow the same community rules.</li>
        </ul>

        <h2 className="mt-6 text-lg font-semibold">What information is stored in my profile?</h2>
        <p className="mt-2 text-sm text-gray-700">
          We collect <b>Name</b>, <b>Phone</b>, and <b>Email</b>. Email comes from Google sign-in and is read-only.
        </p>

        <h2 className="mt-6 text-lg font-semibold">How do Likes / Saves / Comments / Shares appear in my profile?</h2>
        <p className="mt-2 text-sm text-gray-700">
          Your profile shows activity sections for:
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700">
          <li><b>Liked:</b> posts you liked.</li>
          <li><b>Saved:</b> posts you saved for later.</li>
          <li><b>Commented:</b> posts where you commented.</li>
          <li><b>Shared:</b> posts you shared (and we recorded a share event).</li>
        </ul>

        <h2 className="mt-6 text-lg font-semibold">How can I contact support?</h2>
        <p className="mt-2 text-sm text-gray-700">
          Email: <b>{SUPPORT_EMAIL}</b>
        </p>
      </div>
    </Shell>
  );
}
