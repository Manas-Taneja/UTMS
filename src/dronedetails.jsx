import React from "react";

export default function DroneDetails({ selectedDrone }) {
  if (!selectedDrone) return null;
  return (
    <div className="p-6 w-80 bg-white h-full shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-red-500">Drone Details</h2>
      <ul className="space-y-2">
        <li>
          <span className="font-semibold">Name:</span> {selectedDrone.name}
        </li>
        <li>
          <span className="font-semibold">Latitude:</span> {selectedDrone.lat}
        </li>
        <li>
          <span className="font-semibold">Longitude:</span> {selectedDrone.lng}
        </li>
        <li>
          <span className="font-semibold">Altitude:</span>{" "}
          {selectedDrone.altitude} m
        </li>
        <li>
          <span className="font-semibold">Speed:</span> {selectedDrone.speed}{" "}
          m/s
        </li>
        <li>
          <span className="font-semibold">Heading:</span>{" "}
          {selectedDrone.heading}°
        </li>
        <li>
          <span className="font-semibold">Status:</span> {selectedDrone.status}
        </li>
      </ul>
    </div>
  );
}
