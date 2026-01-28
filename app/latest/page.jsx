// app/latest/page.jsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LatestPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/?feed=latest");
  }, [router]);

  return null;
}
