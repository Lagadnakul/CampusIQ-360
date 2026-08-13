import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import DashboardLayout from "../layouts/DashboardLayout";
import CampusVision from "../pages/CampusVision";
import Attendance from "../pages/Attendance";
import Timetable from "../pages/Timetable";
import Library from "../pages/Library";
import Events from "../pages/Events";
import Placements from "../pages/Placements";
import Profile from "../pages/Profile";
import  Settings  from "../pages/Settings";
function AppRoutes() {
  return (
    <BrowserRouter>

      <DashboardLayout>

        <Routes>

          <Route
            path="/"
            element={<Dashboard />}
          />

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

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
          path= "/Library"
          element={<Library/>}
          />

          <Route
          path= "/Events"
          element={<Events/>}
          />
            <Route
          path= "/placements"
          element={<Placements/>}
          />

          <Route
          path = "/profile"
          element={<Profile/>}/>
        
        <Route
        path= "/settings"
        element={<Settings/>}/>
         </Routes>

      </DashboardLayout>

    </BrowserRouter>
  );
}

export default AppRoutes;