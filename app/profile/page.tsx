"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import TopBar from "@/components/layout/TopBar";
import BottomNav from "@/components/layout/BottomNav";
import Button from "@/components/forms/Buttons";
import StarRating from "@/components/posts/StarRating";

type UserProfile = {
  id: string;
  type: "business" | "individual";
  company_name?: string;
  first_name?: string;
  last_name?: string;
  location?: string;
  credits?: number;
  rating_sum?: number;
  jobs_num?: number;
};

type TradeItem = {
  id?: string | number;
  name: string;
  description?: string;
  image_url?: string;
};

type OpenBarter = {
  id: string;
  offers: TradeItem[];
  requests: TradeItem[];
};

function displayName(user: UserProfile | null) {
  if (!user) return "Loading…";
  if (user.type === "business") return user.company_name || "Business";
  return `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim() || "User";
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export default function Profile() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");

  const [user, setUser] = useState<UserProfile | null>(null);
  const [openBarters, setOpenBarters] = useState<OpenBarter[]>([]);
  const [loadingUser, setLoadingUser] = useState(false);
  const [loadingTrades, setLoadingTrades] = useState(false);

  const [selectedBarter, setSelectedBarter] = useState<OpenBarter | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) return;
      setLoadingUser(true);
      try {
        const res = await fetch(
          "http://localhost:8080/api/users/get-user-by-id",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: userId }),
          },
        );
        const data = (await res.json()) as UserProfile;
        setUser(data);
      } catch {
        setUser(null);
      } finally {
        setLoadingUser(false);
      }
    };
    fetchUser();
  }, [userId]);

  useEffect(() => {
    const fetchOpenBarters = async () => {
      if (!userId) return;
      setLoadingTrades(true);
      try {
        const res = await fetch(
          "http://localhost:8080/api/trades/get-open-user-trades",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId }),
          },
        );
        const data = (await res.json()) as OpenBarter[];
        setOpenBarters(Array.isArray(data) ? data : []);
      } catch {
        setOpenBarters([]);
      } finally {
        setLoadingTrades(false);
      }
    };
    fetchOpenBarters();
  }, [userId]);

  const ratingAvg = useMemo(() => {
    const total = user?.rating_sum ?? 0;
    const jobs = user?.jobs_num ?? 0;
    return jobs > 0 ? clamp(total / jobs, 0, 5) : 0;
  }, [user?.jobs_num, user?.rating_sum]);

  const credits = useMemo(() => {
    const raw = typeof user?.credits === "number" ? user.credits : 0;
    return Math.max(0, raw);
  }, [user]);

  return (
    <main className="min-h-screen bg-slate-50 pb-24">
      <TopBar />

      <div className="mx-auto w-full space-y-5 px-4">
        {/* Profile card */}
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_10px_25px_rgba(16,24,40,0.08)] transition hover:shadow-[0_14px_34px_rgba(16,24,40,0.12)]">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="text-2xl font-extrabold tracking-tight text-[#17136D]">
                {displayName(user)}
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (user?.location) {
                      navigator.clipboard
                        ?.writeText(user.location)
                        .catch(() => {});
                    }
                  }}
                  className="cursor-pointer rounded-md bg-[#F1D36B] px-2 py-1 text-[10px] font-extrabold tracking-wide text-[#17136D] transition hover:brightness-95 active:scale-[0.99]"
                  title="Copy location"
                >
                  {(user?.location || "—").toUpperCase()}
                </button>
                <span className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-extrabold tracking-wide text-slate-600">
                  {(user?.type === "business"
                    ? "BUSINESS"
                    : "INDIVIDUAL"
                  ).toUpperCase()}
                </span>
              </div>
            </div>

            <button
              type="button"
              aria-label="View notifications"
              onClick={() => router.push("/messaging")}
              className="grid h-10 w-10 cursor-pointer place-items-center rounded-xl bg-white text-[#17136D] shadow-[0_10px_25px_rgba(16,24,40,0.08)] transition hover:bg-slate-50 active:scale-[0.99]"
              title="Go to messages"
            >
              🔔
            </button>
          </div>

          <div className="mt-4 rounded-2xl bg-[#F1D36B]/70 p-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-[11px] font-extrabold tracking-wide text-[#17136D]">
                  CREDIT SCORE
                </div>
                <div className="mt-1 text-3xl font-extrabold tracking-tight text-[#17136D]">
                  {loadingUser ? "…" : credits.toFixed(1)}
                </div>
              </div>
              <div className="text-center">
                <div className="text-[11px] font-extrabold tracking-wide text-[#17136D]">
                  RATING
                </div>
                <div className="mt-1 flex justify-center">
                  <StarRating
                    value={ratingAvg}
                    className="text-[#17136D]"
                    starClassName="text-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Open Barters */}
        <section className="space-y-3">
          <div className="text-2xl font-extrabold tracking-tight text-slate-900">
            Open Barters
          </div>

          {loadingTrades ? (
            <div className="rounded-2xl bg-white p-6 text-center text-sm text-slate-500 shadow-[0_10px_25px_rgba(16,24,40,0.08)]">
              Loading barters…
            </div>
          ) : openBarters.length === 0 ? (
            <div className="rounded-2xl bg-white p-6 text-center text-sm text-slate-500 shadow-[0_10px_25px_rgba(16,24,40,0.08)]">
              No open barters yet.
            </div>
          ) : (
            <div className="space-y-4">
              {openBarters.map((barter) => {
                const primaryOffer = barter.offers?.[0];
                const title = primaryOffer?.name ?? "Barter Offer";
                const subtitle = user?.location ?? "—";
                const imageSrc = primaryOffer?.image_url
                  ? `/uploads/${primaryOffer.image_url}`
                  : null;

                return (
                  <div
                    key={barter.id}
                    className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_10px_25px_rgba(16,24,40,0.08)] transition hover:-translate-y-px hover:shadow-[0_14px_34px_rgba(16,24,40,0.12)]"
                  >
                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => {}}
                        className="group relative h-37.5 w-37.5 overflow-hidden rounded-xl bg-slate-100 ring-1 ring-slate-200 transition focus:outline-none focus:ring-2 focus:ring-[#17136D]/20"
                        aria-label="View barter details"
                      >
                        {imageSrc ? (
                          // Using <img> to avoid Next/Image config for local uploads
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={imageSrc}
                            alt={title}
                            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                            loading="lazy"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-linear-to-br from-slate-200 via-slate-100 to-white" />
                        )}
                      </button>

                      <div className="min-w-0 flex-1">
                        <button
                          type="button"
                          onClick={() => setSelectedBarter(barter)}
                          className="block w-full cursor-pointer text-left"
                        >
                          <div className="truncate text-xl capitalize font-extrabold tracking-tight text-slate-900">
                            {title}
                          </div>
                          <div className="mt-0.5 text-md font-semibold text-slate-500">
                            {subtitle}
                          </div>
                        </button>

                        <div className="mt-3">
                          <Button
                            text="VIEW OFFER"
                            variant="primary"
                            clickEvent={() => {}}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>

      <BottomNav />
    </main>
  );
}
