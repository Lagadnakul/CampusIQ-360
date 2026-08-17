import {
  Activity,
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  TrendingUp,
  XCircle,
} from "lucide-react";
            import AttendanceCalculator from "../components/AttendanceCalculator";

import "../styles/pages/Attendance.css";

function Attendance() {
  // Current attendance data
  const attendedClasses = 42;
  const totalClasses = 50;
  const targetAttendance = 75;

  // Current attendance percentage
  const currentAttendance =
    (attendedClasses / totalClasses) * 100;

  // What happens if the student attends the next class?
  const afterAttend =
    ((attendedClasses + 1) / (totalClasses + 1)) * 100;

  // What happens if the student misses the next class?
  const afterMiss =
    (attendedClasses / (totalClasses + 1)) * 100;

  // Calculate maximum classes that can be missed
  let classesCanMiss = 0;

  while (
    ((attendedClasses) /
      (totalClasses + classesCanMiss + 1)) *
      100 >=
    targetAttendance
  ) {
    classesCanMiss++;
  }

  // Calculate classes required to reach 75%
  let classesNeeded = 0;

  while (
    ((attendedClasses + classesNeeded) /
      (totalClasses + classesNeeded)) *
      100 <
    targetAttendance
  ) {
    classesNeeded++;
  }

  // Attendance status
  let status = "SAFE";

  if (currentAttendance < targetAttendance) {
    status = "DANGER";
  } else if (currentAttendance < 80) {
    status = "WARNING";
  }

  return (
    <div className="attendance-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="attendance-header">

        <div>

          <div className="attendance-eyebrow">
            <GraduationCap size={15} />
            ATTENDANCE INTELLIGENCE
          </div>

          <h1>Attendance</h1>

          <p>
            Monitor your attendance and understand how
            your next class can affect your percentage.
          </p>

        </div>

        <div className={`attendance-status ${status.toLowerCase()}`}>

          {status === "SAFE" && (
            <CheckCircle2 size={18} />
          )}

          {status === "WARNING" && (
            <AlertTriangle size={18} />
          )}

          {status === "DANGER" && (
            <XCircle size={18} />
          )}

          <div>
            <span>Current Status</span>
            <strong>{status}</strong>
          </div>

        </div>

      </div>


      {/* =========================
          MAIN ATTENDANCE CARD
      ========================= */}

      <div className="attendance-main-card">

        <div className="attendance-main-left">

          <span className="attendance-label">
            CURRENT ATTENDANCE
          </span>

          <div className="attendance-percentage">
            {currentAttendance.toFixed(1)}%
          </div>

          <p>
            {attendedClasses} attended out of {totalClasses} classes
          </p>

        </div>


        <div className="attendance-progress-area">

          <div className="attendance-progress">

            <div
              className="attendance-progress-fill"
              style={{
                width: `${Math.min(currentAttendance, 100)}%`,
              }}
            ></div>

            <div
              className="attendance-target"
              style={{
                left: `${targetAttendance}%`,
              }}
            ></div>

          </div>

          <div className="attendance-progress-labels">
            <span>0%</span>
            <span>Required: {targetAttendance}%</span>
            <span>100%</span>
          </div>

        </div>

      </div>


      {/* =========================
          QUICK STATISTICS
      ========================= */}

      <div className="attendance-stats">

        <div className="attendance-stat-card">

          <div className="attendance-stat-icon green">
            <CheckCircle2 size={19} />
          </div>

          <div>
            <span>Classes Attended</span>
            <strong>{attendedClasses}</strong>
            <small>Successfully attended</small>
          </div>

        </div>


        <div className="attendance-stat-card">

          <div className="attendance-stat-icon blue">
            <BookOpen size={19} />
          </div>

          <div>
            <span>Total Classes</span>
            <strong>{totalClasses}</strong>
            <small>Classes conducted</small>
          </div>

        </div>


        <div className="attendance-stat-card">

          <div className="attendance-stat-icon purple">
            <TrendingUp size={19} />
          </div>

          <div>
            <span>Required</span>
            <strong>{targetAttendance}%</strong>
            <small>Minimum attendance</small>
          </div>

        </div>


        <div className="attendance-stat-card">

          <div className="attendance-stat-icon orange">
            <Activity size={19} />
          </div>

          <div>
            <span>Can Safely Miss</span>
            <strong>{classesCanMiss}</strong>
            <small>Upcoming classes</small>
          </div>

        </div>

      </div>

          <AttendanceCalculator />
      {/* =========================
          SMART CALCULATOR
      ========================= */}

      <div className="attendance-calculator">

        <div className="calculator-header">

          <div>

            <div className="calculator-eyebrow">
              <Activity size={14} />
              SMART ATTENDANCE CALCULATOR
            </div>

            <h2>
              What happens if you miss your next class?
            </h2>

            <p>
              CampusIQ calculates the effect automatically
              using your current attendance.
            </p>

          </div>

        </div>


        <div className="calculator-results">

          {/* MISS */}

          <div className="calculator-result miss">

            <div className="result-icon">
              <XCircle size={20} />
            </div>

            <span>
              IF YOU MISS NEXT CLASS
            </span>

            <strong>
              {afterMiss.toFixed(1)}%
            </strong>

            <small>
              Your attendance will decrease to this percentage.
            </small>

          </div>


          {/* ATTEND */}

          <div className="calculator-result attend">

            <div className="result-icon">
              <CheckCircle2 size={20} />
            </div>

            <span>
              IF YOU ATTEND NEXT CLASS
            </span>

            <strong>
              {afterAttend.toFixed(1)}%
            </strong>

            <small>
              Your attendance will increase to this percentage.
            </small>

          </div>


          {/* REQUIRED */}

          <div className="calculator-result required">

            <div className="result-icon">
              <TrendingUp size={20} />
            </div>

            <span>
              TO REACH {targetAttendance}%
            </span>

            <strong>
              {classesNeeded}
            </strong>

            <small>
              consecutive classes must be attended.
            </small>

          </div>

        </div>

      </div>


      {/* =========================
          SMART INSIGHT
      ========================= */}

      <div className="attendance-insight">

        <div className="insight-icon">
          ✦
        </div>

        <div>

          <span>
            CAMPUSIQ INSIGHT
          </span>

          <h3>
            You are currently above the minimum attendance requirement.
          </h3>

          <p>
            You can safely miss approximately {classesCanMiss} upcoming
            class{classesCanMiss !== 1 ? "es" : ""} while maintaining
            at least {targetAttendance}% attendance.
          </p>

        </div>

      </div>

    </div>
  );
}

export default Attendance;