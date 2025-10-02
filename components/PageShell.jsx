// components/PageShell.jsx
import LeftRail from "./LeftRail";
import RightRailAd from "./RightRailAd";

export default function PageShell({ children }) {
  return (
    <div className="mx-auto max-w-7xl px-4 lg:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr_320px] gap-6">
        <LeftRail />
        <main>{children}</main>
        <RightRailAd />
      </div>
    </div>
  );
}
