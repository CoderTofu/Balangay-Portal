"use client";

import StarRating from "@/components/posts/StarRating";

type ProfileSummaryCardProps = {
  name: string;
  location: string;
  userType: "business" | "individual";
  credits: number;
  rating: number;
  loading?: boolean;
  onCopyLocation?: () => void;
  onSignOut?: () => void;
};

export default function ProfileSummaryCard({
  name,
  location,
  userType,
  credits,
  rating,
  loading = false,
  onCopyLocation,
  onSignOut,
}: ProfileSummaryCardProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_10px_25px_rgba(16,24,40,0.08)] transition hover:shadow-[0_14px_34px_rgba(16,24,40,0.12)]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="truncate text-2xl font-extrabold tracking-tight text-[#17136D]">
            {name}
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={onCopyLocation}
              title="Copy location"
              className="cursor-pointer rounded-md bg-[#F1D36B] px-2 py-1 text-[10px] font-extrabold tracking-wide text-[#17136D] transition hover:brightness-95 active:scale-[0.99]"
            >
              {location.toUpperCase()}
            </button>
            <span className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-extrabold tracking-wide text-slate-600">
              {(userType === "business"
                ? "BUSINESS"
                : "INDIVIDUAL"
              ).toUpperCase()}
            </span>
          </div>
        </div>

        <button
          type="button"
          aria-label="Sign out"
          onClick={onSignOut}
          className="cursor-pointer rounded-xl bg-[#FF5B5B] px-3 py-2 text-xs font-bold tracking-wide text-white shadow-[0_10px_25px_rgba(16,24,40,0.08)] transition hover:bg-[#ff5b5bdd] transition-all active:scale-[0.99]"
        >
          Sign out
        </button>
      </div>

      <div className="mt-4 rounded-2xl bg-[#F1D36B]/70 p-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-[11px] font-extrabold tracking-wide text-[#17136D]">
              CREDIT SCORE
            </div>
            <div className="mt-1 text-3xl font-extrabold tracking-tight text-[#17136D]">
              {loading ? "…" : credits.toFixed(1)}
            </div>
          </div>
          <div className="text-center">
            <div className="text-[11px] font-extrabold tracking-wide text-[#17136D]">
              RATING
            </div>
            <div className="mt-1 flex justify-center">
              <StarRating
                value={rating}
                className="text-[#17136D]"
                starClassName="text-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

