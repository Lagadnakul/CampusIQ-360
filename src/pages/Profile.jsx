import {
  UserRound,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  CalendarDays,
  ShieldCheck,
  Edit3,
  BookOpen,
} from "lucide-react";

import "../styles/pages/Profile.css";

function Profile() {
  return (
    <div className="profile-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="profile-header">

        <div>
          <div className="profile-eyebrow">
            <UserRound size={15} />
            STUDENT PROFILE
          </div>

          <h1>My Profile</h1>

          <p>
            Manage your academic identity and personal information.
          </p>
        </div>

        <button className="profile-edit-button">
          <Edit3 size={16} />
          Edit Profile
        </button>

      </div>


      {/* =========================
          PROFILE HERO
      ========================= */}

      <div className="profile-hero">

        <div className="profile-avatar">
          NL
        </div>

        <div className="profile-identity">

          <div className="profile-name-row">
            <h2>Nakul Lagad</h2>

            <span className="verified-badge">
              <ShieldCheck size={14} />
              Verified Student
            </span>
          </div>

          <p>M.Tech AI & Data Science</p>

          <span className="profile-id">
            Student ID · PU26AIDS001
          </span>

        </div>

      </div>


      {/* =========================
          MAIN GRID
      ========================= */}

      <div className="profile-grid">


        {/* PERSONAL INFORMATION */}

        <div className="profile-card">

          <div className="profile-card-header">
            <div>
              <h2>Personal Information</h2>
              <p>Your basic contact information.</p>
            </div>

            <UserRound size={20} />
          </div>


          <div className="profile-info-grid">

            <div className="profile-info-item">
              <div className="profile-info-icon">
                <Mail size={17} />
              </div>

              <div>
                <span>Email Address</span>
                <strong>nakul@example.com</strong>
              </div>
            </div>


            <div className="profile-info-item">
              <div className="profile-info-icon">
                <Phone size={17} />
              </div>

              <div>
                <span>Phone Number</span>
                <strong>+91 XXXXX XXXXX</strong>
              </div>
            </div>


            <div className="profile-info-item">
              <div className="profile-info-icon">
                <MapPin size={17} />
              </div>

              <div>
                <span>Location</span>
                <strong>Vadodara, Gujarat</strong>
              </div>
            </div>


            <div className="profile-info-item">
              <div className="profile-info-icon">
                <CalendarDays size={17} />
              </div>

              <div>
                <span>Date of Birth</span>
                <strong>10 July 2003</strong>
              </div>
            </div>

          </div>

        </div>


        {/* ACADEMIC INFORMATION */}

        <div className="profile-card">

          <div className="profile-card-header">
            <div>
              <h2>Academic Information</h2>
              <p>Your current academic details.</p>
            </div>

            <GraduationCap size={20} />
          </div>


          <div className="academic-info-list">

            <div>
              <span>Program</span>
              <strong>M.Tech AI & Data Science</strong>
            </div>

            <div>
              <span>University</span>
              <strong>Parul University</strong>
            </div>

            <div>
              <span>Current Semester</span>
              <strong>Semester 1</strong>
            </div>

            <div>
              <span>Academic Year</span>
              <strong>2026 – 2027</strong>
            </div>

          </div>

        </div>


      </div>


      {/* =========================
          ACADEMIC SNAPSHOT
      ========================= */}

      <div className="profile-section">

        <div className="profile-section-heading">
          <div>
            <h2>Academic Snapshot</h2>
            <p>A quick overview of your current performance.</p>
          </div>
        </div>


        <div className="profile-stats">

          <div className="profile-stat-card">

            <div className="profile-stat-icon green">
              <GraduationCap size={19} />
            </div>

            <div>
              <span>Attendance</span>
              <strong>84.0%</strong>
              <small>Above 75% requirement</small>
            </div>

          </div>


          <div className="profile-stat-card">

            <div className="profile-stat-icon purple">
              <BookOpen size={19} />
            </div>

            <div>
              <span>Assignments</span>
              <strong>4</strong>
              <small>Current academic work</small>
            </div>

          </div>


          <div className="profile-stat-card">

            <div className="profile-stat-icon blue">
              <CalendarDays size={19} />
            </div>

            <div>
              <span>Semester</span>
              <strong>01</strong>
              <small>Current semester</small>
            </div>

          </div>

        </div>

      </div>


      {/* =========================
          CAMPUSIQ INSIGHT
      ========================= */}

      <div className="profile-insight">

        <div className="insight-icon">
          ✦
        </div>

        <div>

          <span>CAMPUSIQ INSIGHT</span>

          <h3>
            Your academic profile is up to date.
          </h3>

          <p>
            Keep your personal and academic information updated
            so CampusIQ can provide more accurate recommendations.
          </p>

        </div>

      </div>

    </div>
  );
}

export default Profile;