import React from "react";

export default function DroneDetails({ drone }) {
  return (
    <div className="p-6 w-80 bg-white h-full shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-red-500">Drone Details</h2>
      <ul className="space-y-2">
        <li>
          <span className="font-semibold">Name:</span> {drone.name}
        </li>
        <li>
          <span className="font-semibold">Latitude:</span> {drone.lat}
        </li>
        <li>
          <span className="font-semibold">Longitude:</span> {drone.lng}
        </li>
        <li>
          <span className="font-semibold">Altitude:</span> {drone.altitude} m
        </li>
        <li>
          <span className="font-semibold">Speed:</span> {drone.speed} m/s
        </li>
        <li>
          <span className="font-semibold">Heading:</span> {drone.heading}°
        </li>
        <li>
          <span className="font-semibold">Status:</span> {drone.status}
        </li>
      </ul>
    </div>
  );
}
