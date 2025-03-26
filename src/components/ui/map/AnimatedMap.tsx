"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { cn } from "@/lib/utils";
import { timings, easings } from "@/components/ui/animations/variants";

// Fix for Leaflet marker icons in Next.js
// This is needed because Leaflet expects the marker icons to be in the public folder
const markerIcon = L.icon({
  iconUrl: "/images/marker-icon.png",
  iconRetinaUrl: "/images/marker-icon-2x.png",
  shadowUrl: "/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

export interface AnimatedMapProps {
  className?: string;
  position: [number, number]; // [latitude, longitude]
  zoom?: number;
  popupText?: string;
  delay?: number;
  withAnimation?: boolean;
}

/**
 * AnimatedMap component
 * Displays an interactive map with animation effects
 */
export function AnimatedMap({ className, position, zoom = 13, popupText = "I'm here!", delay = 0.3, withAnimation = true }: AnimatedMapProps) {
  const [isClient, setIsClient] = useState(false);
  const mapRef = useRef<L.Map | null>(null);

  // Fix for React Leaflet SSR issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Animation effect when map comes into view
  useEffect(() => {
    if (mapRef.current && withAnimation) {
      // Wait a bit before flying to location
      const timer = setTimeout(() => {
        mapRef.current?.flyTo(position, zoom, {
          duration: 1.5, // Duration in seconds
          easeLinearity: 0.5,
        });
      }, delay * 1000);

      return () => clearTimeout(timer);
    }
  }, [isClient, position, zoom, delay, withAnimation]);

  // Motion variants for the container
  const containerVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      y: 30,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: timings.medium,
        ease: easings.spring,
        delay: delay,
      },
    },
  };

  if (!isClient) {
    return <motion.div className={cn("w-full h-[300px] bg-muted rounded-lg animate-pulse", className)} variants={containerVariants} initial="hidden" animate="visible" />;
  }

  return (
    <motion.div className={cn("w-full h-[300px] rounded-xl overflow-hidden shadow-lg border border-border", className)} variants={containerVariants} initial="hidden" animate="visible">
      <MapContainer center={position} zoom={zoom} className="h-full w-full" ref={mapRef} zoomControl={false}>
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position} icon={markerIcon}>
          <Popup>{popupText}</Popup>
        </Marker>
      </MapContainer>
    </motion.div>
  );
}
