// app/submit/page.jsx
import LeftNav from "@/components/LeftNav";
import RightRailAd from "@/components/RightRailAd";
import SubmitClient from "@/components/SubmitClient";

export const dynamic = "force-dynamic";

export default function SubmitPage() {
  return (
    <main className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-2 md:px-4 lg:grid-cols-[14rem,1fr] xl:grid-cols-[14rem,1fr,18rem]">
      <LeftNav />
      <section className="px-1 py-4">
        <SubmitClient />
      </section>
      <RightRailAd />
    </main>
  );
}
