/**
 * Utility functions for responsive testing
 * These functions help debug responsive layouts and identify issues on different screen sizes
 */

// Standard breakpoints for reference
export const breakpoints = {
  mobile: 640, // sm
  tablet: 768, // md
  laptop: 1024, // lg
  desktop: 1280, // xl
  widescreen: 1536, // 2xl
};

/**
 * Get the current screen size category
 * @returns The current screen size category
 */
export function getCurrentScreenSize(): string {
  if (typeof window === "undefined") return "server";

  const width = window.innerWidth;

  if (width < breakpoints.mobile) return "xs";
  if (width < breakpoints.tablet) return "sm";
  if (width < breakpoints.laptop) return "md";
  if (width < breakpoints.desktop) return "lg";
  if (width < breakpoints.widescreen) return "xl";
  return "2xl";
}

/**
 * Creates an outline around elements with the specified selector to help visualize layout
 * @param selector CSS selector for elements to highlight
 * @param color Outline color (default: red)
 */
export function highlightElements(selector: string, color: string = "red"): void {
  if (typeof document === "undefined") return;

  const elements = document.querySelectorAll(selector);
  elements.forEach((el) => {
    if (el instanceof HTMLElement) {
      el.style.outline = `2px solid ${color}`;
      el.style.outlineOffset = "-2px";
    }
  });
}

/**
 * Adds a floating indicator showing the current screen size
 * @param position Position of the indicator (default: 'bottom-right')
 */
export function addScreenSizeIndicator(position: "top-left" | "top-right" | "bottom-left" | "bottom-right" = "bottom-right"): () => void {
  if (typeof document === "undefined") return () => {};

  // Create indicator element
  const indicator = document.createElement("div");
  indicator.style.position = "fixed";
  indicator.style.zIndex = "9999";
  indicator.style.padding = "4px 8px";
  indicator.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
  indicator.style.color = "white";
  indicator.style.fontSize = "12px";
  indicator.style.fontWeight = "bold";
  indicator.style.borderRadius = "4px";

  // Set position
  if (position.includes("top")) {
    indicator.style.top = "8px";
  } else {
    indicator.style.bottom = "8px";
  }

  if (position.includes("right")) {
    indicator.style.right = "8px";
  } else {
    indicator.style.left = "8px";
  }

  // Add to DOM
  document.body.appendChild(indicator);

  // Update function
  const updateSize = () => {
    const size = getCurrentScreenSize();
    const width = window.innerWidth;
    const height = window.innerHeight;
    indicator.textContent = `${size} (${width}x${height})`;
  };

  // Initial update
  updateSize();

  // Update on resize
  window.addEventListener("resize", updateSize);

  // Return cleanup function
  return () => {
    window.removeEventListener("resize", updateSize);
    document.body.removeChild(indicator);
  };
}

/**
 * Creates a debug component to add to your app for responsive testing
 * You can import this in your development environment to help with debugging
 */
export function startResponsiveDebugMode(): () => void {
  const cleanup1 = addScreenSizeIndicator();

  // Highlight common layout components
  highlightElements(".container", "blue");
  highlightElements("section", "green");
  highlightElements("header", "orange");
  highlightElements("footer", "purple");

  // Return cleanup function
  return () => {
    cleanup1();
  };
}
