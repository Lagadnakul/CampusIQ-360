import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import DashboardLayout from "../layouts/DashboardLayout";

import CampusVision from "../pages/CampusVision";
import CampusPulse from "../pages/CampusPulse";
import CameraMonitoring from "../pages/CameraMonitoring";

import Attendance from "../pages/Attendance";
import Timetable from "../pages/Timetable";
import Library from "../pages/Library";
import Events from "../pages/Events";
import Placements from "../pages/Placements";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import Academics from "../pages/Academics";

function AppRoutes() {
  return (
    <BrowserRouter>

      <DashboardLayout>

        <Routes>

          {/* =========================
              DASHBOARD
          ========================= */}

          <Route
            path="/"
            element={<Dashboard />}
          />

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />


          {/* =========================
              CAMPUS
          ========================= */}

          <Route
            path="/campus-vision"
            element={<CampusVision />}
          />

          <Route
            path="/attendance"
            element={<Attendance />}
          />

          <Route
            path="/timetable"
            element={<Timetable />}
          />

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

          <Route
            path="/academics"
            element={<Academics />}
          />


          {/* =========================
              INTELLIGENCE
          ========================= */}

          <Route
            path="/campus-pulse"
            element={<CampusPulse />}
          />

          <Route
            path="/camera-monitoring"
            element={<CameraMonitoring />}
          />


          {/* =========================
              USER
          ========================= */}

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