"use client";

import Image from "next/image";
import { notFound, useParams, useRouter } from "next/navigation";
import TopBar from "@/components/layout/TopBar";
import BottomNav from "@/components/layout/BottomNav";
import InputField from "@/components/forms/InputField";
import Button from "@/components/forms/Buttons";
import { useMemo, useRef, useState } from "react";
import { Paperclip, Send } from "lucide-react";
import { MOCK_LISTINGS } from "../mockListings";
import StarRating from "@/components/posts/StarRating";

export default function PostDetail() {
  const router = useRouter();
  const params = useParams<{ postid: string }>();
  const postid = params?.postid;

  const listing = useMemo(
    () => MOCK_LISTINGS.find((l) => l.id === postid),
    [postid],
  );

  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  if (!listing) notFound();

  const canSend = message.trim().length > 0 && !isSending;

  return (
    <main className="min-h-screen bg-slate-50 pb-24">
      <TopBar />

      <div className="mx-auto max-w-[650px] w-full space-y-4 px-4">
        <div className="rounded-2xl bg-white shadow-[0_10px_30px_rgba(16,24,40,0.10)]">
          <div className="relative aspect-16/10 w-full overflow-hidden rounded-t-2xl bg-slate-100">
            {listing.imageSrc ? (
              <Image
                alt={listing.title}
                src={listing.imageSrc}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="absolute inset-0 bg-linear-to-br from-slate-200 via-slate-100 to-white" />
            )}

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
              {listing.title}
            </div>
            <div className="mt-1 text-2xl font-extrabold tracking-tight text-[#17136D]">
              {listing.sellerName}
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {listing.tags.map((tag) => (
                <span
                  key={tag}
                  className={
                    tag.toLowerCase() === "manila"
                      ? "rounded-md bg-[#F1D36B] px-2 py-1 text-[10px] font-extrabold tracking-wide text-[#17136D]"
                      : "rounded-md bg-slate-100 px-2 py-1 text-[10px] font-extrabold tracking-wide text-slate-600"
                  }
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Rating */}
            <div className="mt-4 rounded-2xl bg-[#F1D36B]/80 p-4">
              <div className="flex justify-center items-center gap-4">
                <div>
                  <div className="text-lg font-extrabold tracking-wide text-[#17136D]">
                    USER RATING SCORE
                  </div>
                  <div className="text-[#17136D] text-center">
                    <StarRating value={listing.stars} />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 border-t border-slate-400 pt-5">
              <div className="text-[10px] font-semibold tracking-wide text-slate-400">
                LOOKING FOR
              </div>
              <div className="mt-2">
                <span className="inline-flex rounded-lg bg-[#D3E4FE] px-3 py-1.5 text-xs font-bold tracking-wide text-[#17136D]">
                  {listing.lookingFor.toUpperCase()}
                </span>
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
