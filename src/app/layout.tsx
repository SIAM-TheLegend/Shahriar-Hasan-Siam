import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/lib/hooks/use-theme";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shahriar Hasan Siam",
  description: "Portfolio of Shahriar Hasan Siam, MERN Stack Web Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                try {
                  var saved = localStorage.getItem('theme');
                  var theme = saved ? saved : 'light';
                  if (theme === 'dark') document.documentElement.classList.add('dark');
                  else document.documentElement.classList.remove('dark');
                } catch(_) {}
              })();
            `,
          }}
        />
        <ThemeProvider>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
