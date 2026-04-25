"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "../forms/Buttons";
import { Heart } from "lucide-react";
import type { Listing } from "./types";

type PostCardProps = {
  listing: any;
  initiallySaved?: boolean;
};

export default function PostCard({ listing, initiallySaved = false }: PostCardProps) {
  const [user, setUser] = useState<any>(null);
  const [authorName, setAuthorName] = useState("");
  const [saved, setSaved] = useState(initiallySaved);
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

  return (
    <article className="group rounded-2xl border border-slate-300 bg-white shadow-[0_10px_30px_rgba(16,24,40,0.10)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(16,24,40,0.16)]">
      <Link
        href={`/home/${listing.id}`}
        className="block cursor-pointer overflow-hidden rounded-2xl transition  focus:outline-none focus:ring-2 focus:ring-[#17136D]/20"
      >
        <div className="relative aspect-16/10 w-full bg-slate-100">
          {listing?.imgURL ? (
            <Image
              alt={listing?.title}
              src={`/images/${listing?.imgURL}`}
              fill
              className="object-cover transition duration-300"
              priority={false}
            />
          ) : (
            <div className="absolute inset-0 bg-linear-to-br from-slate-200 via-slate-100 to-white" />
          )}
        </div>

        <div className="px-5 pb-5 pt-4">
          <h3 className="text-lg font-extrabold tracking-tight text-slate-900">
            {listing.title}
          </h3>
          <p className="mt-1 text-sm text-slate-600">{authorName}</p>

          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-md bg-[#F1D36B] px-2 py-1 text-[10px] font-extrabold tracking-wide text-[#17136D]">
              {listing.location}
            </span>
            <span className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-extrabold tracking-wide text-slate-600">
              {listing.type}
            </span>
          </div>

          <div className="mt-4 flex items-center border-t border-slate-200 pt-0 justify-between">
            <div>
              <div className="text-[10px] font-semibold tracking-wide text-slate-400">
                LOOKING FOR
              </div>
              <div className="mt-1 text-sm font-semibold text-slate-900">
                {listing.requests.map((request: Text) => {
                  return request + " ";
                })}
              </div>
            </div>
            <Button
              text="Offer"
              className="inline-flex items-center justify-center rounded-xl bg-[#17136D]! px-8! py-2.5! text-sm font-semibold text-white transition hover:bg-[#100b56]! h-fit! w-fit!"
            ></Button>
          </div>
        </div>
      </Link>
    </article>
  );
}
