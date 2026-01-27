// components/Shell.jsx
"use client";

import { Suspense } from "react";
import Header from "@/components/Header";
import LeftNav from "@/components/LeftNav";
import RightRail from "@/components/RightRail";

export default function Shell({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Suspense prevents Vercel build failures if any child uses useSearchParams() */}
      <Suspense fallback={null}>
        <Header />
      </Suspense>

      <div className="mx-auto max-w-7xl px-4 pb-10">
        <div className="grid grid-cols-1 gap-6 pt-6 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <Suspense fallback={null}>
              <LeftNav />
            </Suspense>
          </aside>

          <main className="lg:col-span-6">{children}</main>

          <aside className="lg:col-span-3">
            <Suspense fallback={null}>
              <RightRail />
            </Suspense>
          </aside>
        </div>
      </div>
    </div>
  );
}
