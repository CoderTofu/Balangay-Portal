// ============================================================
// Balangay - Utility Helper Functions
// ============================================================

import { Timestamp } from "firebase/firestore";
import { ListingCategory } from "@/types";

/** Format a Firestore Timestamp to a readable date string */
export function formatDate(timestamp: Timestamp | null | undefined): string {
  if (!timestamp) return "";
  const date = timestamp.toDate();
  return date.toLocaleDateString("en-PH", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/** Format a Firestore Timestamp to a relative time string */
export function timeAgo(timestamp: Timestamp | null | undefined): string {
  if (!timestamp) return "";
  const now = Date.now();
  const then = timestamp.toDate().getTime();
  const diff = now - then;

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return formatDate(timestamp);
}

/** Format PHP currency */
export function formatPHP(value: number): string {
  return `₱${value.toLocaleString("en-PH", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
}

/** Get category display label */
export function getCategoryLabel(category: ListingCategory): string {
  const labels: Record<ListingCategory, string> = {
    goods: "Goods",
    services: "Services",
    food: "Food",
    equipment: "Equipment",
    skills: "Skills",
  };
  return labels[category] || category;
}

/** Get category color class */
export function getCategoryColor(category: ListingCategory): string {
  const colors: Record<ListingCategory, string> = {
    goods: "bg-blue-100 text-blue-800",
    services: "bg-purple-100 text-purple-800",
    food: "bg-green-100 text-green-800",
    equipment: "bg-orange-100 text-orange-800",
    skills: "bg-pink-100 text-pink-800",
  };
  return colors[category] || "bg-gray-100 text-gray-800";
}

/** Truncate text to a max length */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

/** Get trade status display info */
export function getTradeStatusInfo(status: string): {
  label: string;
  color: string;
} {
  switch (status) {
    case "pending":
      return { label: "Pending", color: "bg-yellow-100 text-yellow-800" };
    case "agreed":
      return { label: "Agreed", color: "bg-blue-100 text-blue-800" };
    case "completed":
      return { label: "Completed", color: "bg-green-100 text-green-800" };
    case "withdrawn":
      return { label: "Withdrawn", color: "bg-gray-100 text-gray-500" };
    default:
      return { label: status, color: "bg-gray-100 text-gray-800" };
  }
}

/** Validate listing form */
export function validateListingForm(data: {
  title: string;
  category: string;
  description: string;
  referenceValue: string;
  wantedInReturn: string;
}): string | null {
  if (!data.title.trim()) return "Title is required";
  if (!data.category) return "Category is required";
  if (!data.description.trim()) return "Description is required";
  if (data.description.length > 500) return "Description must be 500 characters or less";
  if (!data.referenceValue || isNaN(Number(data.referenceValue)))
    return "Valid reference value is required";
  if (Number(data.referenceValue) <= 0) return "Reference value must be positive";
  if (!data.wantedInReturn.trim()) return "Please specify what you want in return";
  return null;
}

/** Generate initials from a display name */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/** MSME Category options */
export const MSME_CATEGORIES = [
  "Sari-sari Store",
  "Food Stall / Catering",
  "Repair Shop",
  "Carpentry / Construction",
  "Freelancer / Creative",
  "Online Reseller",
  "Agriculture / Farming",
  "Transportation",
  "Health & Wellness",
  "Education / Tutoring",
  "Other",
];

/** Listing category options */
export const LISTING_CATEGORIES: { value: ListingCategory; label: string }[] = [
  { value: "goods", label: "Goods" },
  { value: "services", label: "Services" },
  { value: "food", label: "Food" },
  { value: "equipment", label: "Equipment" },
  { value: "skills", label: "Skills" },
];
