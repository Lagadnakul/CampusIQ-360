import {
  LayoutDashboard,
  CalendarDays,
  GraduationCap,
  BookOpen,
  Library,
  BriefcaseBusiness,
  Users,
  Camera,
  Sparkles,
  ShieldCheck,
  ScanFace,
  Activity,
} from "lucide-react";

import { NavLink } from "react-router-dom";

import "../styles/components/Sidebar.css";

function Sidebar() {
  const campusItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Timetable",
      path: "/timetable",
      icon: CalendarDays,
    },
    {
      name: "Attendance",
      path: "/attendance",
      icon: GraduationCap,
    },
    {
      name: "Academics",
      path: "/academics",
      icon: BookOpen,
    },
    {
      name: "Library",
      path: "/library",
      icon: Library,
    },
    {
      name: "Placements",
      path: "/placements",
      icon: BriefcaseBusiness,
    },
    {
      name: "Events",
      path: "/events",
      icon: Users,
    },
    {
      name: "Campus Vision",
      path: "/campus-vision",
      icon: Camera,
    },
  ];

  const intelligenceItems = [
    {
      name: "CampusIQ",
      path: "/campus-iq",
      icon: Sparkles,
    },
    {
      name: "Campus Pulse",
      path: "/campus-pulse",
      icon: Activity,
    },
    {
      name: "Camera Monitoring",
      path: "/camera-monitoring",
      icon: ScanFace,
    },
    {
      name: "Campus Rules",
      path: "/campus-rules",
      icon: ShieldCheck,
    },
  ];

  const renderItems = (items) =>
    items.map((item) => {
      const Icon = item.icon;

      return (
        <NavLink
          key={item.name}
          to={item.path}
          className={({ isActive }) =>
            `sidebar-item ${isActive ? "active" : ""}`
          }
        >
          <Icon
            size={20}
            strokeWidth={1.8}
          />

          <span>{item.name}</span>
        </NavLink>
      );
    });

  return (
    <aside className="sidebar">

      {/* =================================
          BRAND
      ================================= */}

      <div className="sidebar-brand">

        <div className="brand-icon">
          <GraduationCap size={27} />
        </div>

        <div>
          <h2>CampusIQ</h2>
          <span>360</span>
        </div>

      </div>


      {/* =================================
          SCROLLABLE NAVIGATION
      ================================= */}

      <div className="sidebar-scroll">

        {/* CAMPUS */}

        <section className="sidebar-section">

          <p className="sidebar-label">
            CAMPUS
          </p>

          <nav>
            {renderItems(campusItems)}
          </nav>

        </section>


        {/* INTELLIGENCE */}

        <section className="sidebar-section">

          <p className="sidebar-label">
            INTELLIGENCE
          </p>

          <nav>
            {renderItems(intelligenceItems)}
          </nav>

        </section>

      </div>


      {/* =================================
          PROFILE
      ================================= */}

      <div className="sidebar-profile">

        <div className="profile-avatar">
          NL
        </div>

        <div className="profile-info">

          <strong>
            Nakul Lagad
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