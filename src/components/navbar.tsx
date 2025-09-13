"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { siteLinks } from "@/lib/site";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/theme-toggle";

// Navbar component rendered globally from the app layout.
// - Uses shadcn UI primitives for consistent styling
// - Uses Motion for subtle entrance and interaction animations
// - Provides responsive desktop navigation and a mobile Sheet menu
export function Navbar() {
  // Track when the user has scrolled to toggle a subtle backdrop and border
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems: Array<{ label: string; href: string }> = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <motion.header initial={{ y: -24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4, ease: "easeOut" }} className={cn("fixed inset-x-0 top-0 z-50")}>
      <div className={cn("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", "h-16 flex items-center justify-between", "transition-colors", scrolled ? "backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b" : "bg-transparent")}>
        {/* Brand / Logo */}
        <div className="flex items-center gap-2">
          <Link href="#hero" className="font-semibold text-lg tracking-tight">
            Shahriar Hasan Siam
          </Link>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-2">
          {navItems.map((item) => (
            <Button key={item.href} asChild variant="ghost" className="px-3">
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}

          <Button asChild variant="outline" className="ml-1">
            <Link href={siteLinks.cv} target="_blank" rel="noopener noreferrer">
              Download CV
            </Link>
          </Button>

          <div className="ml-2 hidden lg:flex items-center">
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="pt-12">
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <Button key={item.href} asChild variant="ghost" className="justify-start">
                    <Link href={item.href}>{item.label}</Link>
                  </Button>
                ))}
                <Button asChild variant="outline" className="mt-2">
                  <Link href={siteLinks.cv} target="_blank" rel="noopener noreferrer">
                    Download CV
                  </Link>
                </Button>

                <div className="mt-4">
                  <ThemeToggle />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}

export default Navbar;
