"use client";

import "./home.css";

import TopBar from "@/components/layout/TopBar";
import BottomNav from "@/components/layout/BottomNav";
import InputField from "@/components/forms/InputField";
import PostCard from "@/components/posts/PostCard";
// import { MOCK_LISTINGS } from "./mockListings";
import { useEffect, useMemo, useState } from "react";

export default function Home() {
  
  const [listings, setListings] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<
    "All" | "Inventory" | "Service" | "Storage"
  >("All");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const tabs = ["All", "Inventory", "Storage", "Service"] as const;

  useEffect(() => {
    //fetch listings from backend
    try {
      const fetchListings = async () => {
        const res = await fetch("http://localhost:8080/api/trades/get-all-open-trades");
        const data = await res.json();
        setListings(data);
      };

      fetchListings();
    } catch (error) {
      console.error("Error fetching listings:", error);
    }
  }, []);

  useEffect(() => {
    console.log("Fetched listings:", listings);
  }, [listings]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return listings?.filter((l) => {
      const matchesTab =
        activeTab === "All" ||
        // l.tags.some((t) => t.toLowerCase() === activeTab.toLowerCase());
        l.type.toLowerCase() === activeTab.toLowerCase();

      const matchesQuery =
        q==="" ||
        l.location.toLowerCase().includes(q) ||
        // l.title.toLowerCase().includes(q) ||
        l.title.toLowerCase().includes(q) 
        // l.lookingFor.toLowerCase().includes(q) ||
      console.log("matchesTab", matchesTab, "matchesQuery", matchesQuery)
      return matchesTab && matchesQuery;
    });
  }, [activeTab, query, listings]);

  return (
    <main className="min-h-screen bg-slate-50 pb-24">
      <TopBar />

      <div className="mx-auto w-full space-y-4 mt-4 px-4 flex flex-col items-center">
        <div className="flex items-center gap-3 max-w-[650px] w-full">
          <div className="flex-1 w-full rounded-xl bg-white shadow-[0_10px_25px_rgba(16,24,40,0.08)]">
            <InputField
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search inventory or services..."
              className="w-full px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 shadow-none focus:ring-0"
            />
          </div>
        </div>

        <div className="max-w-[650px] w-full">
          <div className="flex gap-3 overflow-x-auto pb-1">
            {tabs.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setActiveTab(t)}
                className={[
                  "cursor-pointer whitespace-nowrap rounded-xl border px-4 py-2 text-sm font-semibold transition active:scale-[0.99]",
                  t === activeTab
                    ? "border-[#17136D] bg-[#17136D] text-white"
                    : "border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200",
                ].join(" ")}
              >
                {t}
              </button>
            ))}
          </div>

          <h2 className="pt-2 text-xl font-extrabold tracking-tight text-slate-900">
            Featured Listings
          </h2>

          <div className="space-y-4 pt-4">
            {filtered.map((listing) => (
              <PostCard key={listing.id} listing={listing} />
            ))}
            {filtered.length === 0 ? (
              <div className="rounded-2xl bg-white p-6 text-center text-sm text-slate-500 shadow-[0_10px_25px_rgba(16,24,40,0.08)]">
                No listings match your search.
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
