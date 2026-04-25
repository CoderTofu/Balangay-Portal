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
    href: "/home",
    icon: Home,
  },
  {
    label: "Search",
    href: "/search",
    icon: Search,
  },
  {
    label: "Post",
    href: "/post",
    icon: PlusCircle,
  },
  {
    label: "Messages",
    href: "/messaging",
    icon: MessageCircle,
  },
  {
    label: "Profile",
    href: "/profile",
    icon: User,
  },
];

export default function BottomNav() {
  const pathname = usePathname();
  const brand = "#17136D";

  const isActive = (href: string) => {
    if (href === "/home") {
      return pathname === "/home" || pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const shouldShowNav = NAV_ITEMS.some((item) => isActive(item.href));

  if (!shouldShowNav) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-t border-[#17136D]/10 shadow-[0_-10px_30px_rgba(16,24,40,0.08)] safe-bottom no-print">
      <div className="mx-auto flex h-16 max-w-lg items-center justify-around px-2">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;
          const isPost = item.label === "Post";

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex min-w-[64px] flex-col items-center justify-center py-2 transition-colors ${
                isPost
                  ? ""
                  : active
                    ? `text-[${brand}]`
                    : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <>
                {!isPost && (
                  <span
                    aria-hidden="true"
                    className={`absolute top-1/2 h-12 w-full translate-y-[-60%] rounded-sm transition ${
                      active ? "bg-[#17136D]/10" : "bg-transparent"
                    }`}
                  />
                )}
                <Icon
                  size={22}
                  strokeWidth={active ? 2.5 : 1.8}
                  className="relative z-10"
                  style={active ? { color: brand } : undefined}
                />
                <span
                  className={`text-[10px] mt-0.5 ${
                    active ? "font-bold" : "font-medium"
                  }`}
                  style={active ? { color: brand } : undefined}
                >
                  {item.label}
                </span>
              </>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
