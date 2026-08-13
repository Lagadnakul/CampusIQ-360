import {
  BarChart3,
  BookOpen,
  CalendarDays,
  Camera,
  GraduationCap,
  LayoutDashboard,
  Library,
  Settings,
  Sparkles,
  Users,
  BriefcaseBusiness,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import "../styles/components/Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">

      {/* =========================
          BRAND
      ========================= */}

      <div className="sidebar-brand">

        <div className="brand-icon">
          <GraduationCap size={22} />
        </div>

        <div>
          <h2>CampusIQ</h2>
          <span>360</span>
        </div>

      </div>


      {/* =========================
          MAIN NAVIGATION
      ========================= */}

      <div className="sidebar-section">

        <p className="sidebar-label">
          CAMPUS
        </p>

        <nav>

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `sidebar-item ${isActive ? "active" : ""}`
            }
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </NavLink>


          <NavLink
            to="/timetable"
            className={({ isActive }) =>
              `sidebar-item ${isActive ? "active" : ""}`
            }
          >
            <CalendarDays size={18} />
            <span>Timetable</span>
          </NavLink>
                  
               <NavLink
  to="/attendance"
  className={({ isActive }) =>
    `sidebar-item ${isActive ? "active" : ""}`
  }
>
  <GraduationCap size={18} />
  <span>Attendance</span>
</NavLink>

          <NavLink
            to="/academics"
            className={({ isActive }) =>
              `sidebar-item ${isActive ? "active" : ""}`
            }
          >
            <BookOpen size={18} />
            <span>Academics</span>
          </NavLink>


          <NavLink
            to="/library"
            className={({ isActive }) =>
              `sidebar-item ${isActive ? "active" : ""}`
            }
          >
            <Library size={18} />
            <span>Library</span>
          </NavLink>

                    <NavLink
  to="/placements"
  className={({ isActive }) =>
    `sidebar-item ${isActive ? "active" : ""}`
  }
>
  <BriefcaseBusiness size={18} />
  <span>Placements</span>
</NavLink> 
          <NavLink
            to="/events"
            className={({ isActive }) =>
              `sidebar-item ${isActive ? "active" : ""}`
            }
          >
            <Users size={18} />
            <span>Events</span>
          </NavLink>


          {/* Campus Vision */}

          <NavLink
            to="/campus-vision"
            className={({ isActive }) =>
              `sidebar-item ${isActive ? "active" : ""}`
            }
          >
            <Camera size={18} />
            <span>Campus Vision</span>
          </NavLink>

        </nav>

      </div>


      {/* =========================
          INTELLIGENCE
      ========================= */}

      <div className="sidebar-section">

        <p className="sidebar-label">
          INTELLIGENCE
        </p>

        <nav>

          <NavLink
            to="/campusiq"
            className={({ isActive }) =>
              `sidebar-item ${isActive ? "active" : ""}`
            }
          >
            <Sparkles size={18} />
            <span>CampusIQ</span>
          </NavLink>


          <NavLink
            to="/campus-pulse"
            className={({ isActive }) =>
              `sidebar-item ${isActive ? "active" : ""}`
            }
          >
            <BarChart3 size={18} />
            <span>Campus Pulse</span>
          </NavLink>

        </nav>

      </div>


      {/* =========================
          SYSTEM
      ========================= */}

      <div className="sidebar-section">

        <p className="sidebar-label">
          SYSTEM
        </p>

        <nav>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `sidebar-item ${isActive ? "active" : ""}`
            }
          >
            <Settings size={18} />
            <span>Settings</span>
          </NavLink>

        </nav>

      </div>


      {/* =========================
          STUDENT PROFILE
      ========================= */}

      <div className="sidebar-profile">

        <div className="profile-avatar">
          N
        </div>

        <div className="profile-info">

          <strong>
            Nakul
          </strong>

          <small>
            Student
          </small>

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;