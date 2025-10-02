// components/RightRailAd.jsx
export default function RightRailAd() {
  return (
    <aside className="hidden lg:block w-[320px]">
      <div className="sticky top-24">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
          <h3 className="font-semibold mb-2 text-zinc-100">Ads</h3>
          <p className="text-sm text-zinc-400">
            Ads will appear here and across the page (Auto Ads).
          </p>
        </div>
      </div>
    </aside>
  );
}
