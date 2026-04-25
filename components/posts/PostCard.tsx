"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Heart } from "lucide-react";
import type { Listing } from "./types";

type PostCardProps = {
  listing: Listing;
  initiallySaved?: boolean;
  onSaveToggle?: (listingId: string, saved: boolean) => void;
  onOffer?: (listingId: string) => void;
};

export default function PostCard({
  listing,
  initiallySaved = false,
  onSaveToggle,
  onOffer,
}: PostCardProps) {
  const [saved, setSaved] = useState(initiallySaved);

  function handleSaveToggle() {
    const nextSaved = !saved;
    setSaved(nextSaved);
    onSaveToggle?.(listing.id, nextSaved);
  }

  return (
    <article className="group rounded-2xl border border-slate-300 bg-white shadow-[0_10px_30px_rgba(16,24,40,0.10)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(16,24,40,0.16)]">
      <Link
        href={`/home/${listing.id}`}
        className="block cursor-pointer overflow-hidden rounded-2xl transition  focus:outline-none focus:ring-2 focus:ring-[#17136D]/20"
      >
        <div className="relative aspect-16/10 w-full bg-slate-100">
          {listing.imageSrc ? (
            <Image
              alt={listing.title}
              src={listing.imageSrc}
              fill
              className="object-cover transition duration-300"
              priority={false}
            />
          ) : (
            <div className="absolute inset-0 bg-linear-to-br from-slate-200 via-slate-100 to-white" />
          )}
          {listing.trusted ? (
            <div className="absolute left-4 top-4 rounded-full bg-[#17136D] px-3 py-1 text-xs font-semibold text-white shadow">
              Trusted Trader
            </div>
          ) : null}
        </div>

        <div className="px-5 pb-5 pt-4">
          <h3 className="text-lg font-extrabold tracking-tight text-slate-900">
            {listing.title}
          </h3>
          <p className="mt-1 text-sm text-slate-600">{listing.sellerName}</p>

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

          <div className="mt-4 flex items-end border-t border-slate-200 pt-4 justify-between">
            <div>
              <div className="text-[10px] font-semibold tracking-wide text-slate-400">
                LOOKING FOR
              </div>
              <div className="mt-1 text-sm font-semibold text-slate-900">
                {listing.lookingFor}
              </div>
            </div>
          </div>
        </div>
      </Link>

      <div className="px-5 pb-5 -mt-1 flex items-center justify-between gap-3">
        <span className="text-xs font-semibold text-slate-500">
          {saved ? "Saved" : "Tap heart to save"}
        </span>
        <Link
          href={`/home/${listing.id}`}
          onClick={() => onOffer?.(listing.id)}
          className="inline-flex items-center justify-center rounded-xl bg-[#17136D] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(23,19,109,0.25)] transition hover:bg-[#100b56]"
        >
          Offer
        </Link>
      </div>
    </article>
  );
}
