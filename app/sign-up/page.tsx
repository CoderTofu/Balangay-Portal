"use client";

import { useMemo, useState } from "react";
import { Building2, User as UserIcon } from "lucide-react";
import InputField from "@/components/forms/InputField";
import Button from "@/components/forms/Buttons";
import ChoiceButton from "@/components/forms/ChoiceButton";
import Stepper from "@/components/forms/Stepper";
import LabeledField from "@/components/forms/LabeledField";
import DropdownField from "@/components/forms/DropdownField";
import TextArea from "@/components/forms/TextArea";
import TopBar from "@/components/layout/TopBar";

type Represent = "business" | "individual";
type SignUpStep = "register" | "profile";

export default function SignUp() {
  const [step, setStep] = useState<SignUpStep>("register");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [represent, setRepresent] = useState<Represent>("business");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [location, setLocation] = useState("NCR (National Capital Region)");

  const [businessName, setBusinessName] = useState("");
  const [shortDescription, setShortDescription] = useState("");

  const isBusiness = represent === "business";

  const registerDisabled = useMemo(() => {
    return (
      email.trim().length === 0 ||
      password.trim().length === 0 ||
      confirmPassword.trim().length === 0
    );
  }, [confirmPassword, email, password]);

  const profileDisabled = useMemo(() => {
    if (isBusiness) {
      return (
        firstName.trim().length === 0 ||
        lastName.trim().length === 0 ||
        location.trim().length === 0 ||
        businessName.trim().length === 0 || 
        shortDescription.trim().length === 0
      );
    }
    return (
      firstName.trim().length === 0 ||
      lastName.trim().length === 0 ||
      location.trim().length === 0
    );
  }, [
    businessName,
    firstName,
    isBusiness,
    lastName,
    location,
    shortDescription,
  ]);

  const locationOptions = useMemo(
    () => [
      {
        label: "NCR (National Capital Region)",
        value: "NCR (National Capital Region)",
      },
      { label: "Region I (Ilocos Region)", value: "Region I (Ilocos Region)" },
      {
        label: "Region II (Cagayan Valley)",
        value: "Region II (Cagayan Valley)",
      },
      {
        label: "Region III (Central Luzon)",
        value: "Region III (Central Luzon)",
      },
      { label: "Region IV-A (CALABARZON)", value: "Region IV-A (CALABARZON)" },
      { label: "Region V (Bicol Region)", value: "Region V (Bicol Region)" },
      {
        label: "Region VI (Western Visayas)",
        value: "Region VI (Western Visayas)",
      },
      {
        label: "Region VII (Central Visayas)",
        value: "Region VII (Central Visayas)",
      },
      {
        label: "Region VIII (Eastern Visayas)",
        value: "Region VIII (Eastern Visayas)",
      },
      {
        label: "Region IX (Zamboanga Peninsula)",
        value: "Region IX (Zamboanga Peninsula)",
      },
      {
        label: "Region X (Northern Mindanao)",
        value: "Region X (Northern Mindanao)",
      },
      { label: "Region XI (Davao Region)", value: "Region XI (Davao Region)" },
      {
        label: "Region XII (SOCCSKSARGEN)",
        value: "Region XII (SOCCSKSARGEN)",
      },
      { label: "Region XIII (Caraga)", value: "Region XIII (Caraga)" },
      { label: "BARMM", value: "BARMM" },
    ],
    [],
  );

  return (
    <main className="mt-6 flex flex-col">
      <div className="mx-auto w-full px-4">
        {/* Stepper */}
        <section className="flex flex-col rounded-2xl bg-white px-6 pt-5 pb-10 shadow-[0_10px_25px_rgba(16,24,40,0.08)]">
          <Stepper
            steps={["Register", "Profile"]}
            currentStep={step === "register" ? 0 : 1}
          />

          {step === "register" ? (
            <>
              <h1 className="mt-6 text-2xl font-bold tracking-tight text-[#000]">
                Let&apos;s get you started.
              </h1>

              <div className="mt-6 space-y-4">
                <LabeledField label="Email">
                  <div className="rounded-xl bg-white">
                    <InputField
                      type="email"
                      value={email}
                      setContent={setEmail}
                      placeholder="Enter your email"
                      autoComplete="email"
                      className="shadow-none focus:ring-0"
                    />
                  </div>
                </LabeledField>

                <LabeledField label="Password">
                  <div className="rounded-xl bg-white">
                    <InputField
                      type="password"
                      value={password}
                      setContent={setPassword}
                      placeholder="Enter your password"
                      autoComplete="new-password"
                      className="shadow-none focus:ring-0"
                    />
                  </div>
                </LabeledField>

                <LabeledField label="Confirm Password">
                  <div className="rounded-xl bg-white">
                    <InputField
                      type="password"
                      value={confirmPassword}
                      setContent={setConfirmPassword}
                      placeholder="Re-enter your password"
                      autoComplete="new-password"
                      className="shadow-none focus:ring-0"
                    />
                  </div>
                </LabeledField>
              </div>
            </>
          ) : (
            <>
              <h1 className="mt-6 text-2xl font-bold tracking-tight text-[#0F172A]">
                Tell us about yourself.
              </h1>

              <div className="mt-6 space-y-4">
                <LabeledField label="First Name">
                  <div className="rounded-xl bg-white">
                    <InputField
                      value={firstName}
                      setContent={setFirstName}
                      placeholder="e.g., John Paolo"
                      className="shadow-none focus:ring-0"
                    />
                  </div>
                </LabeledField>

                <LabeledField label="Last Name">
                  <div className="rounded-xl bg-white">
                    <InputField
                      value={lastName}
                      setContent={setLastName}
                      placeholder="e.g., Dela Cruz"
                      className="shadow-none focus:ring-0"
                    />
                  </div>
                </LabeledField>

                <LabeledField label="Location">
                  <div className="rounded-xl bg-white">
                    <DropdownField
                      value={location}
                      setContent={setLocation}
                      options={locationOptions}
                      className="shadow-none focus:ring-0"
                    />
                  </div>
                </LabeledField>
              </div>

              {/* Represent */}
              <div className="mt-6">
                <h2 className="text-sm font-semibold text-slate-900">
                  What do you represent?
                </h2>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <ChoiceButton
                    label="Business"
                    selected={represent === "business"}
                    onSelect={() => setRepresent("business")}
                    icon={<Building2 size={18} />}
                  />
                  <ChoiceButton
                    label="Individual"
                    selected={represent === "individual"}
                    onSelect={() => setRepresent("individual")}
                    icon={<UserIcon size={18} />}
                  />
                </div>
              </div>

              {/* Individual form */}
              {/* {!isBusiness ? (
                <div></div>
              ) : null} */}

              {/* Business information */}
              {isBusiness ? (
                <div className="mt-6">
                  <h3 className="text-sm font-extrabold tracking-wide text-[#17136D]">
                    BUSINESS INFORMATION
                  </h3>
                  <div className="mt-3 h-min w-full " />

                  <div className="mt-5 space-y-4">
                    <LabeledField label="Business Name">
                      <div className="rounded-xl">
                        <InputField
                          value={businessName}
                          setContent={setBusinessName}
                          placeholder="e.g., John’s Hard Rods"
                          className="shadow-none focus:ring-0"
                        />
                      </div>
                    </LabeledField>

                    <LabeledField label="Business Description">
                      <div className="rounded-xl">
                        <TextArea
                          value={shortDescription}
                          setContent={setShortDescription}
                          placeholder="Provide a short description about the business..."
                          rows={3}
                          className="shadow-none focus:ring-0"
                        />
                      </div>
                    </LabeledField>
                  </div>
                </div>
              ) : null}
            </>
          )}
        </section>

        {/* Bottom action */}
        <div className="h-15">
          {step === "register" ? (
            <Button
              text="Next"
              variant="primary"
              disabled={registerDisabled}
              clickEvent={() => setStep("profile")}
            />
          ) : (
            <div className="flex flex-row gap-3">
              <Button
                text="Back"
                variant="secondary"
                className="mt-3"
                clickEvent={() => setStep("register")}
              />
              <Button
                text="Submit"
                variant="primary"
                disabled={profileDisabled}
                className="mt-2"
                clickEvent={() => {}}
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
