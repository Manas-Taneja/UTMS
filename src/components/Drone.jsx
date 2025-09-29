import React from "react";
import { Drone as DroneGlyph } from "lucide-react";
import { getDroneStyle } from "./droneSlugs";

// Representation of a drone on the map (not just an icon)
export default function Drone({ size = 24, color, strokeWidth = 2, slug = "standard", className, useCurrentColor = false }) {
  const style = getDroneStyle(slug);
  const resolvedColor = useCurrentColor ? undefined : (color || style.color);
  return (
    <DroneGlyph
      size={size}
      color={resolvedColor}
      strokeWidth={strokeWidth}
      className={className}
    />
  );
}


