"use client";

import Link from "next/link";

type OfferThreadCardProps = {
  id: string;
  postTitle: string;
  otherName: string;
  offerSummary: string;
};

export default function OfferThreadCard({
  id,
  postTitle,
  otherName,
  offerSummary,
}: OfferThreadCardProps) {
  return (
    <Link
      href={`/messaging/${id}`}
      className="block cursor-pointer rounded-2xl bg-white px-5 py-4 shadow-[0_10px_25px_rgba(16,24,40,0.08)] transition active:scale-[0.995]"
    >
      <div className="text-xs font-semibold text-slate-700">{postTitle}</div>
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

