// components/Shell.jsx
"use client";

import { Suspense } from "react";
import Header from "@/components/Header";
import LeftNav from "@/components/LeftNav";
import RightRail from "@/components/RightRail";

export default function Shell({ children }) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Suspense fallback={null}>
        <Header />
      </Suspense>

      {/* 
        Fix #5: narrower left (col-span-2 from 3), wider center (col-span-7 from 6)
        Total = 2 + 7 + 3 = 12 columns
      */}
      <div className="mx-auto max-w-7xl px-3 sm:px-4 pb-12">
        <div className="grid grid-cols-1 gap-4 pt-4 lg:grid-cols-12">

          {/* Left sidebar — narrowed */}
          <aside className="hidden lg:block lg:col-span-2">
            <div className="sticky top-[68px]">
              <Suspense fallback={null}>
                <LeftNav />
              </Suspense>
            </div>
          </aside>

          {/* Center feed — wider */}
          <main className="lg:col-span-7 min-w-0">
            {children}
          </main>

          {/* Right rail */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-[68px]">
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