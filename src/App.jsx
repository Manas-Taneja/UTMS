import React, { useState } from "react";
import Navbar from "./components/Navbar";
import MapView from "./components/MapView";
import DroneDetails from "./components/DroneDetails";
import LoginModal from "./components/LoginModal";
import { useDroneSelection } from "./components/useDroneSelection";
import { sampleDrones } from "./data/sampleDrones";
import DockMostTracked from "./components/DockMostTracked";
import DockDisruptions from "./components/DockDisruptions";
import DockBookmarks from "./components/DockBookmarks";


const drone = {
  lat: 28.6139,
  lng: 77.209,
  heading: 90,
  name: "Drone",
  altitude: 120,
  speed: 15,
  status: "Hovering",
};


export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  const { selectedDrone, handleDroneClick, closeDroneDetails } = useDroneSelection();

  return (
    <div className="relative">
      <Navbar onLogin={() => setShowLogin(true)} />
      <div className={`fixed left-4 top-20 z-40 space-y-3 flex flex-col pointer-events-none transition-transform duration-300 ${selectedDrone ? '-translate-x-[360px]' : 'translate-x-0'}`}>
        <div className="pointer-events-auto"><DockMostTracked items={sampleDrones.slice(0, 5)} /></div>
        <div className="pointer-events-auto"><DockDisruptions items={[]} /></div>
        <div className="pointer-events-auto"><DockBookmarks /></div>
      </div>
      <MapView drone={drone} drones={sampleDrones} onDroneClick={handleDroneClick} />
      {selectedDrone && <DroneDetails selectedDrone={selectedDrone} onClose={closeDroneDetails} />}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </div>
  );
}
