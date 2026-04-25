"use client";

import { notFound, useParams, useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import TopBar from "@/components/layout/TopBar";
import BottomNav from "@/components/layout/BottomNav";
import Button from "@/components/forms/Buttons";
import InputField from "@/components/forms/InputField";
import ChatBubble from "@/components/messaging/ChatBubble";
import { MOCK_THREADS } from "../mockThreads";
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
  const [composer, setComposer] = useState("");
  const [isSending, setIsSending] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!thread) notFound();

  const canSend = composer.trim().length > 0 && !isSending;

  return (
    <main className="min-h-screen bg-slate-50 pb-24">
      <TopBar />

      <div className="mx-auto w-full max-w-[420px] space-y-4 px-4">
        {/* Thread header */}
        <div className="rounded-2xl bg-white p-4 shadow-[0_10px_25px_rgba(16,24,40,0.08)]">
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
            </div>
          </div>

          {/* Actions */}
          <div className="mt-4 flex gap-3">
            <Button
              text="REJECT OFFER"
              variant="secondary"
              className="mt-0 w-1/2 rounded-xl bg-[#FF5B5B] text-white hover:bg-[#ff5b5bdd]"
              clickEvent={() => {}}
            />
            <Button
              text="ACCEPT OFFER"
              variant="secondary"
              className="mt-0 w-1/2 rounded-xl bg-[#6FAA6B] text-white hover:bg-[#6faa6bdd]"
              clickEvent={() => {}}
            />
          </div>
        </div>

        {/* Timestamp */}
        <div className="text-center text-[10px] font-extrabold tracking-wide text-slate-300">
          {thread.messages[0]?.timestampLabel ?? "TODAY"}
        </div>

        {/* Chat */}
        <div className="space-y-3">
          {messages.map((m) => (
            <ChatBubble key={m.id} side={m.from} text={m.text} />
          ))}
        </div>

        {/* Composer */}
        <div className="rounded-2xl bg-white p-3 shadow-[0_10px_25px_rgba(16,24,40,0.08)]">
          <div className="flex items-center gap-3">
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

            <div className="flex-1 rounded-xl bg-white shadow-[0_10px_25px_rgba(16,24,40,0.06)]">
              <InputField
                value={composer}
                setContent={setComposer}
                placeholder="Send a message..."
                className="border-transparent px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 shadow-none focus:ring-0"
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
                  { id: `local-${Date.now()}`, from: "me", text: composer.trim() },
                ]);
                setComposer("");
                setIsSending(false);
              }}
              className={[
                "grid h-11 w-11 place-items-center rounded-full bg-[#17136D] text-white shadow-[0_10px_25px_rgba(23,19,109,0.25)] transition active:scale-[0.99]",
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
    </main>
  );
}

