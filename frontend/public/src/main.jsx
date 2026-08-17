import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import CampusProvider from "./context/CampusProvider";
import MonitoringProvider from "./context/MonitoringProvider";

import "./index.css";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>

    <CampusProvider>

      <MonitoringProvider>

        <App />

      </MonitoringProvider>

    </CampusProvider>

  </React.StrictMode>
);