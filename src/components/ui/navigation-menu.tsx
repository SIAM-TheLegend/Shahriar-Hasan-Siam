import * as React from "react";
import { cva } from "class-variance-authority";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Animation variants for the navigation menu
const menuVariants = {
  hidden: {
    opacity: 0,
    y: -5,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -5,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
};

// Navigation menu container styles
const navigationMenuStyles = cva("relative flex w-full items-center justify-between py-4", {
  variants: {
    variant: {
      default: "",
      sticky: "fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-background/80",
      transparent: "bg-transparent",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface NavigationMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "sticky" | "transparent";
  logo?: React.ReactNode;
  children?: React.ReactNode;
}

export const NavigationMenu = React.forwardRef<HTMLDivElement, NavigationMenuProps>(({ className, variant = "default", logo, children, ...props }, ref) => {
  return (
    <div ref={ref} className={cn(navigationMenuStyles({ variant, className }))} {...props}>
      {logo && <div className="flex-shrink-0">{logo}</div>}
      <div className="hidden md:flex items-center space-x-8">{children}</div>
      <div className="md:hidden">
        <NavigationMenuMobile>{children}</NavigationMenuMobile>
      </div>
    </div>
  );
});

NavigationMenu.displayName = "NavigationMenu";

// Navigation link styles
const navigationLinkStyles = cva("text-foreground hover:text-primary transition-colors relative inline-flex items-center justify-center", {
  variants: {
    variant: {
      default: "",
      active: "text-primary font-medium",
    },
    underline: {
      true: "after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-primary after:bottom-0 after:left-0 hover:after:w-full after:transition-all",
      false: "",
    },
  },
  defaultVariants: {
    variant: "default",
    underline: true,
  },
});

interface NavigationLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "default" | "active";
  underline?: boolean;
}

export const NavigationLink = React.forwardRef<HTMLAnchorElement, NavigationLinkProps>(({ className, variant, underline, children, ...props }, ref) => {
  return (
    <a ref={ref} className={cn(navigationLinkStyles({ variant, underline, className }))} {...props}>
      {children}
    </a>
  );
});

NavigationLink.displayName = "NavigationLink";

// Mobile navigation menu
interface NavigationMenuMobileProps {
  children: React.ReactNode;
}

export const NavigationMenuMobile: React.FC<NavigationMenuMobileProps> = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Convert children to array and filter only NavigationLink components
  const links = React.Children.toArray(children).filter((child) => React.isValidElement(child) && child.type === NavigationLink);

  return (
    <>
      <button onClick={toggleMenu} className="p-2 rounded-md hover:bg-accent" aria-label={isOpen ? "Close menu" : "Open menu"}>
        <div className="w-6 h-5 flex flex-col justify-between">
          <motion.span className="w-full h-0.5 bg-foreground" animate={isOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }} transition={{ duration: 0.2 }} />
          <motion.span className="w-full h-0.5 bg-foreground" animate={isOpen ? { opacity: 0 } : { opacity: 1 }} transition={{ duration: 0.2 }} />
          <motion.span className="w-full h-0.5 bg-foreground" animate={isOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }} transition={{ duration: 0.2 }} />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div className="absolute top-full left-0 right-0 bg-background shadow-lg p-4 mt-2 rounded-md z-50 flex flex-col space-y-4" variants={menuVariants} initial="hidden" animate="visible" exit="exit">
            {links.map((link, index) => (
              <div key={index} onClick={() => setIsOpen(false)}>
                {link}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
