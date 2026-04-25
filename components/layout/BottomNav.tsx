"use client";

// ============================================================
// Balangay - Bottom Navigation
// Main navigation bar: Home, Search, Post, Messages, Profile
// ============================================================

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Search,
  PlusCircle,
  MessageCircle,
  User,
} from "lucide-react";

const NAV_ITEMS = [
  {
    label: "Home",
    href: "/marketplace",
    icon: Home,
  },
  {
    label: "Search",
    href: "/search",
    icon: Search,
  },
  {
    label: "Post",
    href: "/listings/new",
    icon: PlusCircle,
  },
  {
    label: "Messages",
    href: "/trades",
    icon: MessageCircle,
  },
  {
    label: "Profile",
    href: "/profile/me",
    icon: User,
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/marketplace") {
      return pathname === "/marketplace" || pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 safe-bottom no-print">
      <div className="max-w-lg mx-auto flex items-center justify-around h-16">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;
          const isPost = item.label === "Post";

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center min-w-[64px] py-1 transition-colors ${
                isPost
                  ? ""
                  : active
                  ? "text-primary"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {isPost ? (
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 -mt-5 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
                    <Icon size={24} className="text-white" strokeWidth={2.5} />
                  </div>
                  <span className="text-[10px] font-medium text-primary mt-0.5">
                    {item.label}
                  </span>
                </div>
              ) : (
                <>
                  <Icon
                    size={22}
                    strokeWidth={active ? 2.5 : 1.8}
                    className={active ? "text-primary" : ""}
                  />
                  <span
                    className={`text-[10px] mt-0.5 ${
                      active ? "font-bold text-primary" : "font-medium"
                    }`}
                  >
                    {item.label}
                  </span>
                </>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
