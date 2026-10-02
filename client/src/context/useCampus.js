import { useContext } from "react";
import CampusContext from "./CampusContext";

function useCampus() {
  const context = useContext(CampusContext);

  if (!context) {
    throw new Error(
      "useCampus must be used inside CampusProvider"
    );
  }

  return context;
}

export default useCampus;