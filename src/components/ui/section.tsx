import React from "react";
import { cn } from "@/lib/utils";
import { Container } from "./container";
import { SectionTransition } from "./animations/SectionTransition";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Section ID for navigation anchors
   */
  id?: string;

  /**
   * Whether the section should occupy full viewport height
   */
  fullHeight?: boolean;

  /**
   * Section vertical padding variant
   * - default: Standard padding (py-16 md:py-24)
   * - none: No padding
   * - sm: Small padding (py-8 md:py-12)
   * - lg: Large padding (py-24 md:py-32)
   */
  padding?: "default" | "none" | "sm" | "lg";

  /**
   * Background color variant
   * - default: No specific background
   * - muted: Muted background color
   * - accent: Accent background color
   */
  background?: "default" | "muted" | "accent";

  /**
   * Container props to pass to internal Container component
   */
  containerProps?: React.ComponentPropsWithoutRef<typeof Container>;

  /**
   * Whether to use a Container component within the section
   * @default true
   */
  withContainer?: boolean;

  /**
   * Whether to use transition animations when navigating to this section
   * @default false
   */
  withTransition?: boolean;

  /**
   * Whether to use parallax effect for the background during transitions
   * @default false
   */
  withParallax?: boolean;

  /**
   * Current active section ID (for triggering transitions)
   */
  activeSection?: string;

  /**
   * Animation threshold - percentage of element visible to trigger
   * @default 0.1
   */
  threshold?: number;
}

/**
 * Section component for consistent page sections
 *
 * Provides consistent padding, background options, and container integration
 * for standardized page sections.
 */
export function Section({ id, children, className, fullHeight = false, padding = "default", background = "default", containerProps, withContainer = true, withTransition = false, withParallax = false, activeSection, threshold = 0.1, ...props }: SectionProps) {
  const content = withContainer ? <Container {...containerProps}>{children}</Container> : children;

  const sectionContent = (
    <section
      id={id}
      className={cn(
        // Base section styles
        "relative w-full",

        // Height variant
        {
          "min-h-screen": fullHeight,
        },

        // Padding variants
        {
          "py-16 md:py-24": padding === "default",
          "py-0": padding === "none",
          "py-8 md:py-12": padding === "sm",
          "py-24 md:py-32": padding === "lg",
        },

        // Background variants
        {
          "bg-background": background === "default",
          "bg-muted/30": background === "muted",
          "bg-accent": background === "accent",
        },

        className
      )}
      {...props}
    >
      {content}
    </section>
  );

  // If transitions are enabled and we have an ID, wrap in SectionTransition
  if (withTransition && id) {
    return (
      <SectionTransition id={id} withParallax={withParallax} threshold={threshold} triggerOnActive={!!activeSection} activeSection={activeSection}>
        {sectionContent}
      </SectionTransition>
    );
  }

  // Otherwise return the section without transitions
  return sectionContent;
}
