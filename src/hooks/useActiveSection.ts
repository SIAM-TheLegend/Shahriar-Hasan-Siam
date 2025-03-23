"use client";

import { useState, useEffect } from "react";

/**
 * Custom hook to track the active section based on scroll position
 * @param sectionIds Array of section IDs to track
 * @param offset Offset from the top of the viewport (in pixels)
 * @returns The currently active section ID
 */
export function useActiveSection(sectionIds: string[], offset = 80) {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    // Function to determine which section is currently in view
    const handleScroll = () => {
      // Get the current scroll position
      const scrollPosition = window.scrollY + offset;

      // Find the section that is currently in view
      let currentSection = "";

      // Iterate through each section to find which one is in view
      for (const sectionId of sectionIds) {
        const element = document.getElementById(sectionId);

        if (!element) continue;

        // Get section boundaries
        const sectionTop = element.offsetTop;
        const sectionHeight = element.offsetHeight;

        // Check if the current scroll position is within this section
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          currentSection = sectionId;
          break;
        }
      }

      // Special case for when scrolled to the bottom of the page
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        currentSection = sectionIds[sectionIds.length - 1];
      }

      // If we found a section in view, or we reached the bottom of the page
      if (currentSection && currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Initial call to set the active section on mount
    handleScroll();

    // Clean up event listener
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionIds, activeSection, offset]);

  return activeSection;
}
