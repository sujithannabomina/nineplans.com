"use client";

import { Suspense } from "react";
import Header from "@/components/Header";
import LeftNav from "@/components/LeftNav";
import RightRail from "@/components/RightRail";

export default function Shell({ children }) {
  return (
    <div className="min-h-screen bg-black text-white">
      <Suspense fallback={null}>
        <Header />
      </Suspense>

      <div className="mx-auto max-w-7xl px-3 sm:px-4 pb-12">
        <div className="grid grid-cols-1 gap-5 pt-5 lg:grid-cols-12">
          {/* Left sidebar — hidden on mobile */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-[72px]">
              <Suspense fallback={null}>
                <LeftNav />
              </Suspense>
            </div>
          </aside>

          {/* Main content */}
          <main className="lg:col-span-6 min-w-0">
            {children}
          </main>

          {/* Right rail — hidden on mobile */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-[72px]">
              <Suspense fallback={null}>
                <RightRail />
              </Suspense>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
