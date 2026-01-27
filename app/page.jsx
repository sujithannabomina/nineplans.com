// app/page.jsx
import { Suspense } from "react";
import HomeClient from "./home-client";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="rounded-2xl border bg-white p-6 text-sm text-gray-600 shadow-sm">
          Loading… <div className="text-xs text-gray-500">Fetching fresh posts.</div>
        </div>
      }
    >
      <HomeClient />
    </Suspense>
  );
}
