import { useState } from "react";
import CampusContext from "./CampusContext";

function CampusProvider({ children }) {
  const [campusData, setCampusData] = useState({
    cameraActive: false,
    peopleCount: 0,
    confidence: 0,
    fps: 0,
    framesAnalyzed: 0,
  });

  return (
    <CampusContext.Provider
      value={{
        campusData,
        setCampusData,
      }}
    >
      {children}
    </CampusContext.Provider>
  );
}

export default CampusProvider;