"use client";

import { useState, useEffect } from "react";
import { simulateDevice, cycleDevices, testScreenSizes } from "@/utils/animationTester";

/**
 * A component that provides UI for testing animations on different devices
 * This is meant to be used in development only
 */
export function AnimationTester() {
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [isCycling, setIsCycling] = useState(false);
  const [cyclerId, setCyclerId] = useState<ReturnType<typeof cycleDevices> | null>(null);

  // Stop cycling on unmount
  useEffect(() => {
    return () => {
      if (cyclerId) {
        cyclerId();
      }
    };
  }, [cyclerId]);

  // Don't render in SSR or production
  if (typeof window === "undefined" || process.env.NODE_ENV === "production") {
    return null;
  }

  // Handle device selection
  const handleDeviceSelect = (deviceKey: keyof typeof testScreenSizes) => {
    // Stop any active cycling
    if (cyclerId) {
      cyclerId();
      setCyclerId(null);
      setIsCycling(false);
    }

    setSelectedDevice(deviceKey as string);
    simulateDevice(testScreenSizes[deviceKey]);
  };

  // Toggle cycling mode
  const toggleCycling = () => {
    if (isCycling && cyclerId) {
      cyclerId();
      setCyclerId(null);
      setIsCycling(false);
    } else {
      const stopper = cycleDevices();
      setCyclerId(stopper);
      setIsCycling(true);
      setSelectedDevice(null);
    }
  };

  // Reset to normal viewport
  const resetViewport = () => {
    if (cyclerId) {
      cyclerId();
      setCyclerId(null);
      setIsCycling(false);
    }

    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.setAttribute("content", "width=device-width, initial-scale=1");
    }

    // Remove indicator
    const indicator = document.getElementById("device-indicator");
    if (indicator) {
      indicator.remove();
    }

    setSelectedDevice(null);
    console.log("🔧 Device simulation reset to normal viewport");
  };

  // Styles for the test harness UI
  const containerStyle = {
    position: "fixed",
    top: "20px",
    right: "20px",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    padding: "15px",
    borderRadius: "8px",
    zIndex: 10000,
    color: "white",
    fontFamily: "sans-serif",
    fontSize: "14px",
    width: "220px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
  } as const;

  const buttonStyle = {
    padding: "8px 12px",
    margin: "5px",
    backgroundColor: "#4a4a4a",
    border: "none",
    borderRadius: "4px",
    color: "white",
    cursor: "pointer",
    fontSize: "12px",
  } as const;

  const activeButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#0066cc",
    fontWeight: "bold",
  } as const;

  const sectionStyle = {
    marginBottom: "10px",
    borderBottom: "1px solid #444",
    paddingBottom: "10px",
  } as const;

  return (
    <div style={containerStyle}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
        <h3 style={{ margin: 0, fontSize: "16px" }}>Animation Tester</h3>
        <button style={{ ...buttonStyle, padding: "4px 8px", backgroundColor: "#666" }} onClick={resetViewport}>
          ✕
        </button>
      </div>

      <div style={sectionStyle}>
        <button style={isCycling ? activeButtonStyle : buttonStyle} onClick={toggleCycling}>
          {isCycling ? "Stop Cycling" : "Auto Cycle Devices"}
        </button>
      </div>

      <div style={sectionStyle}>
        <h4 style={{ margin: "5px 0", fontSize: "14px" }}>Mobile</h4>
        {Object.entries(testScreenSizes)
          .filter(([key]) => key.includes("mobile"))
          .map(([key, device]) => (
            <button key={key} style={selectedDevice === key ? activeButtonStyle : buttonStyle} onClick={() => handleDeviceSelect(key as keyof typeof testScreenSizes)}>
              {device.name}
            </button>
          ))}
      </div>

      <div style={sectionStyle}>
        <h4 style={{ margin: "5px 0", fontSize: "14px" }}>Tablet</h4>
        {Object.entries(testScreenSizes)
          .filter(([key]) => key.includes("tablet"))
          .map(([key, device]) => (
            <button key={key} style={selectedDevice === key ? activeButtonStyle : buttonStyle} onClick={() => handleDeviceSelect(key as keyof typeof testScreenSizes)}>
              {device.name}
            </button>
          ))}
      </div>

      <div style={sectionStyle}>
        <h4 style={{ margin: "5px 0", fontSize: "14px" }}>Desktop</h4>
        {Object.entries(testScreenSizes)
          .filter(([key]) => key.includes("laptop") || key.includes("desktop"))
          .map(([key, device]) => (
            <button key={key} style={selectedDevice === key ? activeButtonStyle : buttonStyle} onClick={() => handleDeviceSelect(key as keyof typeof testScreenSizes)}>
              {device.name}
            </button>
          ))}
      </div>

      <div style={{ fontSize: "11px", opacity: 0.7, textAlign: "center", marginTop: "5px" }}>Development mode only</div>
    </div>
  );
}
