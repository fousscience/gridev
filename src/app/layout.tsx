import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ONG GRIDév — Leadership local contre la pauvreté",
    template: "%s · ONG GRIDév",
  },
  description:
    "ONG malienne : lutter contre la pauvreté par le renforcement du leadership local. Vision, mission, projets et opportunités.",
  openGraph: {
    title: "ONG GRIDév",
    description:
      "Lutter Contre la Pauvreté par le Renforcement du Leadership Local",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${manrope.variable} h-full`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
