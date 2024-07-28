import { Poppins } from "next/font/google";
import Navbar from "@/components/Shared/Navbar";
import "./globals.css";

export const metadata = {
  title: "Shahriar Hasan Siam",
  description: "Shahriar Hasan Siam NextJS app",
};

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400'],
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.className}>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
