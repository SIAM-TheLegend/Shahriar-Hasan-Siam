/**
 * Animation Tester - Utilities for testing animations across different device sizes
 * This allows developers to simulate different devices for animation testing
 */

import { deviceBreakpoints } from "./deviceOptimizations";

// Define test screen sizes representative of common devices
export const testScreenSizes = {
  // Mobile devices
  mobileSmall: { width: 320, height: 568, name: "iPhone SE" },
  mobileMedium: { width: 375, height: 667, name: "iPhone 8" },
  mobileLarge: { width: 414, height: 896, name: "iPhone 11 Pro Max" },

  // Tablets
  tabletPortrait: { width: 768, height: 1024, name: "iPad" },
  tabletLandscape: { width: 1024, height: 768, name: "iPad Landscape" },

  // Desktops
  laptopSmall: { width: 1280, height: 720, name: "Small Laptop" },
  laptopLarge: { width: 1440, height: 900, name: "Large Laptop" },
  desktop: { width: 1920, height: 1080, name: "Desktop" },
};

/**
 * Simulates a specific device by applying viewport meta tags
 * This function should only be called in development
 * @param deviceSize The device size configuration to simulate
 */
export const simulateDevice = (deviceSize: (typeof testScreenSizes)[keyof typeof testScreenSizes]) => {
  if (typeof document === "undefined" || process.env.NODE_ENV === "production") return;

  // Update viewport meta tag
  let viewport = document.querySelector('meta[name="viewport"]');
  if (!viewport) {
    viewport = document.createElement("meta");
    viewport.setAttribute("name", "viewport");
    document.head.appendChild(viewport);
  }

  viewport.setAttribute("content", `width=${deviceSize.width}, initial-scale=1, user-scalable=no`);

  // Add indicator in development mode
  let indicator = document.getElementById("device-indicator");
  if (!indicator) {
    indicator = document.createElement("div");
    indicator.id = "device-indicator";
    indicator.style.position = "fixed";
    indicator.style.bottom = "10px";
    indicator.style.right = "10px";
    indicator.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    indicator.style.color = "white";
    indicator.style.padding = "5px 10px";
    indicator.style.borderRadius = "4px";
    indicator.style.fontSize = "12px";
    indicator.style.zIndex = "9999";
    document.body.appendChild(indicator);
  }

  indicator.textContent = `Testing: ${deviceSize.name} (${deviceSize.width}×${deviceSize.height})`;

  console.log(`🔧 Simulating device: ${deviceSize.name} (${deviceSize.width}×${deviceSize.height})`);
};

/**
 * Automatically cycles through different device sizes for testing
 * This is intended for development use only
 * @param intervalMs Time in milliseconds between device changes
 * @returns A function to stop the cycling
 */
export const cycleDevices = (intervalMs = 5000) => {
  if (typeof window === "undefined" || process.env.NODE_ENV === "production") {
    return () => {}; // No-op for SSR or production
  }

  const devices = Object.values(testScreenSizes);
  let currentIndex = 0;

  // Initial simulation
  simulateDevice(devices[currentIndex]);

  // Set up interval to cycle through devices
  const intervalId = window.setInterval(() => {
    currentIndex = (currentIndex + 1) % devices.length;
    simulateDevice(devices[currentIndex]);
  }, intervalMs);

  // Return function to stop cycling
  return () => {
    window.clearInterval(intervalId);

    // Reset viewport
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.setAttribute("content", "width=device-width, initial-scale=1");
    }

    // Remove indicator
    const indicator = document.getElementById("device-indicator");
    if (indicator) {
      indicator.remove();
    }

    console.log("🔧 Device simulation stopped");
  };
};
