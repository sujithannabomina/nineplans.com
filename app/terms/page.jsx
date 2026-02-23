import Shell from "@/components/Shell";

export const metadata = {
  title: "Terms and Conditions — NinePlans",
  description: "Terms and conditions for using NinePlans.",
};

export default function TermsPage() {
  return (
    <Shell>
      <article className="card p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Terms and Conditions</h1>
          <p className="text-sm text-white/40 mt-1">Last updated: January 2025</p>
        </div>

        <p className="text-sm text-white/70 leading-relaxed">
          Welcome to NinePlans. By accessing or using this website, you agree to be bound by these Terms and Conditions. Please read them carefully before using the platform.
        </p>

        <section>
          <h2 className="text-base font-bold text-white mb-2">1. Acceptance of Terms</h2>
          <p className="text-sm text-white/70 leading-relaxed">
            By creating an account or using NinePlans in any way, you confirm that you are at least 13 years old and that you accept these Terms and Conditions. If you do not agree, please do not use the platform.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-white mb-2">2. Description of Service</h2>
          <p className="text-sm text-white/70 leading-relaxed">
            NinePlans is an online community platform that allows users to post content, share opinions, comment, and interact with other users. The platform supports both named and anonymous posting.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-white mb-2">3. User Accounts</h2>
          <ul className="space-y-1.5 text-sm text-white/70">
            <li>• You are responsible for maintaining the security of your account.</li>
            <li>• You must provide accurate information when registering.</li>
            <li>• You may not transfer your account to another person.</li>
            <li>• You are responsible for all activity that occurs under your account.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-white mb-2">4. User Content</h2>
          <p className="text-sm text-white/70 leading-relaxed mb-2">
            You are solely responsible for the content you post. By posting content, you grant NinePlans a non-exclusive, royalty-free, worldwide license to display and distribute that content on the platform.
          </p>
          <ul className="space-y-1.5 text-sm text-white/70">
            <li>• You must own or have rights to all content you post.</li>
            <li>• You must not post content that violates any applicable law.</li>
            <li>• NinePlans may remove any content at any time for any reason.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-white mb-2">5. Prohibited Uses</h2>
          <p className="text-sm text-white/70 leading-relaxed mb-2">You agree not to:</p>
          <ul className="space-y-1.5 text-sm text-white/70">
            <li>• Post hate speech, harassment, threats, or violent content.</li>
            <li>• Share personal information of others without their consent (doxxing).</li>
            <li>• Post spam, scams, or deceptive advertising.</li>
            <li>• Distribute malware, viruses, or harmful code.</li>
            <li>• Violate any applicable local, national, or international laws.</li>
            <li>• Impersonate any person or entity.</li>
            <li>• Attempt to gain unauthorized access to any part of the platform.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-white mb-2">6. Intellectual Property</h2>
          <p className="text-sm text-white/70 leading-relaxed">
            NinePlans and its logo, design, and original content are the intellectual property of NinePlans. You may not reproduce, distribute, or create derivative works without written permission.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-white mb-2">7. Disclaimer of Warranties</h2>
          <p className="text-sm text-white/70 leading-relaxed">
            NinePlans is provided "as is" without warranty of any kind. We do not guarantee that the platform will be uninterrupted, error-free, or free of viruses. We make no warranties about the accuracy or completeness of content posted by users.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-white mb-2">8. Limitation of Liability</h2>
          <p className="text-sm text-white/70 leading-relaxed">
            To the maximum extent permitted by law, NinePlans shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the platform.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-white mb-2">9. Termination</h2>
          <p className="text-sm text-white/70 leading-relaxed">
            We reserve the right to suspend or terminate your account at any time, without notice, if we believe you have violated these Terms. You may also delete your account at any time by contacting support.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-white mb-2">10. Changes to Terms</h2>
          <p className="text-sm text-white/70 leading-relaxed">
            We may update these Terms at any time. Continued use of the platform after changes are posted constitutes your acceptance of the updated Terms.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-white mb-2">11. Contact</h2>
          <p className="text-sm text-white/70">
            Questions about these Terms? Email us at{" "}
            <a href="mailto:support@nineplans.com" className="text-white underline hover:text-white/70">support@nineplans.com</a>
          </p>
        </section>
      </article>
    </Shell>
  );
}
