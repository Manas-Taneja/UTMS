import React, { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

const DRONE_ICON = (heading = 0) => {
  // Simple red drone SVG, rotated by heading
  return {
    url: `data:image/svg+xml;utf8,<svg width='32' height='32' xmlns='http://www.w3.org/2000/svg'><g transform='rotate(${heading},16,16)'><circle cx='16' cy='16' r='10' fill='red'/><rect x='14' y='4' width='4' height='8' fill='black'/><rect x='14' y='20' width='4' height='8' fill='black'/></g></svg>`,
    scaledSize: { width: 32, height: 32 },
    anchor: { x: 16, y: 16 },
  };
};

export default function MapView({ drone }) {
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: "AIzaSyCTgHtRKQvI6lDHrf4T9NUiHN_Opk_moBs",
      version: "weekly",
    });
    let map;
    loader.load().then(() => {
      map = new window.google.maps.Map(mapRef.current, {
        center: { lat: drone.lat, lng: drone.lng },
        zoom: 13,
        mapId: "drone-tracker-map",
      });
      markerRef.current = new window.google.maps.Marker({
        position: { lat: drone.lat, lng: drone.lng },
        map,
        icon: DRONE_ICON(drone.heading),
        title: drone.name,
      });
    });
    return () => {
      if (markerRef.current) markerRef.current.setMap(null);
    };
  }, [drone]);

  return <div ref={mapRef} className="w-full h-[640px]" />;
}
