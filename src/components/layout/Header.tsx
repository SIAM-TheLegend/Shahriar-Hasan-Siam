"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useKeyboardNavigation } from "@/hooks/useKeyboardNavigation";
import { transitionToSection } from "@/utils/transitionUtils";

const navLinks = [
  { href: "home", label: "Home" },
  { href: "about", label: "About" },
  { href: "projects", label: "Projects" },
  { href: "skills", label: "Skills" },
  { href: "contact", label: "Contact" },
];

/**
 * Header component for site navigation
 */
export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Use the activeSection hook to track which section is currently in view
  const activeSection = useActiveSection(navLinks.map((link) => link.href));

  // Setup keyboard navigation support
  useKeyboardNavigation(navLinks);

  // Handle scroll events for header style changes
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when window is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileMenuOpen]);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Handle navigation link click
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();

    // Don't retrigger if already transitioning
    if (isTransitioning) return;

    // Use enhanced transition function
    setIsTransitioning(true);
    transitionToSection(sectionId, {
      onStart: () => {
        // Close mobile menu if open
        if (isMobileMenuOpen) {
          setIsMobileMenuOpen(false);
        }
      },
      onComplete: () => {
        setIsTransitioning(false);
      },
    });
  };

  // Mobile menu animation variants
  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      y: -20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-300 ${isScrolled ? "bg-background/90 backdrop-blur-md shadow-md" : "bg-transparent"}`}>
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="#home" className="text-xl sm:text-2xl font-bold tracking-tight" onClick={(e) => handleNavClick(e, "home")}>
          ShahRiar
        </Link>

        {/* Skip to content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-20 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground rounded"
          onClick={(e) => {
            e.preventDefault();
            const mainContent = document.getElementById("home");
            if (mainContent) mainContent.focus();
            handleNavClick(e, "home");
          }}
        >
          Skip to content
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={`#${link.href}`} onClick={(e) => handleNavClick(e, link.href)} className={`text-sm lg:text-base font-medium transition-colors relative ${activeSection === link.href ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`} aria-current={activeSection === link.href ? "page" : undefined}>
              {link.label}
              {activeSection === link.href && <motion.span className="absolute -bottom-1 left-0 h-0.5 w-full bg-primary" layoutId="activeSection" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
            </Link>
          ))}
          <ThemeToggle />
        </nav>

        {/* Mobile Menu Toggle and Theme Toggle */}
        <div className="flex items-center md:hidden">
          <ThemeToggle className="mr-1 sm:mr-2" />
          <button type="button" onClick={toggleMobileMenu} className="p-1.5 sm:p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"} aria-expanded={isMobileMenuOpen}>
            {isMobileMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial="hidden" animate="visible" exit="exit" variants={mobileMenuVariants} className="md:hidden bg-background border-t border-border">
            <nav className="container mx-auto px-4 py-3 flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link key={link.href} href={`#${link.href}`} onClick={(e) => handleNavClick(e, link.href)} className={`font-medium py-2 transition-colors ${activeSection === link.href ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`} aria-current={activeSection === link.href ? "page" : undefined}>
                  <div className="flex items-center">
                    {link.label}
                    {activeSection === link.href && <motion.span className="ml-2 h-1.5 w-1.5 rounded-full bg-primary" layoutId="activeMobileSection" />}
                  </div>
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
