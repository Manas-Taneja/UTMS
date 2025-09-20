import React, { useState } from "react";
import Navbar from "./components/Navbar";
import MapView from "./components/MapView";
import DroneDetails from "./components/DroneDetails";
import LoginModal from "./components/LoginModal";
import { useDroneSelection } from "./components/useDroneSelection";

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
    <div className="flex flex-col min-h-screen">
      <Navbar onLogin={() => setShowLogin(true)} />
      <main className="flex-1 pt-16">
        <MapView drone={drone} onDroneClick={handleDroneClick} />
      </main>
      {selectedDrone && <DroneDetails selectedDrone={selectedDrone} onClose={closeDroneDetails} />}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </div>
  );
}
