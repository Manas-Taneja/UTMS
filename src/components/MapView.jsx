import React, { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { Loader } from "@googlemaps/js-api-loader";
import { Drone } from "lucide-react";

export default function MapView({ drone, onDroneClick }) {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const clickListenerRef = useRef(null);

  useEffect(() => {
    // Define initializeMap function first
    const initializeMap = () => {
      if (!mapRef.current || mapInstanceRef.current) return;

      try {
        // Clean up existing map instance
        if (mapInstanceRef.current) {
          mapInstanceRef.current = null;
        }

        mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
          center: { lat: drone.lat, lng: drone.lng },
          zoom: 13,
          mapId: "drone-tracker-map",
        });

        // Create a container for the React component
        const droneElement = document.createElement("div");
        droneElement.style.cssText = `
          width: 32px; 
          height: 32px; 
          display: flex; 
          align-items: center; 
          justify-content: center;
          cursor: pointer;
          filter: drop-shadow(0 0 1px white);
        `;
        
        // Render the Lucide Drone component into the DOM element
        const root = createRoot(droneElement);
        root.render(
          <Drone 
            size={24} 
            color="#1e3a8a" 
            strokeWidth={2}
          />
        );

        markerRef.current = new window.google.maps.marker.AdvancedMarkerElement({
          position: { lat: drone.lat, lng: drone.lng },
          map: mapInstanceRef.current,
          content: droneElement,
          title: drone.name,
        });

        if (onDroneClick) {
          clickListenerRef.current = markerRef.current.addListener("click", () => {
            onDroneClick(drone);
          });
        }
      } catch (error) {
        console.error("Error initializing map:", error);
      }
    };

    // Check if Google Maps is already loaded
    if (window.google && window.google.maps) {
      initializeMap();
      return;
    }

    const loader = new Loader({
      apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      version: "weekly",
      libraries: ["marker"],
    });

    loader.load().then(() => {
      initializeMap();
    }).catch((error) => {
      console.error("Error loading Google Maps:", error);
    });

    return () => {
      if (clickListenerRef.current) {
        clickListenerRef.current.remove();
        clickListenerRef.current = null;
      }
      if (markerRef.current) {
        markerRef.current.map = null;
        markerRef.current = null;
      }
      if (mapInstanceRef.current) {
        mapInstanceRef.current = null;
      }
    };
  }, [drone, onDroneClick]);

  return (
    <div className="w-full h-screen relative" style={{ height: 'calc(100vh - 64px)' }}>
      <div ref={mapRef} className="w-full h-full" />
      {!import.meta.env.VITE_GOOGLE_MAPS_API_KEY && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center p-8">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Map Unavailable</h3>
            <p className="text-gray-600">Google Maps API key not configured</p>
            <p className="text-sm text-gray-500 mt-2">Please add VITE_GOOGLE_MAPS_API_KEY to your .env file</p>
          </div>
        </div>
      )}
    </div>
  );
}
