import Shell from "@/components/Shell";

export const metadata = {
  title: "Privacy Policy — NinePlans",
  description: "How NinePlans collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <Shell>
      <article className="card p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Privacy Policy</h1>
          <p className="text-sm text-white/40 mt-1">Last updated: January 2025</p>
        </div>

        <p className="text-sm text-white/70 leading-relaxed">
          NinePlans ("we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains what information we collect, how we use it, and your rights.
        </p>

        <section>
          <h2 className="text-base font-bold text-white mb-2">1. Information We Collect</h2>
          <p className="text-sm text-white/70 mb-2">We collect the following information:</p>
          <ul className="space-y-1.5 text-sm text-white/70">
            <li>• <strong className="text-white/90">Google Account Data:</strong> Name, email address, and profile photo — provided when you sign in with Google.</li>
            <li>• <strong className="text-white/90">Phone Number:</strong> Optionally provided by you in profile settings.</li>
            <li>• <strong className="text-white/90">Alias:</strong> A display name you choose for posting.</li>
            <li>• <strong className="text-white/90">Post & Comment Content:</strong> Any posts, comments, or votes you create.</li>
            <li>• <strong className="text-white/90">Usage Data:</strong> Page views, post views, and interaction events (stored anonymously).</li>
            <li>• <strong className="text-white/90">Cookies & Tracking:</strong> We use cookies and similar technologies for authentication and analytics.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-white mb-2">2. How We Use Your Information</h2>
          <ul className="space-y-1.5 text-sm text-white/70">
            <li>• To provide and maintain the platform.</li>
            <li>• To manage your account and authentication.</li>
            <li>• To display your alias on your posts (if you choose).</li>
            <li>• To improve the platform and user experience.</li>
            <li>• To serve relevant advertisements via Google AdSense.</li>
            <li>• To moderate content and enforce our community rules.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-white mb-2">3. Anonymous Posting</h2>
          <p className="text-sm text-white/70 leading-relaxed">
            When you post anonymously, your real name and alias are hidden from other users. However, your account data is still associated with that post in our system for moderation and legal compliance purposes. Anonymous posting protects your public identity, not your legal accountability.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-white mb-2">4. Google AdSense & Advertising</h2>
          <p className="text-sm text-white/70 leading-relaxed">
            We use Google AdSense to display advertisements. Google may use cookies to serve personalized ads based on your visits to this and other websites. You can opt out of personalized advertising by visiting{" "}
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener" className="text-white underline">Google Ad Settings</a>.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-white mb-2">5. Data Sharing</h2>
          <p className="text-sm text-white/70 leading-relaxed mb-2">We do not sell your personal data. We may share data with:</p>
          <ul className="space-y-1.5 text-sm text-white/70">
            <li>• <strong className="text-white/90">Firebase / Google:</strong> For authentication and data storage.</li>
            <li>• <strong className="text-white/90">Google AdSense:</strong> For serving advertisements.</li>
            <li>• <strong className="text-white/90">Law enforcement:</strong> If required by law or to protect legal rights.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-white mb-2">6. Data Retention</h2>
          <p className="text-sm text-white/70 leading-relaxed">
            We retain your data as long as your account is active. If you delete your account, your personal data will be removed within 30 days. Posts and comments may be retained for moderation and legal compliance records.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-white mb-2">7. Your Rights</h2>
          <ul className="space-y-1.5 text-sm text-white/70">
            <li>• <strong className="text-white/90">Access:</strong> Request a copy of your personal data.</li>
            <li>• <strong className="text-white/90">Correction:</strong> Update incorrect data in your profile settings.</li>
            <li>• <strong className="text-white/90">Deletion:</strong> Request account deletion by contacting support.</li>
            <li>• <strong className="text-white/90">Opt-out:</strong> Opt out of non-essential emails at any time.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-white mb-2">8. Children's Privacy</h2>
          <p className="text-sm text-white/70 leading-relaxed">
            NinePlans is not directed to children under 13. We do not knowingly collect personal information from children under 13. If we discover such data has been collected, we will delete it immediately.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-white mb-2">9. Security</h2>
          <p className="text-sm text-white/70 leading-relaxed">
            We implement industry-standard security measures including HTTPS encryption and Firebase security rules. However, no internet transmission is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-white mb-2">10. Changes to This Policy</h2>
          <p className="text-sm text-white/70 leading-relaxed">
            We may update this policy from time to time. We will notify you of significant changes by posting a notice on the website. Continued use of the platform after updates constitutes acceptance.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-white mb-2">11. Contact</h2>
          <p className="text-sm text-white/70">
            Privacy questions? Email{" "}
            <a href="mailto:support@nineplans.com" className="text-white underline hover:text-white/70">support@nineplans.com</a>
          </p>
        </section>
      </article>
    </Shell>
  );
}
