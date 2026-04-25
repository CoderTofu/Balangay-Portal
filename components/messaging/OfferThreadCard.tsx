"use client";

import Link from "next/link";
import type { OfferSide, OfferStatus } from "@/app/messaging/mockThreads";

type OfferThreadCardProps = {
  id: string;
  postTitle: string;
  otherName: string;
  offerSummary: string;
  side: OfferSide;
  status: OfferStatus;
};

function statusLabel(side: OfferSide, status: OfferStatus) {
  if (status === "ACCEPTED") return "ACCEPTED";
  if (status === "REJECTED") return "REJECTED";
  return side === "MY OFFERS" ? "WAITING FOR RESPONSE" : "WAITING FOR YOU";
}

function statusStyles(status: OfferStatus) {
  if (status === "ACCEPTED") return "bg-emerald-50 text-emerald-700 ring-emerald-200";
  if (status === "REJECTED") return "bg-rose-50 text-rose-700 ring-rose-200";
  return "bg-slate-50 text-slate-600 ring-slate-200";
}

export default function OfferThreadCard({
  id,
  postTitle,
  otherName,
  offerSummary,
  side,
  status,
}: OfferThreadCardProps) {
  return (
    <Link
      href={`/messaging/${id}`}
      className="block cursor-pointer rounded-2xl bg-white px-5 py-4 shadow-[0_10px_25px_rgba(16,24,40,0.08)] transition hover:-translate-y-px hover:shadow-[0_14px_34px_rgba(16,24,40,0.12)] active:scale-[0.995]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 text-xs font-semibold text-slate-700">{postTitle}</div>
        <div
          className={[
            "shrink-0 rounded-full px-2.5 py-1 text-[10px] font-extrabold tracking-wide ring-1",
            statusStyles(status),
          ].join(" ")}
        >
          {statusLabel(side, status)}
        </div>
      </div>
      <div className="my-3 h-px w-full bg-slate-200" />

      <div className="flex items-center gap-3">
        <div className="grid h-9 w-9 place-items-center rounded-full bg-slate-100 text-slate-500">
          <span className="text-sm">👤</span>
        </div>
        <div>
          <div className="text-lg font-extrabold tracking-tight text-[#17136D]">
            {otherName}
          </div>
          <div className="text-[10px] font-extrabold tracking-wide text-slate-400">
            {offerSummary}
          </div>
        </div>
      </div>
    </Link>
  );
}

