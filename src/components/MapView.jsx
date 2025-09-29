import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { Loader } from "@googlemaps/js-api-loader";
import Drone from "./Drone";

export default function MapView({ drone, drones = [], onDroneClick }) {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const clickListenerRef = useRef(null);
  const nightOverlayRef = useRef(null);
  const overlayTimerRef = useRef(null);
  const multiMarkersRef = useRef([]); // [{ marker, root, listener }]
  const [isMapReady, setIsMapReady] = useState(false);

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
          zoom: 3,
          mapId: "UTMS-GMAPS",
        
          disableDefaultUI: true
        });
        setIsMapReady(true);

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

        // Render the Drone representation into the DOM element
        const root = createRoot(droneElement);
        root.render(
          <Drone
            size={24}
            strokeWidth={2}
            useCurrentColor
            className="text-blue-800 hover:text-red-500 transition-colors duration-150"
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

        // --- Day/Night ellipse overlay (approximate anti-solar centered ellipse) ---
        const clampLng = (lng) => {
          let l = lng;
          while (l > 180) l -= 360;
          while (l < -180) l += 360;
          return l;
        };

        const getApproxAntiSolarCenter = (date) => {
          const d = new Date(date);
          const start = new Date(Date.UTC(d.getUTCFullYear(), 0, 0));
          const diff = d - start;
          const oneDay = 1000 * 60 * 60 * 24;
          const dayOfYear = diff / oneDay;

          // Solar declination (degrees)
          const decl = 23.44 * Math.sin((2 * Math.PI / 365.24) * (dayOfYear - 81));

          // Equation of time (minutes)
          const B = (2 * Math.PI * (dayOfYear - 81)) / 364;
          const equationOfTimeMin = 9.87 * Math.sin(2 * B) - 7.53 * Math.cos(B) - 1.5 * Math.sin(B);

          // Subsolar longitude where local solar time is 12:00
          const utcHours = d.getUTCHours() + d.getUTCMinutes() / 60;
          const subSolarLng = (12 - utcHours - equationOfTimeMin / 60) * 15; // degrees

          const subSolarLat = decl;
          const antiSolar = { lat: -subSolarLat, lng: clampLng(subSolarLng + 180) };
          return antiSolar;
        };

        const getNightEllipsePath = (date) => {
          const center = getApproxAntiSolarCenter(date);
          const centerLatRad = center.lat * Math.PI / 180;

          // Semi-axes in degrees; longitude axis adjusted by cos(latitude)
          const semiLat = 75; // north-south radius
          const semiLngAtEquator = 110; // east-west radius at equator
          const semiLng = semiLngAtEquator * Math.max(0.3, Math.cos(centerLatRad));

          const points = [];
          const steps = 180; // smooth ellipse
          for (let i = 0; i < steps; i++) {
            const t = (i / steps) * 2 * Math.PI;
            const lat = center.lat + semiLat * Math.sin(t);
            const lng = clampLng(center.lng + semiLng * Math.cos(t));
            points.push({ lat, lng });
          }
          // Close the polygon implicitly by Google Maps
          return points;
        };

        const drawEllipseOverlay = () => {
          try {
            const now = new Date();
            const path = getNightEllipsePath(now);
            if (nightOverlayRef.current) {
              nightOverlayRef.current.setPath(path);
            } else {
              nightOverlayRef.current = new window.google.maps.Polygon({
                paths: path,
                strokeWeight: 0,
                fillColor: "#000000",
                fillOpacity: 0.35,
                map: mapInstanceRef.current,
              });
            }
          } catch (e) {
            // eslint-disable-next-line no-console
            console.error("Error updating ellipse overlay:", e);
          }
        };

        // Draw immediately and set periodic updates
        drawEllipseOverlay();
        overlayTimerRef.current = window.setInterval(drawEllipseOverlay, 60 * 1000);
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
      if (nightOverlayRef.current) {
        nightOverlayRef.current.setMap(null);
        nightOverlayRef.current = null;
      }
      if (overlayTimerRef.current) {
        window.clearInterval(overlayTimerRef.current);
        overlayTimerRef.current = null;
      }
      if (multiMarkersRef.current.length) {
        multiMarkersRef.current.forEach(({ marker, root, listener }) => {
          if (listener) listener.remove();
          if (marker) marker.map = null;
          root?.unmount?.();
        });
        multiMarkersRef.current = [];
      }
      if (mapInstanceRef.current) {
        mapInstanceRef.current = null;
      }
      setIsMapReady(false);
    };
  }, [drone, onDroneClick]);

  // Manage multiple drone markers without re-initializing the map
  useEffect(() => {
    if (!isMapReady || !mapInstanceRef.current || !window.google?.maps?.marker?.AdvancedMarkerElement) return;

    // Remove previous multi markers
    if (multiMarkersRef.current.length) {
      multiMarkersRef.current.forEach(({ marker, root, listener }) => {
        if (listener) listener.remove();
        if (marker) marker.map = null;
        root?.unmount?.();
      });
      multiMarkersRef.current = [];
    }

    // Add markers for each drone in the list
    drones.forEach((d) => {
      // Skip the primary single-drone marker if it's duplicated
      if (drone && d.id === drone.id) return;

      const el = document.createElement("div");
      el.style.cssText = `width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; cursor: pointer; filter: drop-shadow(0 0 1px white);`;
      const root = createRoot(el);
      root.render(
        <Drone
          size={22}
          strokeWidth={2}
          useCurrentColor
          className="text-blue-700"
        />
      );

      const marker = new window.google.maps.marker.AdvancedMarkerElement({
        position: { lat: d.lat, lng: d.lng },
        map: mapInstanceRef.current,
        content: el,
        title: d.name,
      });
      let listener = null;
      if (onDroneClick) {
        listener = marker.addListener("click", () => onDroneClick(d));
      }
      multiMarkersRef.current.push({ marker, root, listener });
    });
  }, [drones, drone, onDroneClick, isMapReady]);

  return (
    <div className="w-full h-screen relative" style={{ height: '100vh' }}>
      <div ref={mapRef} className="w-full h-full" style={{ outline: 'none', border: 'none' }} />
      {!import.meta.env.VITE_GOOGLE_MAPS_API_KEY && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
          <div className="text-center p-8">
            <h3 className="text-xl font-semibold text-slate-200 mb-2">Map Unavailable</h3>
            <p className="text-slate-400">Google Maps API key not configured</p>
            <p className="text-sm text-slate-500 mt-2">Please add VITE_GOOGLE_MAPS_API_KEY to your .env file</p>
          </div>
        </div>
      )}
    </div>
  );
}
