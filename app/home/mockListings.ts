import type { Listing } from "@/components/posts/types";

export const MOCK_LISTINGS: Listing[] = [
  {
    id: "bread-001",
    title: "2 Bags of End-of-Day Bread (Assorted)",
    imageSrc: "/images/bread.jpg",
    sellerName: "Marc’s Pandesalan",
    tags: ["MANILA", "INVENTORY"],
    lookingFor: "Any Delivery Services",
    trusted: true,
    stars: 4.5,
  },
  {
    id: "service-002",
    title: "3 Hours Forklift Service (with Operator)",
    imageSrc: "/images/forklift.jpg",
    sellerName: "Apex Warehouse Co.",
    tags: ["SERVICES", "STORAGE"],
    lookingFor: "Inventory Items",
    stars: 4.3,
  },
];
