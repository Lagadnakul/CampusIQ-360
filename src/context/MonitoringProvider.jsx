import { useState } from "react";

import MonitoringContext from "./MonitoringContext";

function MonitoringProvider({ children }) {
  const [monitoringData, setMonitoringData] = useState({
    cameraActive: false,
    peopleCount: 0,
    confidence: 0,
    fps: 0,
    framesAnalyzed: 0,
  });

  return (
    <MonitoringContext.Provider
      value={{
        monitoringData,
        setMonitoringData,
      }}
    >
      {children}
    </MonitoringContext.Provider>
  );
}

export default MonitoringProvider;