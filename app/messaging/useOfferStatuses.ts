"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import type { OfferStatus, OfferThread } from "./mockThreads";

type OfferStatusMap = Record<string, OfferStatus | undefined>;

const STORAGE_KEY = "balangay.offerStatuses.v1";
const STORE_EVENT = "balangay:offerStatuses";
const EMPTY_SNAPSHOT: OfferStatusMap = {};
let cachedRaw: string | null = null;
let cachedSnapshot: OfferStatusMap = EMPTY_SNAPSHOT;

function safeParse(json: string | null): OfferStatusMap | null {
  if (!json) return null;
  try {
    const value = JSON.parse(json) as unknown;
    if (!value || typeof value !== "object") return null;
    return value as OfferStatusMap;
  } catch {
    return null;
  }
}

function readStoreSnapshot(): OfferStatusMap {
  if (typeof window === "undefined") return EMPTY_SNAPSHOT;

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw === cachedRaw) return cachedSnapshot;

  cachedRaw = raw;
  cachedSnapshot = safeParse(raw) ?? EMPTY_SNAPSHOT;
  return cachedSnapshot;
}

function writeStore(next: OfferStatusMap) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event(STORE_EVENT));
}

export function useOfferStatuses(threads: OfferThread[]) {
  const initialFromThreads = useMemo<OfferStatusMap>(() => {
    const next: OfferStatusMap = {};
    for (const t of threads) next[t.id] = t.status;
    return next;
  }, [threads]);

  const storedMap = useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === "undefined") return () => {};
      const onStorage = (e: StorageEvent) => {
        if (e.key === STORAGE_KEY) onStoreChange();
      };
      const onCustom = () => onStoreChange();
      window.addEventListener("storage", onStorage);
      window.addEventListener(STORE_EVENT, onCustom);
      return () => {
        window.removeEventListener("storage", onStorage);
        window.removeEventListener(STORE_EVENT, onCustom);
      };
    },
    () => readStoreSnapshot(),
    () => EMPTY_SNAPSHOT,
  );

  const merged = useMemo(
    () => ({ ...initialFromThreads, ...storedMap }),
    [initialFromThreads, storedMap],
  );

  const getStatus = useCallback(
    (threadId: string, fallback?: OfferStatus) =>
      merged[threadId] ?? fallback ?? initialFromThreads[threadId] ?? "PENDING",
    [initialFromThreads, merged],
  );

  const setStatus = useCallback((threadId: string, status: OfferStatus) => {
    try {
      const prev = readStoreSnapshot();
      writeStore({ ...prev, [threadId]: status });
    } catch {
      // ignore storage failures
    }
  }, []);

  return { getStatus, setStatus };
}
