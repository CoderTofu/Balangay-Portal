"use client";

import Image from "next/image";
import InputField from "@/components/forms/InputField";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto flex min-h-screen w-full flex-col">
        {/* Header / artwork */}
        <section className="relative flex-1 overflow-hidden px-8 pt-14">
          {/* Background */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-linear-to-b from-[#9DD6D3] via-[#F6C56F] to-white" />
            <Image
              alt=""
              src="/design-assets/radial-bg.png"
              fill
              priority
              className="object-cover opacity-70"
            />
          </div>

          {/* Headline */}
          <h1 className="relative z-10 max-w-[260px] text-3xl font-semibold italic tracking-tight text-white drop-shadow-sm">
            Ikot ng halaga,
            <br />
            ikot ng kabuhayan
          </h1>

          {/* Logo illustration */}
          <div className="pointer-events-none absolute bottom-10 left-1/2 z-10 w-[360px] -translate-x-1/2">
            <Image
              alt="Balangay"
              src="/design-assets/logo-login.png"
              width={720}
              height={720}
              priority
              className="h-auto w-full"
            />
          </div>
        </section>

        {/* Form */}
        <section className="px-8 pb-10 pt-6">
          <form className="space-y-4">
            <div className="rounded-2xl bg-white shadow-[0_10px_30px_rgba(16,24,40,0.12)]">
              <InputField
                type="email"
                value={email}
                setContent={setEmail}
                placeholder="Email address"
                autoComplete="email"
                className="border-transparent shadow-none focus:ring-0"
              />
            </div>

            <div className="rounded-2xl bg-white shadow-[0_10px_30px_rgba(16,24,40,0.12)]">
              <InputField
                type="password"
                value={password}
                setContent={setPassword}
                placeholder="Password"
                autoComplete="current-password"
                className="border-transparent shadow-none focus:ring-0"
              />
            </div>

            <button
              type="submit"
              className="mt-3 w-full rounded-2xl bg-[#17136D] px-6 py-5 text-base font-semibold text-white shadow-[0_12px_30px_rgba(23,19,109,0.35)] transition active:scale-[0.99]"
            >
              Sign in
            </button>
          </form>

          <div className="mt-10 flex items-center justify-center gap-3">
            <Image
              alt="Balangay"
              src="/design-assets/logo-login.png"
              width={26}
              height={26}
            />
            <span className="text-lg font-semibold italic tracking-tight text-[#17136D]">
              Balangay
            </span>
          </div>
        </section>
      </div>
    </main>
  );
}
