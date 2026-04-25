import type { Metadata } from "next";
import BottomNav from "@/components/layout/BottomNav";
import { Google_Sans_Flex } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Balangay",
  description: "",
  icons: {
    icon: "/design-assets/logo-login.png",
  },
};

const googleSans = Google_Sans_Flex({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-google-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={googleSans.variable + ` h-full`}>
      <body className="min-h-full font-sans flex flex-col bg-gray-100">
        {children}
        <BottomNav />
      </body>
    </html>
  );
}
