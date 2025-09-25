import { Suspense } from "react";
import ProfileSettingsClient from "./ProfileSettingsClient";

export const metadata = { title: "Profile settings • NinePlans" };

export default function Page() {
  return (
    <Suspense fallback={<div className="px-2 py-4 text-zinc-400">Loading settings…</div>}>
      <ProfileSettingsClient />
    </Suspense>
  );
}
