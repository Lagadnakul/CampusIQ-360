import { useContext } from "react";

import MonitoringContext from "./MonitoringContext";

function useMonitoring() {
  const context = useContext(MonitoringContext);

  if (!context) {
    throw new Error(
      "useMonitoring must be used inside MonitoringProvider"
    );
  }

  return context;
}

export default useMonitoring;