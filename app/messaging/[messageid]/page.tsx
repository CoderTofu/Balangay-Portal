"use client";

import { notFound, useParams, useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import BottomNav from "@/components/layout/BottomNav";
import Button from "@/components/forms/Buttons";
import InputField from "@/components/forms/InputField";
import ChatBubble from "@/components/messaging/ChatBubble";
import Modal from "@/components/ui/Modal";
import { MOCK_THREADS } from "../mockThreads";
import { useOfferStatuses } from "../useOfferStatuses";
import { Star } from "lucide-react";
import { Paperclip, Send } from "lucide-react";

type TradeStage = "NONE" | "AWAITING_RESULT" | "RATING" | "COMPLETED";
type TradeStageMap = Record<string, TradeStage | undefined>;
type StageAction =
  | "ACCEPT"
  | "REJECT"
  | "REOPEN"
  | "TRADE_FAILED"
  | "TRADE_SUCCESS"
  | "SUBMIT_RATING";

const TRADE_STAGE_KEY = "balangay.tradeStages.v1";

function safeParseTradeStages(raw: string | null): TradeStageMap | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return null;
    return parsed as TradeStageMap;
  } catch {
    return null;
  }
}

export default function MessageDetail() {
  const router = useRouter();
  const params = useParams<{ messageid: string }>();
  const messageid = params?.messageid;

  const thread = useMemo(
    () => MOCK_THREADS.find((t) => t.id === messageid),
    [messageid],
  );

  const [messages, setMessages] = useState(thread?.messages ?? []);
  const { getStatus, setStatus } = useOfferStatuses(MOCK_THREADS);
  const status = thread ? getStatus(thread.id, thread.status) : "PENDING";
  const [composer, setComposer] = useState("");
  const [isSending, setIsSending] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [confirmAction, setConfirmAction] = useState<StageAction | null>(null);
  const [tradeStage, setTradeStage] = useState<TradeStage>(() => {
    const defaultStage: TradeStage =
      status === "ACCEPTED" ? "AWAITING_RESULT" : "NONE";
    if (typeof window === "undefined") return defaultStage;
    try {
      const store =
        safeParseTradeStages(window.localStorage.getItem(TRADE_STAGE_KEY)) ??
        {};
      return thread ? (store[thread.id] ?? defaultStage) : defaultStage;
    } catch {
      return defaultStage;
    }
  });
  const [rating, setRating] = useState(0);
  const [ratingNote, setRatingNote] = useState("");

  if (!thread) notFound();
  const activeThread = thread;

  const persistTradeStage = (next: TradeStage) => {
    setTradeStage(next);
    try {
      const store =
        safeParseTradeStages(window.localStorage.getItem(TRADE_STAGE_KEY)) ??
        {};
      store[activeThread.id] = next;
      window.localStorage.setItem(TRADE_STAGE_KEY, JSON.stringify(store));
    } catch {
      // ignore storage failures
    }
  };

  const canSend = composer.trim().length > 0 && !isSending;
  const actionsEnabled =
    activeThread.side === "THEIR OFFERS" && status === "PENDING";
  const canSubmitRating = rating > 0;

  const canReopen = status === "REJECTED" || tradeStage === "COMPLETED";
  const statusText =
    status === "ACCEPTED"
      ? "Accepted"
      : status === "REJECTED"
        ? "Rejected"
        : activeThread.side === "MY OFFERS"
          ? "Waiting for their response"
          : "Waiting for your response";

  function performAction(action: StageAction) {
    if (action === "ACCEPT") {
      setStatus(activeThread.id, "ACCEPTED");
      persistTradeStage("AWAITING_RESULT");
      setMessages((prev) => [
        ...prev,
        {
          id: `stage-${Date.now()}`,
          from: "system",
          text: "STAGE 2: OFFER ACCEPTED",
        },
      ]);
      return;
    }

    if (action === "REJECT") {
      setStatus(activeThread.id, "REJECTED");
      persistTradeStage("NONE");
      setMessages((prev) => [
        ...prev,
        {
          id: `stage-${Date.now()}`,
          from: "system",
          text: "STAGE 2: OFFER REJECTED",
        },
      ]);
      return;
    }

    if (action === "REOPEN") {
      setStatus(activeThread.id, "PENDING");
      persistTradeStage("NONE");
      setRating(0);
      setRatingNote("");
      setMessages((prev) => [
        ...prev,
        {
          id: `stage-${Date.now()}`,
          from: "system",
          text: "STAGE RESET: OFFER REOPENED",
        },
      ]);
      return;
    }

    if (action === "TRADE_FAILED") {
      setStatus(activeThread.id, "REJECTED");
      persistTradeStage("NONE");
      setMessages((prev) => [
        ...prev,
        {
          id: `stage-${Date.now()}`,
          from: "system",
          text: "STAGE 3: TRADE MARKED FAILED",
        },
      ]);
      return;
    }

    if (action === "TRADE_SUCCESS") {
      persistTradeStage("RATING");
      setMessages((prev) => [
        ...prev,
        {
          id: `stage-${Date.now()}`,
          from: "system",
          text: "STAGE 3: TRADE SUCCESS, RATING REQUIRED",
        },
      ]);
      return;
    }

    if (action === "SUBMIT_RATING") {
      if (!canSubmitRating) return;
      persistTradeStage("COMPLETED");
      setMessages((prev) => [
        ...prev,
        {
          id: `stage-${Date.now()}`,
          from: "system",
          text: `STAGE 4: TRADE COMPLETED (${rating}-STAR RATING SUBMITTED)`,
        },
      ]);
    }
  }

  const confirmMeta = (() => {
    if (!confirmAction) return null;
    if (confirmAction === "ACCEPT") {
      return {
        title: "Accept this offer?",
        description: "This moves the trade to the next stage.",
        button: "CONFIRM ACCEPT",
        tone: "success" as const,
      };
    }
    if (confirmAction === "REJECT") {
      return {
        title: "Reject this offer?",
        description: "This closes the offer unless reopened.",
        button: "CONFIRM REJECT",
        tone: "danger" as const,
      };
    }
    if (confirmAction === "REOPEN") {
      return {
        title: "Reopen this offer?",
        description: "This sends the trade back to pending state.",
        button: "CONFIRM REOPEN",
        tone: "success" as const,
      };
    }
    if (confirmAction === "TRADE_FAILED") {
      return {
        title: "Mark trade as failed?",
        description: "This marks the offer as rejected.",
        button: "CONFIRM FAILED",
        tone: "danger" as const,
      };
    }
    if (confirmAction === "TRADE_SUCCESS") {
      return {
        title: "Mark trade as successful?",
        description: "You will proceed to the rating stage.",
        button: "CONFIRM SUCCESS",
        tone: "success" as const,
      };
    }
    return {
      title: "Submit this rating?",
      description: "This finalizes the trade stage.",
      button: "CONFIRM SUBMIT",
      tone: "success" as const,
    };
  })();

  return (
    <main className="flex h-screen flex-col overflow-hidden bg-slate-50">
      {/* Thread header */}
      <div className="border-b border-slate-300 bg-white px-4 py-6 shadow-[0_10px_25px_rgba(16,24,40,0.08)]">
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Back"
            onClick={() => router.push("/messaging")}
            className="grid h-10 w-10 cursor-pointer place-items-center rounded-xl bg-white text-[#17136D] shadow-[0_10px_25px_rgba(16,24,40,0.08)] transition active:scale-[0.99]"
          >
            ←
          </button>
          <div className="grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-slate-500">
            👤
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-extrabold text-[#17136D]">
              {thread.otherName}
            </div>
            <div className="mt-0.5 text-[11px] font-semibold text-slate-500">
              {statusText}
            </div>
          </div>
        </div>
        {status === "PENDING" ? (
          <div className="mt-3 flex gap-3">
            <Button
              text="REJECT OFFER"
              variant="secondary"
              disabled={!actionsEnabled}
              className={[
                "mt-0 w-1/2 rounded-xl bg-[#FF5B5B]! text-white hover:bg-[#ff5b5bdd]!",
                !actionsEnabled ? "hover:bg-[#FF5B5B]!" : "",
              ].join(" ")}
              clickEvent={() => setConfirmAction("REJECT")}
            />
            <Button
              text={
                activeThread.side === "THEIR OFFERS"
                  ? "ACCEPT OFFER"
                  : "WAITING RESPONSE"
              }
              variant="primary"
              disabled={!actionsEnabled}
              className="mt-0 w-1/2 rounded-xl bg-[#6FAA6B]! py-3 text-sm hover:bg-[#6faa6bdd]!"
              clickEvent={() => setConfirmAction("ACCEPT")}
            />
          </div>
        ) : null}

        {status === "REJECTED" ? (
          <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
            <div className="text-[11px] font-bold uppercase tracking-wide text-slate-500">
              This offer has been rejected. This chat is closed unless reopened.
            </div>
            <Button
              text="REOPEN OFFER"
              variant="primary"
              disabled={!canReopen}
              className="mt-3 rounded-xl py-3 text-sm"
              clickEvent={() => setConfirmAction("REOPEN")}
            />
          </div>
        ) : null}

        {status === "ACCEPTED" && tradeStage === "AWAITING_RESULT" ? (
          <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
            <div className="text-center text-lg font-extrabold tracking-tight text-[#17136D]">
              Was the trade successful?
            </div>

            <div className="mt-1 text-center text-[11px] font-bold uppercase tracking-wide text-slate-500">
              Confirming success means trade is done and listing closes.
            </div>
            <div className="mt-3 flex gap-3">
              <Button
                text="TRADE FAILED"
                variant="secondary"
                className="mt-0 w-1/2 rounded-xl bg-[#FF5B5B]! py-3 text-sm text-white hover:bg-[#ff5b5bdd]!"
                clickEvent={() => setConfirmAction("TRADE_FAILED")}
              />
              <Button
                text="TRADE SUCCESS"
                variant="primary"
                className="mt-0 w-1/2 rounded-xl bg-[#6FAA6B]! py-3 text-sm hover:bg-[#6faa6bdd]!"
                clickEvent={() => setConfirmAction("TRADE_SUCCESS")}
              />
            </div>
          </div>
        ) : null}

        {status === "ACCEPTED" && tradeStage === "RATING" ? (
          <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
            <div className="text-center text-lg font-extrabold tracking-tight text-[#17136D]">
              Rate this trade
            </div>
            <div className="mt-1 text-center text-[11px] font-bold uppercase tracking-wide text-slate-500">
              Let us know how your trade went.
            </div>

            <div className="mt-3 flex justify-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => {
                const filled = star <= rating;
                return (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="cursor-pointer rounded-md p-1 transition hover:bg-slate-200/60"
                    aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                  >
                    <Star
                      size={18}
                      className={
                        filled
                          ? "fill-[#17136D] text-[#17136D]"
                          : "text-slate-300"
                      }
                    />
                  </button>
                );
              })}
            </div>

            <div className="mt-2">
              <InputField
                value={ratingNote}
                setContent={setRatingNote}
                placeholder="Provide short description about the business..."
                className="rounded-xl border-slate-200 px-4 py-2 text-sm placeholder:text-slate-400"
              />
            </div>

            <div className="mt-3 flex gap-3">
              <Button
                text="REOPEN OFFER"
                variant="secondary"
                className="mt-0 w-1/2 rounded-xl bg-[#FF5B5B]! py-3 text-sm text-white hover:bg-[#ff5b5bdd]!"
                clickEvent={() => setConfirmAction("REOPEN")}
              />
              <Button
                text="SUBMIT RATING"
                variant="primary"
                disabled={!canSubmitRating}
                className="mt-0 w-1/2 rounded-xl bg-[#6FAA6B]! py-3 text-sm hover:bg-[#6faa6bdd]!"
                clickEvent={() => setConfirmAction("SUBMIT_RATING")}
              />
            </div>
          </div>
        ) : null}

        {status === "ACCEPTED" && tradeStage === "COMPLETED" ? (
          <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
            <div className="text-[11px] font-bold uppercase tracking-wide text-slate-500">
              Trade completed and feedback submitted.
            </div>
            <Button
              text="REOPEN OFFER"
              variant="secondary"
              className="mt-3 rounded-xl bg-[#FF5B5B]! py-3 text-sm text-white hover:bg-[#ff5b5bdd]!"
              clickEvent={() => setConfirmAction("REOPEN")}
            />
          </div>
        ) : null}
      </div>

      <div className="flex-1 overflow-y-auto pb-44">
        <div className="mx-auto mt-4 flex w-full flex-col items-center space-y-4">
          {/* Timestamp */}
          <div className="text-center text-[10px] font-extrabold tracking-wide text-slate-300">
            {activeThread.messages[0]?.timestampLabel ?? "TODAY"}
          </div>

          {/* Chat */}
          <div className="w-full max-w-[650px] space-y-3 px-2">
            {messages.map((m) => (
              <ChatBubble key={m.id} side={m.from} text={m.text} />
            ))}
          </div>
        </div>
      </div>

      {/* Composer */}
      <div className="fixed inset-x-0 bottom-20 z-20 flex justify-center px-4">
        <div className="w-full max-w-[650px] rounded-2xl bg-white p-3 border border-slate-300">
          <div className="flex items-center gap-1">
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={() => {}}
            />

            <button
              type="button"
              aria-label="Attach"
              className="grid h-10 w-10 cursor-pointer place-items-center rounded-xl bg-white text-slate-500 shadow-[0_10px_25px_rgba(16,24,40,0.06)] transition hover:bg-slate-50 active:scale-[0.99]"
              onClick={() => fileInputRef.current?.click()}
            >
              <Paperclip size={18} />
            </button>

            <div className="flex-1 rounded-xl bg-white">
              <InputField
                value={composer}
                setContent={setComposer}
                placeholder="Send a message..."
                className="border-transparent px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 shadow-none outline-none focus:outline-none focus:ring-0 focus:border-transparent focus-visible:outline-none focus-visible:ring-0"
              />
            </div>

            <button
              type="button"
              aria-label="Send"
              disabled={!canSend}
              onClick={async () => {
                if (!canSend) return;
                setIsSending(true);
                await new Promise((r) => setTimeout(r, 250));
                setMessages((prev) => [
                  ...prev,
                  {
                    id: `local-${Date.now()}`,
                    from: "me",
                    text: composer.trim(),
                  },
                ]);
                setComposer("");
                setIsSending(false);
              }}
              className={[
                "grid h-11 w-11 place-items-center rounded-full bg-[#17136D] text-white  transition active:scale-[0.99]",
                !canSend
                  ? "cursor-not-allowed opacity-40 active:scale-100"
                  : "cursor-pointer",
              ].join(" ")}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>

      <BottomNav />

      <Modal
        open={confirmMeta !== null}
        title={confirmMeta?.title}
        description={confirmMeta?.description}
        onClose={() => setConfirmAction(null)}
      >
        <div className="flex gap-3">
          <Button
            text="CANCEL"
            variant="secondary"
            className="mt-0 w-1/2 rounded-xl"
            clickEvent={() => setConfirmAction(null)}
          />
          <Button
            text={confirmMeta?.button ?? "CONFIRM"}
            variant="primary"
            className={[
              "mt-0 w-1/2 rounded-xl",
              confirmMeta?.tone === "success"
                ? "bg-[#6FAA6B]! hover:bg-[#6faa6bdd]!"
                : "bg-[#FF5B5B]! hover:bg-[#ff5b5bdd]!",
            ].join(" ")}
            clickEvent={() => {
              if (!confirmAction) return;
              performAction(confirmAction);
              setConfirmAction(null);
            }}
          />
        </div>
      </Modal>
    </main>
  );
}

