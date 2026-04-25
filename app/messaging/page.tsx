"use client";

import TopBar from "@/components/layout/TopBar";
import BottomNav from "@/components/layout/BottomNav";
import SegmentedTabs from "@/components/messaging/SegmentedTabs";
import OfferThreadCard from "@/components/messaging/OfferThreadCard";
import { useMemo } from "react";
import { MOCK_THREADS } from "./mockThreads";
import { useOfferStatuses } from "./useOfferStatuses";
import { useActiveMessagingTab } from "./useActiveMessagingTab";

export default function Messaging() {
  const { tab, setTab } = useActiveMessagingTab();
  const { getStatus } = useOfferStatuses(MOCK_THREADS);

  const threads = useMemo(
    () => MOCK_THREADS.filter((t) => t.side === tab),
    [tab],
  );

  return (
    <main className="min-h-screen bg-slate-50 pb-24">
      <TopBar />

      <div className="mx-auto w-full space-y-4 px-4">
        <SegmentedTabs
          tabs={["MY OFFERS", "THEIR OFFERS"] as const}
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
              side={t.side}
              status={getStatus(t.id, t.status)}
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
