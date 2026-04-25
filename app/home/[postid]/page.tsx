"use client";

import Image from "next/image";
import { notFound, useParams, useRouter } from "next/navigation";
import TopBar from "@/components/layout/TopBar";
import BottomNav from "@/components/layout/BottomNav";
import InputField from "@/components/forms/InputField";
import Button from "@/components/forms/Buttons";
import { useEffect, useMemo, useRef, useState } from "react";
import { Paperclip, Send } from "lucide-react";
// import { MOCK_LISTINGS } from "../mockListings";
import StarRating from "@/components/posts/StarRating";

export default function PostDetail() {
  function clamp(n: number, min: number, max: number) {
    return Math.min(max, Math.max(min, n));
  }
  const router = useRouter();
  const [listings, setListings] = useState<any[]>([]);
  const params = useParams<{ postid: string }>();
  const postid = params?.postid;
  const [authorName, setAuthorName] = useState("");
  const [user, setUser] = useState<any>(null);

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

  const listing = useMemo(
    () => listings.find((l) => l.id === postid),
    [postid, listings],
  );

  const ratingAvg = useMemo(() => {
      const total = user?.rating_sum ?? 0;
      const jobs = user?.jobs_num ?? 0;
      return jobs > 0 ? clamp(total / jobs, 0, 5) : 0;
    }, [user?.jobs_num, user?.rating_sum]);

  useEffect(() => {
    console.log("Current listing postid page:", listing);
    if (listing) {
      //fetch author name using listing.sellerId
      const fetchUser = async () => {
      try {
        console.log("postid page festching user with id", listing.author_id);
        const res = await fetch(
          "http://localhost:8080/api/users/get-user-by-id",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: listing.author_id }),
          },
        );
        const data = await res.json();
        setUser(data);
        if (data.type=="business") {
          setAuthorName(data.company_name);;
        } else {
          setAuthorName(data.first_name + " " + data.last_name);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } 
    };
    fetchUser();
    }
  }, [listing]);

  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  // if (!listing) notFound();

  const canSend = message.trim().length > 0 && !isSending;

  return (
    <main className="min-h-screen bg-slate-50 pb-24">
      <TopBar />

      <div className="mx-auto max-w-[650px] w-full space-y-4 px-4">
        <div className="rounded-2xl bg-white shadow-[0_10px_30px_rgba(16,24,40,0.10)]">
          <div className="relative aspect-16/10 w-full overflow-hidden rounded-t-2xl bg-slate-100">
            {/* {listing.imageSrc ? (
              <Image
                alt={listing.title}
                src={listing.imageSrc}
                fill
                className="object-cover"
                priority
              />
            ) : ( */}
              <div className="absolute inset-0 bg-linear-to-br from-slate-200 via-slate-100 to-white" />
            {/* )} */}

            <div className="absolute left-4 top-4">
              <Button
                text="← Back"
                variant="primary"
                className="mt-0 w-auto rounded-xl px-4! py-2! text-sm shadow-[0_10px_25px_rgba(23,19,109,0.25)] bg-opacity-50"
                clickEvent={() => router.push("/home")}
              />
            </div>
          </div>

          <div className="px-5 pb-6 pt-5">
            <div className="text-sm font-semibold text-slate-900">
              {listing?.title}
            </div>
            <div className="mt-1 text-2xl font-extrabold tracking-tight text-[#17136D]">
              {authorName}
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-md bg-[#F1D36B] px-2 py-1 text-[10px] font-extrabold tracking-wide text-[#17136D]">{listing?.location}</span>
              <span className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-extrabold tracking-wide text-slate-600">{listing?.type}</span>
            </div>

            {/* Rating */}
            <div className="mt-4 rounded-2xl bg-[#F1D36B]/80 p-4">
              <div className="flex justify-center items-center gap-4">
                <div>
                  <div className="text-lg font-extrabold tracking-wide text-[#17136D]">
                    USER RATING SCORE
                  </div>
                  <div className="text-[#17136D] text-center">
                    <StarRating value={
                      clamp(ratingAvg, 0, 5)
                    } />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 border-t border-slate-400 pt-5">
              <div className="text-[10px] font-semibold tracking-wide text-slate-400">
                LOOKING FOR
              </div>
              <div className="mt-2">
                {listing?.requests?.map((request: any) => (
                  <span key={request} className="inline-flex rounded-lg bg-[#D3E4FE] px-3 py-1.5 text-xs font-bold tracking-wide text-[#17136D]">
                    {request}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <div className="text-sm font-semibold text-slate-900">
                Your offer
              </div>

              <div className="flex items-center gap-3">
                <div className="flex flex-1 items-center gap-3 rounded-xl bg-white shadow-[0_10px_25px_rgba(16,24,40,0.08)]">
                  <InputField
                    value={message}
                    setContent={setMessage}
                    placeholder="Send a message..."
                    className="px-2 py-4 text-sm text-slate-700 placeholder:text-slate-400 shadow-none focus:ring-0"
                  />
                </div>

                <button
                  type="button"
                  aria-label="Send"
                  disabled={!canSend}
                  onClick={async () => {
                    if (!canSend) return;
                    setIsSending(true);
                    await new Promise((r) => setTimeout(r, 350));
                    setMessage("");
                    setIsSending(false);
                  }}
                  className={[
                    "grid h-11 w-11 place-items-center rounded-full bg-[#17136D] text-white shadow-[0_10px_25px_rgba(23,19,109,0.25)] transition active:scale-[0.99]",
                    !canSend
                      ? "cursor-not-allowed opacity-40 active:scale-100"
                      : "cursor-pointer",
                  ].join(" ")}
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
