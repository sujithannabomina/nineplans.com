// components/RightRailAd.jsx
export default function RightRailAd() {
  return (
    <aside className="hidden xl:block w-72 shrink-0 sticky top-[70px] h-[calc(100vh-70px)] p-3">
      <div className="border border-neutral-800 rounded-lg p-4 text-sm">
        <div className="font-semibold mb-2">Ads</div>
        <p className="text-neutral-400">
          Ads will appear here and across the page (Auto Ads).
        </p>
      </div>
    </aside>
  );
}
