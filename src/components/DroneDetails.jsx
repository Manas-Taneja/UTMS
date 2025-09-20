import React from "react";

export default function DroneDetails({ selectedDrone, onClose }) {
  if (!selectedDrone) return null;
  
  const handleBackdropClick = (e) => {
    // Only close if clicking on the backdrop, not the modal content
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-40 flex items-start justify-start z-50" 
      onClick={handleBackdropClick}
    >
      <div className="bg-white shadow-lg p-6 w-96 relative" style={{ height: 'calc(100vh - 64px)', marginTop: '64px' }}>
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
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
    </div>
  );
}
