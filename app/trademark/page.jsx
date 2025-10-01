import LeftRail from "@/components/LeftRail";
import RightRailAd from "@/components/RightRailAd";
import Providers from "@/components/Providers";

export default function TrademarkPage() {
  return (
    <Providers>
      <div className="mx-auto grid max-w-6xl grid-cols-12 gap-6 px-4 py-6">
        <aside className="col-span-12 hidden md:col-span-3 md:block">
          <LeftRail />
        </aside>

        <main className="col-span-12 space-y-6 md:col-span-6">
          <h1 className="text-2xl font-bold">Trademark Policy</h1>
          <p>
            “NinePlans”, the NinePlans logo, and related marks are trademarks or service marks of NinePlans.
            You may not use our marks in a way that confuses users or implies endorsement.
          </p>
        </main>

        <aside className="col-span-12 md:col-span-3">
          <RightRailAd />
        </aside>
      </div>
    </Providers>
  );
}
