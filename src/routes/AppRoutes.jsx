import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import DashboardLayout from "../layouts/DashboardLayout";
import CampusVision from "../pages/CampusVision";

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
          element={<CampusVision />} />
        </Routes>

      </DashboardLayout>

    </BrowserRouter>
  );
}

export default AppRoutes;