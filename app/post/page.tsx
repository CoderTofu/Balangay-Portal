"use client";

import type { JSX } from "react";
import { useState } from "react";
import TopBar from "@/components/layout/TopBar";
import BottomNav from "@/components/layout/BottomNav";
import Button from "@/components/forms/Buttons";
import LabeledField from "@/components/forms/LabeledField";
import InputField from "@/components/forms/InputField";
import DropdownField from "@/components/forms/DropdownField";
import ChoiceButton from "@/components/forms/ChoiceButton";
import PostImageUploader from "@/components/post/PostImageUploader";
import LookingForSelector from "@/components/post/LookingForSelector";
import Modal from "@/components/ui/Modal";

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
  const [images, setImages] = useState<string[]>([]);
  const [listingName, setListingName] = useState("");
  const [location, setLocation] = useState("Manila City");
  const [category, setCategory] = useState<CategoryType>("Inventory");
  const [lookingFor, setLookingFor] = useState<string[]>(["Others"]);
  const [lookingForOpen, setLookingForOpen] = useState(false);
  const [lookingForSearch, setLookingForSearch] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

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
    setShowSubmitModal(true);
    console.log({ images, listingName, location, category, lookingFor });
  };

  const canSubmit =
    listingName.trim().length > 0 && images.length > 0 && lookingFor.length > 0;

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
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <TopBar />

      <main className="mx-auto w-full max-w-lg flex-1 overflow-hidden px-4 pb-24 pt-6">
        <h1 className="mb-5 text-2xl font-bold text-[#1a1a2e]">
          Post a Listing
        </h1>

        <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_10px_25px_rgba(16,24,40,0.08)]">
          <PostImageUploader
            images={images}
            isDragging={isDragging}
            onDragStateChange={setIsDragging}
            onUpload={handleImageUpload}
            onRemoveImage={removeImage}
          />

          <LabeledField label="Listing Name">
            <InputField
              value={listingName}
              onChange={(e) => setListingName(e.target.value)}
              placeholder="e.g., 1kg Cat Food"
              className="border-[#bfd5f0]"
            />
          </LabeledField>

          <LabeledField label="Location">
            <DropdownField
              value={location}
              onChange={setLocation}
              options={LOCATIONS.map((loc) => ({ label: loc, value: loc }))}
              className="border-[#bfd5f0]"
            />
          </LabeledField>

          <LabeledField label="Category Type">
            <div className="grid grid-cols-3 gap-3">
            {(["Inventory", "Storage", "Service"] as CategoryType[]).map((cat) => (
              <ChoiceButton
                key={cat}
                label={cat}
                selected={category === cat}
                onSelect={() => setCategory(cat)}
                icon={categoryIcons[cat]}
                className="px-2 py-3 text-xs"
              />
            ))}
            </div>
          </LabeledField>

          <LabeledField label="Looking For">
            <LookingForSelector
              options={LOOKING_FOR_OPTIONS}
              selected={lookingFor}
              search={lookingForSearch}
              open={lookingForOpen}
              onOpenChange={setLookingForOpen}
              onSearchChange={setLookingForSearch}
              onToggle={toggleLookingFor}
              onRemove={removeLookingFor}
            />
          </LabeledField>

          <Button
            text="Submit"
            variant="primary"
            disabled={!canSubmit}
            clickEvent={handleSubmit}
            className="mt-2 w-full rounded-2xl py-4 text-base shadow-md shadow-[#2d2d8e]/30"
          />
        </div>
      </main>

      <BottomNav />

      <Modal
        open={showSubmitModal}
        title="Listing ready to submit"
        description="Your post details are captured. Wire this to your API create endpoint when ready."
        onClose={() => setShowSubmitModal(false)}
      >
        <div className="space-y-3 rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
          <div className="text-sm font-semibold text-slate-700">
            <span className="text-slate-500">Name:</span> {listingName || "—"}
          </div>
          <div className="text-sm font-semibold text-slate-700">
            <span className="text-slate-500">Location:</span> {location}
          </div>
          <div className="text-sm font-semibold text-slate-700">
            <span className="text-slate-500">Category:</span> {category}
          </div>
          <div className="text-sm font-semibold text-slate-700">
            <span className="text-slate-500">Looking for:</span>{" "}
            {lookingFor.join(", ") || "—"}
          </div>
          <div className="text-sm font-semibold text-slate-700">
            <span className="text-slate-500">Images:</span> {images.length}
          </div>
          <Button
            text="Close"
            variant="secondary"
            className="mt-3 rounded-xl py-3 text-sm"
            clickEvent={() => setShowSubmitModal(false)}
          />
        </div>
      </Modal>
    </div>
  );
}