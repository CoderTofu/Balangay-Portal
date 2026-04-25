"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import TopBar from "@/components/layout/TopBar";
import BottomNav from "@/components/layout/BottomNav";
import Button from "@/components/forms/Buttons";
import Modal from "@/components/ui/Modal";
import ProfileSummaryCard from "@/components/profile/ProfileSummaryCard";
import OpenBarterCard from "@/components/profile/OpenBarterCard";

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

      <div className="mx-auto w-full space-y-5 px-4 max-w-[650px]">
        <ProfileSummaryCard
          name={displayName(user)}
          location={user?.location || "—"}
          userType={user?.type ?? "individual"}
          credits={credits}
          rating={ratingAvg}
          loading={loadingUser}
          onCopyLocation={() => {
            if (!user?.location) return;
            navigator.clipboard?.writeText(user.location).catch(() => {});
          }}
          onMessageClick={() => router.push("/messaging")}
        />

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
                  <OpenBarterCard
                    key={barter.id}
                    id={barter.id}
                    title={title}
                    subtitle={subtitle}
                    imageSrc={imageSrc}
                    onOpen={() => setSelectedBarter(barter)}
                  />
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
