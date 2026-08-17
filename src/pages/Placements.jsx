import {
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  IndianRupee,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

import "../styles/pages/Placements.css";

const placementDrives = [
  {
    company: "TechNova Solutions",
    role: "Software Development Engineer",
    package: "12 LPA",
    date: "13 Aug 2026",
    eligibility: "CGPA 7.0+",
    status: "Eligible",
    color: "purple",
  },
  {
    company: "FinEdge Technologies",
    role: "Full Stack Developer",
    package: "10 LPA",
    date: "16 Aug 2026",
    eligibility: "CGPA 6.5+",
    status: "Eligible",
    color: "blue",
  },
  {
    company: "DataSphere AI",
    role: "AI / ML Engineer",
    package: "14 LPA",
    date: "20 Aug 2026",
    eligibility: "CGPA 7.5+",
    status: "Eligible",
    color: "green",
  },
  {
    company: "CloudMatrix",
    role: "Cloud Engineer",
    package: "9 LPA",
    date: "24 Aug 2026",
    eligibility: "CGPA 7.0+",
    status: "Applied",
    color: "orange",
  },
];

const applications = [
  {
    company: "CloudMatrix",
    role: "Cloud Engineer",
    stage: "Assessment",
    progress: 65,
  },
  {
    company: "TechNova Solutions",
    role: "Software Development Engineer",
    stage: "Application Submitted",
    progress: 30,
  },
  {
    company: "FinEdge Technologies",
    role: "Full Stack Developer",
    stage: "Shortlisted",
    progress: 80,
  },
];

function Placements() {
  const eligibleDrives = placementDrives.filter(
    (drive) => drive.status === "Eligible"
  ).length;

  return (
    <div className="placements-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="placements-header">

        <div>

          <div className="placements-eyebrow">
            <Sparkles size={15} />
            CAREER INTELLIGENCE
          </div>

          <h1>Placements</h1>

          <p>
            Track placement opportunities, applications and your
            career readiness across campus.
          </p>

        </div>


        <div className="placement-readiness">

          <div className="readiness-ring">
            <strong>78%</strong>
          </div>

          <div>
            <span>PLACEMENT READINESS</span>
            <strong>Good Progress</strong>
            <small>Keep building your skills</small>
          </div>

        </div>

      </div>


      {/* =========================
          QUICK STATS
      ========================= */}

      <div className="placements-stats">

        <div className="placement-stat-card">

          <div className="placement-stat-icon purple">
            <Building2 size={19} />
          </div>

          <div>
            <span>Companies</span>
            <strong>24</strong>
            <small>Visiting this season</small>
          </div>

        </div>


        <div className="placement-stat-card">

          <div className="placement-stat-icon blue">
            <BriefcaseBusiness size={19} />
          </div>

          <div>
            <span>Open Drives</span>
            <strong>{placementDrives.length}</strong>
            <small>{eligibleDrives} currently eligible</small>
          </div>

        </div>


        <div className="placement-stat-card">

          <div className="placement-stat-icon green">
            <CheckCircle2 size={19} />
          </div>

          <div>
            <span>Applications</span>
            <strong>{applications.length}</strong>
            <small>Active applications</small>
          </div>

        </div>


        <div className="placement-stat-card">

          <div className="placement-stat-icon orange">
            <IndianRupee size={19} />
          </div>

          <div>
            <span>Average Package</span>
            <strong>8.6 LPA</strong>
            <small>Current placement season</small>
          </div>

        </div>

      </div>


      {/* =========================
          READINESS PANEL
      ========================= */}

      <div className="readiness-panel">

        <div className="readiness-content">

          <span className="readiness-label">
            <Target size={14} />
            CAMPUSIQ CAREER ANALYSIS
          </span>

          <h2>
            Your profile is on track for software development roles.
          </h2>

          <p>
            Your current academic progress and technical profile make
            you eligible for several upcoming placement drives.
          </p>


          <div className="readiness-metrics">

            <div>
              <span>Technical Skills</span>

              <div className="metric-bar">
                <div style={{ width: "82%" }}></div>
              </div>

              <strong>82%</strong>
            </div>


            <div>
              <span>DSA Preparation</span>

              <div className="metric-bar">
                <div style={{ width: "68%" }}></div>
              </div>

              <strong>68%</strong>
            </div>


            <div>
              <span>Interview Readiness</span>

              <div className="metric-bar">
                <div style={{ width: "72%" }}></div>
              </div>

              <strong>72%</strong>
            </div>

          </div>

        </div>


        <div className="readiness-visual">

          <div className="visual-circle">
            <TrendingUp size={34} />
          </div>

          <span>
            +12%
          </span>

          <small>
            readiness growth
          </small>

        </div>

      </div>


      {/* =========================
          PLACEMENT DRIVES
      ========================= */}

      <div className="placement-section">

        <div className="placement-section-header">

          <div>
            <h2>Upcoming Placement Drives</h2>

            <p>
              Companies currently accepting applications.
            </p>
          </div>

          <span>
            {placementDrives.length} Drives
          </span>

        </div>


        <div className="placement-drive-list">

          {placementDrives.map((drive, index) => (
            <div
              className={`placement-drive-card ${drive.color}`}
              key={index}
            >

              <div className="company-logo">
                <Building2 size={20} />
              </div>


              <div className="drive-main">

                <div className="drive-title-row">

                  <div>

                    <span>
                      {drive.company}
                    </span>

                    <h3>
                      {drive.role}
                    </h3>

                  </div>

                  <strong className="package">
                    {drive.package}
                  </strong>

                </div>


                <div className="drive-details">

                  <div>
                    <CalendarDays size={14} />
                    {drive.date}
                  </div>

                  <div>
                    <GraduationCap size={14} />
                    {drive.eligibility}
                  </div>

                </div>

              </div>


              <div
                className={`drive-status ${
                  drive.status === "Applied"
                    ? "applied"
                    : "eligible"
                }`}
              >
                {drive.status === "Applied" ? (
                  <CheckCircle2 size={14} />
                ) : (
                  <Target size={14} />
                )}

                {drive.status}
              </div>


              <button className="drive-arrow">
                <ChevronRight size={17} />
              </button>

            </div>
          ))}

        </div>

      </div>


      {/* =========================
          APPLICATION TRACKER
      ========================= */}

      <div className="applications-section">

        <div className="placement-section-header">

          <div>
            <h2>Application Tracker</h2>

            <p>
              Monitor your current placement applications.
            </p>
          </div>

          <span>
            {applications.length} Active
          </span>

        </div>


        <div className="applications-grid">

          {applications.map((application, index) => (
            <div
              className="application-card"
              key={index}
            >

              <div className="application-top">

                <div className="application-company-icon">
                  <BriefcaseBusiness size={17} />
                </div>

                <div>
                  <span>{application.company}</span>
                  <h3>{application.role}</h3>
                </div>

              </div>


              <div className="application-progress-info">

                <span>
                  Application Progress
                </span>

                <strong>
                  {application.progress}%
                </strong>

              </div>


              <div className="application-progress">

                <div
                  style={{
                    width: `${application.progress}%`,
                  }}
                ></div>

              </div>


              <div className="application-footer">

                <span>
                  {application.stage}
                </span>

                <ChevronRight size={15} />

              </div>

            </div>
          ))}

        </div>

      </div>


      {/* =========================
          CAMPUSIQ INSIGHT
      ========================= */}

      <div className="placements-insight">

        <div className="placements-insight-icon">
          ✦
        </div>

        <div>

          <span>
            CAMPUSIQ INSIGHT
          </span>

          <h3>
            Focus on DSA and interview preparation next.
          </h3>

          <p>
            Your technical skills are currently strong, but improving
            DSA and interview readiness could increase your eligibility
            for higher-package software engineering roles.
          </p>

        </div>

      </div>

    </div>
  );
}

export default Placements;