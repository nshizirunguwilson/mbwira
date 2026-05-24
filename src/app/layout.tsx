import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mbwira — Speak to me.",
  description:
    "An anonymous, culturally-grounded companion for young Rwandans. Built on Rwanda's Resilience-Oriented Therapy framework. Not a therapist. A first door.",
  metadataBase: new URL("https://mbwira.wilsonn.tech"),
  openGraph: {
    title: "Mbwira",
    description: "Speak to me. — Kinyarwanda",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-bone text-ink">{children}</body>
    </html>
  );
}
