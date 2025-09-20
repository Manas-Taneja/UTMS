import { useState } from "react";

export const useDroneSelection = () => {
  const [selectedDrone, setSelectedDrone] = useState(null);

  // Handler for clicking the drone marker
  const handleDroneClick = (droneObj) => {
    if (selectedDrone && selectedDrone.name === droneObj.name) {
      setSelectedDrone(null); // Hide details if same drone clicked again
    } else {
      setSelectedDrone(droneObj);
    }
  };

  const closeDroneDetails = () => {
    setSelectedDrone(null);
  };

  return {
    selectedDrone,
    setSelectedDrone,
    handleDroneClick,
    closeDroneDetails,
  };
};