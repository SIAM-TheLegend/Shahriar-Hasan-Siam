"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { AnimatedText } from "./animations";
import { motion } from "framer-motion";

// Heading component
interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /**
   * Heading level (h1, h2, h3, h4, h5, h6)
   */
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

  /**
   * Whether to animate the heading
   */
  animated?: boolean;

  /**
   * Animation delay in seconds
   */
  delay?: number;
}

/**
 * Heading component for consistent heading styles
 *
 * Can be rendered as any heading level (h1-h6) with appropriate styling
 * and optional animation.
 */
export function Heading({ as: Component = "h2", children, className, animated = false, delay = 0, ...props }: HeadingProps) {
  const headingStyle = cn(
    // Base styles
    "font-bold tracking-tight",

    // Size variants based on heading level
    {
      "text-4xl sm:text-5xl md:text-6xl lg:text-7xl": Component === "h1",
      "text-3xl sm:text-4xl md:text-5xl": Component === "h2",
      "text-2xl sm:text-3xl md:text-4xl": Component === "h3",
      "text-xl sm:text-2xl": Component === "h4",
      "text-lg sm:text-xl": Component === "h5",
      "text-base sm:text-lg": Component === "h6",
    },

    className
  );

  if (animated) {
    // Convert children to string for AnimatedText
    const childrenText = React.Children.toArray(children)
      .map((child) => (typeof child === "string" || typeof child === "number" ? String(child) : ""))
      .join(" ");

    return <AnimatedText text={childrenText} as={Component} className={headingStyle} delay={delay} {...props} />;
  }

  return (
    <Component className={headingStyle} {...props}>
      {children}
    </Component>
  );
}

// Paragraph component
interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /**
   * Paragraph size variant
   * - default: Standard text size (text-base)
   * - sm: Small text (text-sm)
   * - lg: Large text (text-lg)
   * - xl: Extra large text (text-xl)
   */
  size?: "default" | "sm" | "lg" | "xl";

  /**
   * Whether to make the text muted
   */
  muted?: boolean;

  /**
   * Whether to animate the paragraph
   */
  animated?: boolean;

  /**
   * Animation delay in seconds
   */
  delay?: number;
}

/**
 * Paragraph component for consistent paragraph styles
 *
 * Provides size variants and optional animation.
 */
export function Paragraph({ children, className, size = "default", muted = false, animated = false, delay = 0, ...props }: ParagraphProps) {
  const paragraphStyle = cn(
    // Size variants
    {
      "text-base": size === "default",
      "text-sm": size === "sm",
      "text-lg": size === "lg",
      "text-xl": size === "xl",
    },

    // Muted variant
    {
      "text-muted-foreground": muted,
    },

    className
  );

  if (animated) {
    // Convert children to string for AnimatedText
    const childrenText = React.Children.toArray(children)
      .map((child) => (typeof child === "string" || typeof child === "number" ? String(child) : ""))
      .join(" ");

    return <AnimatedText text={childrenText} as="p" className={paragraphStyle} delay={delay} {...props} />;
  }

  return (
    <p className={paragraphStyle} {...props}>
      {children}
    </p>
  );
}

// Lead paragraph component (highlighted intro paragraph)
interface LeadProps extends ParagraphProps {}

/**
 * Lead component for highlighted paragraphs
 *
 * Typically used for introduction paragraphs or emphasized text.
 */
export function Lead({ children, className, ...props }: LeadProps) {
  return (
    <Paragraph className={cn("text-xl text-foreground/80", className)} {...props}>
      {children}
    </Paragraph>
  );
}

// Subtle text component (less emphasized)
interface SubtleProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /**
   * Whether to animate the text
   */
  animated?: boolean;

  /**
   * Animation delay in seconds
   */
  delay?: number;
}

/**
 * Subtle component for less emphasized text
 *
 * Used for captions, hints, or secondary information.
 */
export function Subtle({ children, className, animated = false, delay = 0, ...props }: SubtleProps) {
  const subtleStyle = cn("text-sm text-muted-foreground", className);

  if (animated) {
    // Convert children to string for AnimatedText
    const childrenText = React.Children.toArray(children)
      .map((child) => (typeof child === "string" || typeof child === "number" ? String(child) : ""))
      .join(" ");

    return <AnimatedText text={childrenText} as="p" className={subtleStyle} delay={delay} {...props} />;
  }

  return (
    <p className={subtleStyle} {...props}>
      {children}
    </p>
  );
}

// Blockquote component
interface BlockquoteProps extends Omit<React.HTMLAttributes<HTMLQuoteElement>, "cite"> {
  /**
   * Quote source/attribution
   */
  cite?: string;

  /**
   * Whether to animate the blockquote
   */
  animated?: boolean;

  /**
   * Animation delay in seconds
   */
  delay?: number;
}

/**
 * Blockquote component for quoted content
 *
 * Provides styled blockquotes with optional citation and animation.
 */
export function Blockquote({ children, className, cite, animated = false, delay = 0, ...props }: BlockquoteProps) {
  const blockquoteStyle = cn("pl-6 border-l-2 border-primary italic", className);

  // For blockquotes, we'll use a simpler animation approach
  if (animated) {
    return (
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.5,
          delay,
          ease: [0.2, 0.65, 0.3, 0.9],
        }}
      >
        <blockquote className={blockquoteStyle} {...props}>
          {children}
          {cite && <cite className="block text-sm text-muted-foreground mt-2 not-italic">— {cite}</cite>}
        </blockquote>
      </motion.div>
    );
  }

  return (
    <blockquote className={blockquoteStyle} {...props}>
      {children}
      {cite && <cite className="block text-sm text-muted-foreground mt-2 not-italic">— {cite}</cite>}
    </blockquote>
  );
}
