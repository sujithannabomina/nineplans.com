'use client';

import React from "react";
import Header from "@/components/Header";
import LeftNav from "@/components/LeftNav";
import RightRail from "@/components/RightRail";

export default function Shell({ q, setQ, tab, setTab, children }) {
  return (
    <div>
      <Header q={q} setQ={setQ} />
      <main className="mx-auto max-w-6xl px-3 py-6 flex gap-6">
        <LeftNav tab={tab} />
        <section className="flex-1 min-w-0">{children}</section>
        <RightRail tab={tab} setTab={setTab} />
      </main>
    </div>
  );
}
