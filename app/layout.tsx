import type { Metadata } from "next";
import BottomNav from "@/components/layout/BottomNav";
import "./globals.css";

export const metadata: Metadata = {
  title: "Balangay",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full`}>
      <body className="min-h-full flex flex-col bg-gray-100">
        {children}
        <BottomNav />
      </body>
    </html>
  );
}
