// app/trending/page.jsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TrendingPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/?feed=trending");
  }, [router]);

  return null;
}
