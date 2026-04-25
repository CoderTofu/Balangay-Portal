"use client";

import Image from "next/image";
import InputField from "@/components/forms/InputField";
import Button from "@/components/forms/Buttons";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto flex min-h-screen w-full flex-col">
        {/* Header / artwork */}
        <section className="relative flex-1 px-8 pt-14 max-w-screen overflow-hidden">
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
          <div className="pointer-events-none absolute bottom-0 right-0 z-1 w-[500px] translate-x-1/5 ">
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
                className="border shadow-none focus:ring-0"
              />
            </div>

            <div className="rounded-2xl bg-white shadow-[0_10px_30px_rgba(16,24,40,0.12)]">
              <InputField
                type="password"
                value={password}
                setContent={setPassword}
                placeholder="Password"
                autoComplete="current-password"
                className="border shadow-none focus:ring-0"
              />
            </div>

            <Button text="Sign in" clickEvent={() => {}} />
          </form>

          <div className="mt-10 flex items-center justify-center gap-3">
            <span className="text-sm font-semibold italic tracking-tight text-[#17136D]">
              Balangay
            </span>
          </div>
        </section>
      </div>
    </main>
  );
}
