import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import DashboardLayout from "../layouts/DashboardLayout";

// =========================================
// CAMPUS
// =========================================
import CampusVision from "../pages/CampusVision";
import CampusPulse from "../pages/CampusPulse";
import CampusIQ from "../pages/CampusIQ";
import CameraMonitoring from "../pages/CameraMonitoring";
import CampusRules from "../pages/CampusRules";

// =========================================
// ACADEMICS
// =========================================
import Attendance from "../pages/Attendance";
import Timetable from "../pages/Timetable";
import Academics from "../pages/Academics";

// =========================================
// CAMPUS SERVICES
// =========================================
import Library from "../pages/Library";
import Events from "../pages/Events";
import Placements from "../pages/Placements";

// =========================================
// USER
// =========================================
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";


function AppRoutes() {
  return (
    <BrowserRouter>

      <DashboardLayout>

        <Routes>

          {/* =========================================
              DASHBOARD
          ========================================= */}

          <Route
            path="/"
            element={<Dashboard />}
          />

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />


          {/* =========================================
              CAMPUS
          ========================================= */}

          <Route
            path="/campus-vision"
            element={<CampusVision />}
          />

          <Route
            path="/campus-pulse"
            element={<CampusPulse />}
          />

          <Route
            path="/campus-iq"
            element={<CampusIQ />}
          />

          <Route
            path="/camera-monitoring"
            element={<CameraMonitoring />}
          />

          <Route
            path="/campus-rules"
            element={<CampusRules />}
          />

          {/* Optional old URL support */}
          <Route
            path="/campusrules"
            element={<CampusRules />}
          />


          {/* =========================================
              ACADEMICS
          ========================================= */}

          <Route
            path="/attendance"
            element={<Attendance />}
          />

          <Route
            path="/timetable"
            element={<Timetable />}
          />

          <Route
            path="/academics"
            element={<Academics />}
          />


          {/* =========================================
              CAMPUS SERVICES
          ========================================= */}

          <Route
            path="/library"
            element={<Library />}
          />

          <Route
            path="/events"
            element={<Events />}
          />

          <Route
            path="/placements"
            element={<Placements />}
          />


          {/* =========================================
              USER
          ========================================= */}

          <Route
            path="/profile"
            element={<Profile />}
          />

          <Route
            path="/settings"
            element={<Settings />}
          />

        </Routes>

      </DashboardLayout>

    </BrowserRouter>
  );
}


export default AppRoutes;