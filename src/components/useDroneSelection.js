import { useState, useCallback } from "react";

export const useDroneSelection = () => {
  const [selectedDrone, setSelectedDrone] = useState(null);

  // Stable handler for clicking the drone marker
  const handleDroneClick = useCallback((droneObj) => {
    setSelectedDrone((prevSelected) => {
      // If the same drone is clicked, toggle it off (close)
      if (prevSelected && prevSelected.id === droneObj.id) {
        return null;
      }
      // Otherwise, switch to the new drone
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