import Shell from "@/components/Shell";
import Link from "next/link";

export const metadata = {
  title: "Contact — NinePlans",
  description: "Contact NinePlans support: report issues, request help, and ask moderation questions.",
};

function InfoRow({ label, value }) {
  return (
    <div className="grid gap-1 sm:grid-cols-[160px_1fr] sm:items-start">
      <div className="text-sm font-medium text-black/70">{label}</div>
      <div className="text-sm text-black/80">{value}</div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Shell>
      <div className="rounded-2xl border bg-white p-6 shadow-sm space-y-6">
        <div>
          <h1 className="text-xl font-semibold">Contact</h1>
          <p className="mt-1 text-sm text-black/60">
            If you need help with your account, posts, moderation, or reporting abuse, use the details below.
          </p>
        </div>

        <div className="space-y-4">
          <InfoRow label="Support email" value="support@nineplans.com" />
          <InfoRow label="Abuse / reporting" value="report@nineplans.com" />
          <InfoRow label="Business inquiries" value="business@nineplans.com" />
          <InfoRow label="Response time" value="Usually within 24–72 hours." />
        </div>

        <div className="rounded-xl bg-neutral-50 border p-4">
          <div className="font-medium">Before contacting us</div>
          <ul className="mt-2 list-disc pl-5 text-sm text-black/70 space-y-1">
            <li>Include the post URL (if applicable)</li>
            <li>Describe what you expected vs what happened</li>
            <li>Add screenshots if possible</li>
          </ul>
        </div>

        <div className="text-sm">
          <Link href="/faq" className="underline">
            Read FAQ
          </Link>{" "}
          or review{" "}
          <Link href="/rules" className="underline">
            Rules
          </Link>{" "}
          and{" "}
          <Link href="/policy" className="underline">
            Policy
          </Link>
          .
        </div>
      </div>
    </Shell>
  );
}
