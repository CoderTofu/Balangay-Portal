"use client";

import Image from "next/image";
import InputField from "@/components/forms/InputField";
import Button from "@/components/forms/Buttons";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
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
          <h1 className="relative z-10 max-w-65 text-3xl font-semibold italic tracking-tight text-white drop-shadow-sm">
            Ikot ng halaga,
            <br />
            ikot ng kabuhayan
          </h1>

          {/* Logo illustration */}
          <div className="pointer-events-none absolute bottom-0 right-0 z-1 w-125 translate-x-1/5 ">
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
          <div className="space-y-4">
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

            <div className="flex 0 gap-2">
              <Button
                text="Sign up"
                clickEvent={() => {
                  router.push("/sign-up");
                }}
                variant="secondary"
              ></Button>
              <Button text="Sign in" clickEvent={async () => {
                try {
                   const resp = await fetch('http://localhost:8080/api/users/login-by-email', {
                     method: 'POST',
                     headers: {
                       'Content-Type': 'application/json'
                     },
                     body: JSON.stringify({ email })
                   });
                   const data = await resp.json();
                   if (resp.ok) {
                      console.log("Login successful, user data:", data);
                      localStorage.setItem('curruser_id', data.id);
                      router.push("/home");
                    } else {
                      alert("Login failed: " + (data.message || "Unknown error"));
                    }
                } catch (error) {
                  console.error("Login failed:", error);
                }
              }} />
            </div>
          </div>

          {/* <div className="mt-10 flex items-center justify-center gap-3">
            <span className="text-xs font-semibold italic tracking-tight text-[#17136D]">
              Balangay
            </span>
          </div> */}
        </section>
      </div>
    </main>
  );
}
