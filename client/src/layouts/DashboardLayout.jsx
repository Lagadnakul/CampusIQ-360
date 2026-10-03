import { useLocation } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import "../styles/layout/DashboardLayout.css";

function DashboardLayout({ children }) {
  const location = useLocation();
  const isLightPage = ["/events", "/placements"].includes(
    location.pathname
  );

  return (
    <div className="app-layout">

      <Sidebar />

      <div className="main-content">

        <Topbar />

        <main
          className={`page-content ${
            isLightPage ? "light-page-content" : ""
          }`}
        >
          {children}
        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;