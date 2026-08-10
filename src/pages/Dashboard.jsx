import {
  BookOpen,
  CalendarDays,
  GraduationCap,
  Sparkles,
} from "lucide-react";

import StatCard from "../components/StatCard";
import CampusPulse from "../components/CampusPulse";
import CampusIQ from "../components/CampusIQ";

import "../styles/pages/Dashboard.css";


function Dashboard() {

  return (

    <div className="dashboard-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="dashboard-header">

        <div>

          <div className="eyebrow">
            <Sparkles size={15} />
            INTELLIGENT CAMPUS
          </div>

          <h1>
            Good morning, Nakul.
          </h1>

          <p>
            Here's what's happening across your campus today.
          </p>

        </div>


        {/* Date Card */}

        <div className="date-card">

          <CalendarDays size={18} />

          <div>

            <small>
              Today
            </small>

            <strong>
              10 August 2026
            </strong>

          </div>

        </div>

      </div>


      {/* =========================
          STATISTICS CARDS
      ========================= */}

      <div className="stats-grid">

        <StatCard
          title="Attendance"
          value="87.4%"
          description="Above required 75%"
          icon={GraduationCap}
        />

        <StatCard
          title="Next Class"
          value="10:30 AM"
          description="Artificial Intelligence"
          icon={CalendarDays}
        />

        <StatCard
          title="Assignments"
          value="04"
          description="2 due this week"
          icon={BookOpen}
        />

        <StatCard
          title="Campus Events"
          value="07"
          description="Events happening today"
          icon={CalendarDays}
        />

      </div>


      {/* =========================
          CAMPUS INTELLIGENCE
      ========================= */}

      <div className="intelligence-grid">

        <CampusPulse />

        <CampusIQ />

      </div>

    </div>

  );
}


export default Dashboard;