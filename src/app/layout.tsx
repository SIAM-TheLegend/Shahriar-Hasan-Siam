import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

// Load Inter font with Latin subset
const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://shahriar-hasan-siam.vercel.app"),
  title: "Shahriar Hasan Siam | Portfolio",
  description: "Personal portfolio showcasing my projects, skills, and experience as a developer",
  keywords: ["portfolio", "web developer", "frontend", "react", "next.js"],
  authors: [{ name: "Shahriar Hasan Siam" }],
  creator: "Shahriar Hasan Siam",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Shahriar Hasan Siam | Portfolio",
    description: "Personal portfolio showcasing my projects, skills, and experience as a developer",
    siteName: "Shahriar Hasan Siam",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shahriar Hasan Siam | Portfolio",
    description: "Personal portfolio showcasing my projects, skills, and experience as a developer",
    creator: "@shahriarsiam",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <Header />
          <main className="min-h-screen pt-20">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
