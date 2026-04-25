"use client";

import { notFound, useParams, useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import TopBar from "@/components/layout/TopBar";
import BottomNav from "@/components/layout/BottomNav";
import Button from "@/components/forms/Buttons";
import InputField from "@/components/forms/InputField";
import ChatBubble from "@/components/messaging/ChatBubble";
import Modal from "@/components/ui/Modal";
import { MOCK_THREADS } from "../mockThreads";
import { useOfferStatuses } from "../useOfferStatuses";
import { Paperclip, Send } from "lucide-react";

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
  const [confirm, setConfirm] = useState<null | "ACCEPT" | "REJECT">(null);

  if (!thread) notFound();

  const canSend = composer.trim().length > 0 && !isSending;
  const actionsEnabled = thread.side === "THEIR OFFERS" && status === "PENDING";
  const statusText =
    status === "ACCEPTED"
      ? "Accepted"
      : status === "REJECTED"
        ? "Rejected"
        : thread.side === "MY OFFERS"
          ? "Waiting for their response"
          : "Waiting for your response";

  return (
    <main className="min-h-screen bg-slate-50">
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
        {/* Actions */}
        <div className="mt-3 flex gap-3">
          <Button
            text="REJECT OFFER"
            variant="secondary"
            disabled={!actionsEnabled}
            className={[
              "mt-0 w-1/2 rounded-xl bg-[#FF5B5B] text-white hover:bg-[#ff5b5bdd]",
              !actionsEnabled ? "hover:bg-[#FF5B5B]" : "",
            ].join(" ")}
            clickEvent={() => setConfirm("REJECT")}
          />
          <Button
            text="ACCEPT OFFER"
            variant="primary"
            disabled={!actionsEnabled}
            className={["mt-0 w-1/2 rounded-xl "].join(" ")}
            clickEvent={() => setConfirm("ACCEPT")}
          />
        </div>
      </div>
      <div className="mx-auto mt-4 w-full space-y-4 flex flex-col items-center">
        {/* Timestamp */}
        <div className="text-center text-[10px] font-extrabold tracking-wide text-slate-300">
          {thread.messages[0]?.timestampLabel ?? "TODAY"}
        </div>

        {/* Chat */}
        <div className="space-y-3 w-full max-w-[650px] px-2">
          {messages.map((m) => (
            <ChatBubble key={m.id} side={m.from} text={m.text} />
          ))}
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
        open={confirm !== null}
        title={
          confirm === "ACCEPT" ? "Accept this offer?" : "Reject this offer?"
        }
        description={
          confirm === "ACCEPT"
            ? "This will mark the offer as accepted."
            : "This will mark the offer as rejected."
        }
        onClose={() => setConfirm(null)}
      >
        <div className="flex gap-3">
          <Button
            text="CANCEL"
            variant="secondary"
            className="mt-0 w-1/2 rounded-xl"
            clickEvent={() => setConfirm(null)}
          />
          <Button
            text={confirm === "ACCEPT" ? "CONFIRM ACCEPT" : "CONFIRM REJECT"}
            variant="primary"
            className={[
              "mt-0 w-1/2 rounded-xl",
              confirm === "ACCEPT"
                ? "bg-[#6FAA6B] hover:bg-[#6faa6bdd]"
                : "bg-[#FF5B5B] hover:bg-[#ff5b5bdd]",
            ].join(" ")}
            clickEvent={() => {
              if (!confirm) return;
              const next = confirm === "ACCEPT" ? "ACCEPTED" : "REJECTED";
              setStatus(thread.id, next);
              setMessages((prev) => [
                ...prev,
                {
                  id: `status-${Date.now()}`,
                  from: "me",
                  text:
                    next === "ACCEPTED"
                      ? "Accepted the offer."
                      : "Rejected the offer.",
                },
              ]);
              setConfirm(null);
            }}
          />
        </div>
      </Modal>
    </main>
  );
}

