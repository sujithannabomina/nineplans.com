"use client";

import LeftNav from "@/components/LeftNav";
import RightAds from "@/components/RightAds";

export default function Shell({ title, children }) {
  return (
    <div className="mx-auto w-full max-w-6xl px-3 md:px-4">
      <div className="grid grid-cols-12 gap-4">
        {/* Left rail */}
        <aside className="col-span-12 lg:col-span-3 xl:col-span-3 hidden lg:block">
          <LeftNav />
        </aside>

        {/* Main content */}
        <main className="col-span-12 lg:col-span-6 xl:col-span-6">
          {title ? (
            <h1 className="text-2xl md:text-3xl font-bold mb-4">{title}</h1>
          ) : null}
          {children}
        </main>

        {/* Right rail */}
        <aside className="col-span-12 lg:col-span-3 xl:col-span-3 hidden lg:block">
          <RightAds />
        </aside>
      </div>
    </div>
  );
}
