import React, { useState } from "react";
import Navbar from "./components/Navbar";
import MapView from "./components/MapView";
import DroneDetails from "./components/DroneDetails";
import LoginModal from "./components/LoginModal";
import { useDroneSelection } from "./components/useDroneSelection";
import { sampleDrones } from "./data/sampleDrones";
import LeftDocks from "./components/LeftDocks";
import LoginPage from "./components/LoginPage";


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
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogin = (username) => {
    setLoggedInUser(username);
    setShowLogin(false); // Close modal on successful login
  };

  const handleLogout = () => {
    setLoggedInUser(null);
  };

  if (!loggedInUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="relative h-screen bg-slate-900">
      <Navbar onLogin={() => setShowLogin(true)} onLogout={handleLogout} loggedInUser={loggedInUser} />
      <LeftDocks selectedDrone={selectedDrone} />
      <MapView drone={drone} drones={sampleDrones} onDroneClick={handleDroneClick} />
      {selectedDrone && <DroneDetails selectedDrone={selectedDrone} onClose={closeDroneDetails} />}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </div>
  );
}
