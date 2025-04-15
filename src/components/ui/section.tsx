import * as React from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

// Animation variants for the section container
const sectionVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

// Animation variants for children elements
const childVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  withScrollAnimation?: boolean;
  threshold?: number;
  delay?: number;
  once?: boolean;
  children: React.ReactNode;
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(({ as = "section", className, children, withScrollAnimation = true, threshold = 0.1, delay = 0, once = true, ...props }, ref) => {
  const [isInView, setIsInView] = React.useState(false);
  const Component = as;

  // Standard section with no animations
  if (!withScrollAnimation) {
    return (
      <Component ref={ref} className={cn("py-10 md:py-16", className)} {...props}>
        {children}
      </Component>
    );
  }

  // Section with scroll animations
  return (
    <motion.div
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={sectionVariants}
      viewport={{
        once,
        amount: threshold,
      }}
      onViewportEnter={() => setIsInView(true)}
      className={cn("py-10 md:py-16", className)}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return <motion.div variants={childVariants}>{child}</motion.div>;
        }
        return child;
      })}
    </motion.div>
  );
});

Section.displayName = "Section";

export const SectionHeading = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => <h2 ref={ref} className={cn("text-3xl font-bold tracking-tight sm:text-4xl mb-6", className)} {...props} />);

SectionHeading.displayName = "SectionHeading";

export const SectionSubheading = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => <p ref={ref} className={cn("text-xl text-muted-foreground mb-8", className)} {...props} />);

SectionSubheading.displayName = "SectionSubheading";
