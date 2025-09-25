import { Suspense } from "react";
import ProfileClient from "@/components/ProfileClient";

export const metadata = { title: "Profile • NinePlans" };

export default function ProfilePage() {
  return (
    <Suspense fallback={<div className="px-2 py-4 text-zinc-400">Loading profile…</div>}>
      <ProfileClient />
    </Suspense>
  );
}
