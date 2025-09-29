import { useState, useCallback } from "react";

export const useDroneSelection = () => {
  const [selectedDrone, setSelectedDrone] = useState(null);

  // Stable handler for clicking the drone marker
  const handleDroneClick = useCallback((droneObj) => {
    setSelectedDrone((prevSelected) => {
      if (prevSelected && prevSelected.name === droneObj.name) {
        return null; // Hide details if same drone clicked again
      }
      return droneObj;
    });
  }, []);

  const closeDroneDetails = useCallback(() => {
    setSelectedDrone(null);
  }, []);

  return {
    selectedDrone,
    setSelectedDrone,
    handleDroneClick,
    closeDroneDetails,
  };
};