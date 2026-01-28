// app/page.jsx
import { Suspense } from "react";
import HomePageClient from "./page.client";

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div className="rounded-2xl border bg-white p-6 text-sm text-gray-600 shadow-sm">
          Loading…{" "}
          <div className="text-xs text-gray-500">Preparing feed…</div>
        </div>
      }
    >
      <HomePageClient />
    </Suspense>
  );
}
