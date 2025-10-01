// app/submit/page.jsx
import LeftRail from "@/components/LeftRail";
import RightRailAd from "@/components/RightRailAd";
import SubmitClient from "@/components/SubmitClient";
import Providers from "@/components/Providers";

export default function SubmitPage() {
  // In your app, you likely already pass session + profile via cookies.
  // Keep a simple shape here to avoid build/runtime coupling.
  const fakeSession = { uid: "", name: "" };
  const fakeProfile = { alias: "" };

  return (
    <Providers>
      <div className="mx-auto grid max-w-6xl grid-cols-12 gap-6 px-4 py-6">
        <aside className="col-span-12 hidden md:col-span-3 md:block">
          <LeftRail />
        </aside>

        <main className="col-span-12 space-y-6 md:col-span-6">
          <section className="rounded border border-neutral-800 bg-neutral-950 p-4">
            <SubmitClient session={fakeSession} profile={fakeProfile} />
          </section>
        </main>

        <aside className="col-span-12 md:col-span-3">
          <RightRailAd />
        </aside>
      </div>
    </Providers>
  );
}
