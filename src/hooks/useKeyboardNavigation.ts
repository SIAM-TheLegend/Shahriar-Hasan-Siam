"use client";

import { useEffect } from "react";
import { scrollToSection } from "@/utils/scrollUtils";

type NavigationItem = {
  href: string;
  label: string;
};

/**
 * Custom hook to add keyboard navigation support for section navigation
 * @param navigationItems Array of navigation items with href and label
 */
export function useKeyboardNavigation(navigationItems: NavigationItem[]) {
  useEffect(() => {
    // Handle keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only trigger for Tab key with Alt modifier (Alt+Tab is a common pattern for section navigation)
      if (e.altKey && e.key === "Tab") {
        e.preventDefault();

        // Determine direction (shift+alt+tab goes backwards)
        const direction = e.shiftKey ? -1 : 1;

        // Get current active section
        const currentPath = window.location.hash.slice(1) || navigationItems[0].href;
        let currentIndex = navigationItems.findIndex((item) => item.href === currentPath);

        // If not found, default to first item
        if (currentIndex === -1) currentIndex = 0;

        // Calculate new index with wrapping
        const totalItems = navigationItems.length;
        const newIndex = (currentIndex + direction + totalItems) % totalItems;

        // Navigate to new section
        scrollToSection(navigationItems[newIndex].href);

        // Update URL hash for browser history
        window.history.pushState(null, "", `#${navigationItems[newIndex].href}`);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigationItems]);
}
