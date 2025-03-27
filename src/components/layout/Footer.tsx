"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, ExternalLink } from "lucide-react";
import { FadeIn } from "@/components/ui/animations";
import { Stagger, StaggerItem } from "@/components/ui/animations";

// Footer navigation links
const footerNavLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "/contact", label: "Contact" },
];

// Social media links
const socialLinks = [
  { href: "https://github.com/shahriarsiam", label: "GitHub", icon: Github },
  { href: "https://linkedin.com/in/shahriarsiam", label: "LinkedIn", icon: Linkedin },
  { href: "https://twitter.com/shahriarsiam", label: "Twitter", icon: Twitter },
  { href: "mailto:contact@shahriarsiam.com", label: "Email", icon: Mail },
];

/**
 * Footer component with navigation, social links and copyright information
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  // Icon animation variants
  const iconHoverVariants = {
    idle: { scale: 1 },
    hover: {
      scale: 1.2,
      transition: { duration: 0.2 },
    },
  };

  return (
    <FadeIn className="bg-background border-t border-border mt-16 sm:mt-20">
      <footer className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 gap-6 sm:gap-8">
          {/* Main Footer Content - Top Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Brand and Description */}
            <div className="space-y-3 sm:space-y-4">
              <Link href="/" className="text-xl sm:text-2xl font-bold tracking-tight">
                ShahRiar
              </Link>
              <p className="text-sm text-muted-foreground max-w-xs">Full-stack developer passionate about creating beautiful, functional, and user-friendly websites and applications.</p>
            </div>

            {/* Quick Links */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-base sm:text-lg font-semibold">Quick Links</h3>
              <nav className="flex flex-col sm:flex-row md:flex-col space-y-2 sm:space-y-0 sm:space-x-4 md:space-x-0 md:space-y-2 flex-wrap">
                <Stagger delay={0.05}>
                  {footerNavLinks.map((link) => (
                    <Link key={link.href} href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </Link>
                  ))}
                </Stagger>
              </nav>
            </div>

            {/* Social & Contact */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-base sm:text-lg font-semibold">Connect</h3>
              <div className="flex space-x-4">
                <Stagger delay={0.05} className="flex space-x-4">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <motion.a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label={social.label} variants={iconHoverVariants} initial="idle" whileHover="hover">
                        <Icon className="h-5 w-5" />
                      </motion.a>
                    );
                  })}
                </Stagger>
              </div>
            </div>
          </div>

          {/* Copyright and Credits - Bottom Section */}
          <div className="pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center">
            <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">© {currentYear} Shahriar Hasan Siam. All rights reserved.</p>
            <p className="text-xs sm:text-sm text-muted-foreground mt-2 sm:mt-0 text-center sm:text-right">
              Built with
              <span className="mx-1">
                <Link href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground transition-colors inline-flex items-center">
                  Next.js <ExternalLink className="ml-1 h-3 w-3" />
                </Link>
              </span>
              and
              <span className="mx-1">
                <Link href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground transition-colors inline-flex items-center">
                  Tailwind CSS <ExternalLink className="ml-1 h-3 w-3" />
                </Link>
              </span>
            </p>
          </div>
        </div>
      </footer>
    </FadeIn>
  );
}
