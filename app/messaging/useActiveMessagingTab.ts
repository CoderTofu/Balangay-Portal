"use client";

import { useCallback, useSyncExternalStore } from "react";
import type { OfferSide } from "./mockThreads";

const ACTIVE_TAB_KEY = "balangay.messaging.activeTab.v1";
const STORE_EVENT = "balangay:messagingTab";

function readStoredTab(): OfferSide {
  if (typeof window === "undefined") return "MY OFFERS";
  const value = window.localStorage.getItem(ACTIVE_TAB_KEY);
  return value === "MY OFFERS" || value === "THEIR OFFERS" ? value : "MY OFFERS";
}

function writeStoredTab(tab: OfferSide) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ACTIVE_TAB_KEY, tab);
  window.dispatchEvent(new Event(STORE_EVENT));
}

export function useActiveMessagingTab(): {
  tab: OfferSide;
  setTab: (next: OfferSide) => void;
} {
  const tab = useSyncExternalStore<OfferSide>(
    (onStoreChange) => {
      if (typeof window === "undefined") return () => {};
      const onStorage = (e: StorageEvent) => {
        if (e.key === ACTIVE_TAB_KEY) onStoreChange();
      };
      const onCustom = () => onStoreChange();
      window.addEventListener("storage", onStorage);
      window.addEventListener(STORE_EVENT, onCustom);
      return () => {
        window.removeEventListener("storage", onStorage);
        window.removeEventListener(STORE_EVENT, onCustom);
      };
    },
    () => readStoredTab(),
    () => "MY OFFERS",
  );

  const setTab = useCallback((next: OfferSide) => {
    try {
      writeStoredTab(next);
    } catch {
      // ignore storage failures
    }
  }, []);

  return { tab, setTab };
}

