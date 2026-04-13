import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "StateSwap — The Student Marketplace for Penn State",
  description:
    "Buy, sell, and offer services between Penn State students. Join early for founding member perks.",
  keywords: ["Penn State", "student marketplace", "buy sell", "campus services", "student entrepreneurs"],
  openGraph: {
    title: "StateSwap — The Student Marketplace for Penn State",
    description: "Buy, sell, and offer services between Penn State students.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
