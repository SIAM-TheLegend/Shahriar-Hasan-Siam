"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { motion, AnimatePresence } from "motion/react";

export function Navigation() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "skills", "projects", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const logoVariants = {
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const navItemVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  return (
    <motion.nav className="fixed top-0 left-0 right-0 z-50 bg-background/20 backdrop-blur border-b-2 border-border shadow-lg" variants={navVariants} initial="hidden" animate="visible">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div className="font-mono text-lg font-semibold text-primary" variants={logoVariants} whileHover="hover">
            {"<Siam />"}
          </motion.div>
          <div className="hidden md:flex items-center space-x-1">
            <AnimatePresence>
              {navItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  variants={navItemVariants}
                  whileHover="hover"
                  whileTap="tap"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    transition: { delay: index * 0.1 },
                  }}
                >
                  <Button variant={activeSection === item.id ? "default" : "ghost"} size="sm" onClick={() => scrollToSection(item.id)} className="text-sm">
                    {item.label}
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: { delay: 0.6 },
              }}
              whileHover={{ scale: 1.1 }}
            >
              <ThemeToggle />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
