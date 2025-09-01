import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shahriar Hasan Siam",
  description: "MERN Stack Portfolio Website of Shahriar Hasan Siam",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* <meta name="monetag" content="b1e62672f13ca681ad70a7ee51c2fa67" /> */}
        <script type='text/javascript' src='//pl27556517.revenuecpmgate.com/c9/ed/35/c9ed35deffd5c9afc998400ca76ef1cb.js'></script>
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
