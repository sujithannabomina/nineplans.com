// app/page.jsx
"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import HomeFeed from "@/components/HomeFeed";

export default function HomePage() {
  const searchParams = useSearchParams();

  const feed = useMemo(() => {
    const v = (searchParams?.get("feed") || "").toLowerCase();
    return v === "trending" ? "trending" : "latest";
  }, [searchParams]);

  return <HomeFeed feed={feed} />;
}
