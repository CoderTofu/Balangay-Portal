"use client";

import TopBar from "@/components/layout/TopBar";
import BottomNav from "@/components/layout/BottomNav";
import SegmentedTabs from "@/components/messaging/SegmentedTabs";
import OfferThreadCard from "@/components/messaging/OfferThreadCard";
import { useMemo, useState } from "react";
import { MOCK_THREADS, type OfferSide } from "./mockThreads";

export default function Messaging() {
  const [tab, setTab] = useState<OfferSide>("my");

  const threads = useMemo(
    () => MOCK_THREADS.filter((t) => t.side === tab),
    [tab],
  );

  return (
    <main className="min-h-screen bg-slate-50 pb-24">
      <TopBar />

      <div className="mx-auto w-full max-w-[420px] space-y-4 px-4">
        <SegmentedTabs
          tabs={["my", "their"] as const}
          value={tab}
          onChange={setTab}
        />

        <div className="space-y-4">
          {threads.map((t) => (
            <OfferThreadCard
              key={t.id}
              id={t.id}
              postTitle={t.postTitle}
              otherName={t.otherName}
              offerSummary={t.offerSummary}
            />
          ))}
          {threads.length === 0 ? (
            <div className="rounded-2xl bg-white p-6 text-center text-sm text-slate-500 shadow-[0_10px_25px_rgba(16,24,40,0.08)]">
              No offers here yet.
            </div>
          ) : null}
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
