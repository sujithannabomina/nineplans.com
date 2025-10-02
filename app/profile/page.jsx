// app/profile/page.jsx
import PageShell from "@/components/PageShell";
import ProfileClient from "@/components/ProfileClient";

export const metadata = { title: "Profile • NinePlans" };

export default function ProfilePage() {
  return (
    <PageShell>
      {/* Your existing profile boxes component */}
      <ProfileClient />
    </PageShell>
  );
}
