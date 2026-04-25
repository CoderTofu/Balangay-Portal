"use client";

import type { JSX } from "react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import TopBar from "@/components/layout/TopBar";
import BottomNav from "@/components/layout/BottomNav";

const LOCATIONS = [
  "Manila City",
  "Quezon City",
  "Makati",
  "Taguig",
  "Pasig",
  "Mandaluyong",
  "Marikina",
  "Caloocan",
  "Las Piñas",
  "Muntinlupa",
  "Parañaque",
  "Pasay",
  "Pateros",
  "San Juan",
  "Valenzuela",
  "Navotas",
  "Malabon",
];

const LOOKING_FOR_OPTIONS = [
  "Food",
  "Furniture",
  "Clothing",
  "Electronics",
  "Tools",
  "Books",
  "Toys",
  "Help",
  "Delivery",
  "Others",
];

type CategoryType = "Inventory" | "Storage" | "Service";

export default function Post() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [images, setImages] = useState<string[]>([]);
  const [listingName, setListingName] = useState("");
  const [location, setLocation] = useState("Manila City");
  const [category, setCategory] = useState<CategoryType>("Inventory");
  const [lookingFor, setLookingFor] = useState<string[]>(["Others"]);
  const [lookingForOpen, setLookingForOpen] = useState(false);
  const [lookingForSearch, setLookingForSearch] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const lookingForRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (files: FileList | null) => {
    if (!files) return;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImages((prev) => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleImageUpload(e.dataTransfer.files);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleLookingFor = (option: string) => {
    setLookingFor((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option]
    );
  };

  const removeLookingFor = (option: string) => {
    setLookingFor((prev) => prev.filter((o) => o !== option));
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log({ images, listingName, location, category, lookingFor });
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (lookingForRef.current && !lookingForRef.current.contains(e.target as Node)) {
        setLookingForOpen(false);
        setLookingForSearch("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Auto-focus search input when dropdown opens
  useEffect(() => {
    if (lookingForOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [lookingForOpen]);

  const filteredOptions = LOOKING_FOR_OPTIONS.filter((opt) =>
    opt.toLowerCase().includes(lookingForSearch.toLowerCase())
  );

  const categoryIcons: Record<CategoryType, JSX.Element> = {
    Inventory: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    Storage: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="3" width="20" height="5" rx="1" />
        <rect x="2" y="10" width="20" height="5" rx="1" />
        <rect x="2" y="17" width="20" height="5" rx="1" />
        <line x1="6" y1="5.5" x2="6.01" y2="5.5" />
        <line x1="6" y1="12.5" x2="6.01" y2="12.5" />
        <line x1="6" y1="19.5" x2="6.01" y2="19.5" />
      </svg>
    ),
    Service: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <TopBar />

      <main className="flex-1 pb-24 px-4 pt-4 max-w-lg mx-auto w-full">
        <h1 className="text-2xl font-bold text-[#1a1a2e] mb-5">
          Post a Listing
        </h1>

        {/* Image Upload */}
        <div
          className={`relative w-full rounded-2xl border-2 border-dashed mb-5 overflow-hidden transition-colors cursor-pointer
            ${isDragging ? "border-[#4b4acf] bg-[#f0f0ff]" : "border-gray-300 bg-gray-100"}
          `}
          style={{ minHeight: "180px" }}
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          {images.length > 0 ? (
            <div className="flex flex-wrap gap-2 p-3">
              {images.map((src, i) => (
                <div key={i} className="relative w-24 h-24 rounded-xl overflow-hidden">
                  <img src={src} alt="" className="w-full h-full object-cover" />
                  <button
                    className="absolute top-1 right-1 bg-black/50 rounded-full w-5 h-5 flex items-center justify-center text-white text-xs"
                    onClick={(e) => { e.stopPropagation(); removeImage(i); }}
                  >
                    ×
                  </button>
                </div>
              ))}
              <div className="w-24 h-24 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-2xl">
                +
              </div>
            </div>
          ) : (
            /* Background crane illustration */
            <div className="flex flex-col items-center justify-center h-full py-10 relative">
              {/* Subtle construction background */}
              <svg
                className="absolute inset-0 w-full h-full opacity-20"
                viewBox="0 0 400 180"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Crane tower */}
                <rect x="180" y="20" width="8" height="140" fill="#9ca3af" />
                {/* Crane arm */}
                <rect x="100" y="20" width="180" height="6" fill="#9ca3af" />
                {/* Counter-arm */}
                <rect x="180" y="20" width="60" height="5" fill="#9ca3af" />
                {/* Cable */}
                <line x1="140" y1="26" x2="155" y2="100" stroke="#9ca3af" strokeWidth="2" />
                {/* Hook */}
                <rect x="148" y="100" width="14" height="10" rx="2" fill="#9ca3af" />
                {/* Buildings */}
                <rect x="280" y="80" width="40" height="80" fill="#d1d5db" />
                <rect x="300" y="60" width="25" height="100" fill="#e5e7eb" />
                <rect x="50" y="100" width="50" height="60" fill="#d1d5db" />
                <rect x="65" y="85" width="35" height="75" fill="#e5e7eb" />
                {/* Windows */}
                <rect x="288" y="88" width="8" height="8" fill="white" opacity="0.6" />
                <rect x="304" y="68" width="8" height="8" fill="white" opacity="0.6" />
                <rect x="288" y="104" width="8" height="8" fill="white" opacity="0.6" />
              </svg>

              {/* Camera icon */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-14 h-14 flex items-center justify-center mb-2">
                  <svg width="48" height="44" viewBox="0 0 48 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="4" y="12" width="40" height="28" rx="4" stroke="#6b7280" strokeWidth="2.5" fill="none" />
                    <circle cx="24" cy="26" r="8" stroke="#6b7280" strokeWidth="2.5" fill="none" />
                    <circle cx="24" cy="26" r="3" fill="#6b7280" />
                    <path d="M16 12l3-6h10l3 6" stroke="#6b7280" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="38" cy="17" r="2" fill="#6b7280" />
                    {/* Plus badge */}
                    <circle cx="38" cy="8" r="6" fill="white" />
                    <path d="M38 5v6M35 8h6" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase text-center leading-5">
                  Drag & Drop or<br />Tap to Upload Images
                </p>
              </div>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleImageUpload(e.target.files)}
          />
        </div>

        {/* Listing Name */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-[#1a1a2e] mb-2">
            Listing Name
          </label>
          <input
            type="text"
            placeholder="e.g., 1kg Cat Food"
            value={listingName}
            onChange={(e) => setListingName(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4b4acf]/30 focus:border-[#4b4acf] transition-all bg-white"
          />
        </div>

        {/* Location */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-[#1a1a2e] mb-2">
            Location
          </label>
          <div className="relative">
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-[#4b4acf]/30 focus:border-[#4b4acf] transition-all bg-white pr-10"
            >
              {LOCATIONS.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>
        </div>

        {/* Category Type */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-[#1a1a2e] mb-2">
            Category Type
          </label>
          <div className="flex gap-3">
            {(["Inventory", "Storage", "Service"] as CategoryType[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`flex-1 flex flex-col items-center justify-center gap-1.5 py-3 rounded-xl border-2 text-sm font-medium transition-all
                  ${category === cat
                    ? "bg-[#f5c842] border-[#f5c842] text-[#1a1a2e]"
                    : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                  }`}
              >
                {categoryIcons[cat]}
                <span className="text-xs font-semibold">{cat}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Looking For */}
        <div className="mb-8" ref={lookingForRef}>
          <label className="block text-sm font-semibold text-[#1a1a2e] mb-2">
            Looking for
          </label>
          <div className="relative">
            {/* Trigger / Tags display */}
            <div
              className={`w-full min-h-[48px] border rounded-xl px-3 py-2 flex flex-wrap gap-2 items-center cursor-pointer transition-all bg-white pr-10
                ${lookingForOpen ? "ring-2 ring-[#4b4acf]/30 border-[#4b4acf]" : "border-gray-200"}`}
              onClick={() => setLookingForOpen((v) => !v)}
            >
              {lookingFor.length === 0 ? (
                <span className="text-sm text-gray-400">Select options...</span>
              ) : (
                lookingFor.map((opt) => (
                  <span
                    key={opt}
                    className="flex items-center gap-1 bg-[#e8e8f8] text-[#4b4acf] text-xs font-semibold px-3 py-1 rounded-full"
                  >
                    {opt}
                    <button
                      onClick={(e) => { e.stopPropagation(); removeLookingFor(opt); }}
                      className="text-[#4b4acf] hover:text-[#3a3abf] leading-none ml-0.5"
                    >
                      ×
                    </button>
                  </span>
                ))
              )}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <svg
                  width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                  className={`transition-transform duration-200 ${lookingForOpen ? "rotate-180" : ""}`}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </div>

            {lookingForOpen && (
              <div className="absolute z-20 w-full bottom-full mb-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                {/* Search input */}
                <div className="px-3 pt-3 pb-2 border-b border-gray-100">
                  <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search..."
                      value={lookingForSearch}
                      onChange={(e) => setLookingForSearch(e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
                    />
                    {lookingForSearch && (
                      <button
                        onClick={(e) => { e.stopPropagation(); setLookingForSearch(""); }}
                        className="text-gray-400 hover:text-gray-600 leading-none"
                      >
                        ×
                      </button>
                    )}
                  </div>
                </div>

                {/* Scrollable options list */}
                <div className="overflow-y-auto max-h-48">
                  {filteredOptions.length === 0 ? (
                    <div className="px-4 py-4 text-sm text-gray-400 text-center">No results found</div>
                  ) : (
                    filteredOptions.map((opt) => (
                      <div
                        key={opt}
                        className={`flex items-center justify-between px-4 py-2.5 cursor-pointer text-sm transition-colors
                          ${lookingFor.includes(opt)
                            ? "bg-[#f0f0ff] text-[#4b4acf] font-semibold"
                            : "text-gray-700 hover:bg-gray-50"
                          }`}
                        onClick={(e) => { e.stopPropagation(); toggleLookingFor(opt); }}
                      >
                        <span>{opt}</span>
                        {lookingFor.includes(opt) && (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-[#2d2d8e] hover:bg-[#23237a] active:scale-[0.98] text-white font-bold py-4 rounded-2xl text-base transition-all shadow-md shadow-[#2d2d8e]/30"
        >
          Submit
        </button>
      </main>

      <BottomNav />
    </div>
  );
}