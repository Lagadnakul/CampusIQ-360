import { useState } from "react";
import {
  Bell,
  ChevronDown,
  LogOut,
  Settings,
  UserRound,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import "../styles/components/Topbar.css";

function Topbar() {
  const [profileOpen, setProfileOpen] = useState(false);

  const navigate = useNavigate();

  const handleProfile = () => {
    setProfileOpen(false);
    navigate("/profile");
  };

  const handleSettings = () => {
    setProfileOpen(false);
    navigate("/settings");
  };

  const handleLogout = () => {
    setProfileOpen(false);

    // Later we can connect this to real authentication.
    console.log("Logout clicked");
  };

  return (
    <header className="topbar">

      {/* =========================
          SEARCH
      ========================= */}

      <div className="topbar-search">

        <span className="search-icon">
          ⌕
        </span>

        <input
          type="text"
          placeholder="Search campus..."
          aria-label="Search campus"
        />

        <span className="search-shortcut">
          Ctrl K
        </span>

      </div>


      {/* =========================
          RIGHT SIDE
      ========================= */}

      <div className="topbar-right">

        {/* NOTIFICATIONS */}

        <button
          type="button"
          className="notification-button"
          aria-label="Notifications"
        >
          <Bell size={20} />

          <span className="notification-dot"></span>
        </button>


        {/* CAMPUS STATUS */}

        <div className="campus-status">

          <span className="status-dot"></span>

          <span>
            Campus Live
          </span>

        </div>


        {/* =========================
            PROFILE
        ========================= */}

        <div className="topbar-profile">

          <button
            type="button"
            className="profile-trigger"
            onClick={() => setProfileOpen((previous) => !previous)}
            aria-expanded={profileOpen}
            aria-haspopup="menu"
          >

            <div className="profile-avatar">
              NL
            </div>


            <div className="profile-info">

              <strong>
                Nakul Lagad
              </strong>

              <span>
                Student
              </span>

            </div>


            <ChevronDown
              size={16}
              className={
                profileOpen
                  ? "profile-chevron rotate"
                  : "profile-chevron"
              }
            />

          </button>


          {/* =========================
              PROFILE DROPDOWN
          ========================= */}

          {profileOpen && (

            <div className="profile-dropdown">

              {/* USER INFORMATION */}

              <div className="dropdown-user">

                <div className="dropdown-avatar">
                  NL
                </div>

                <div className="dropdown-user-info">

                  <strong>
                    Nakul Lagad
                  </strong>

                  <span>
                    M.Tech AI & Data Science
                  </span>

                </div>

              </div>


              <div className="dropdown-divider"></div>


              {/* PROFILE */}

              <button
                type="button"
                className="dropdown-item"
                onClick={handleProfile}
              >

                <UserRound size={17} />

                <span>
                  My Profile
                </span>

              </button>


              {/* SETTINGS */}

              <button
                type="button"
                className="dropdown-item"
                onClick={handleSettings}
              >

                <Settings size={17} />

                <span>
                  Settings
                </span>

              </button>


              <div className="dropdown-divider"></div>


              {/* LOGOUT */}

              <button
                type="button"
                className="dropdown-item logout"
                onClick={handleLogout}
              >

                <LogOut size={17} />

                <span>
                  Logout
                </span>

              </button>

            </div>

          )}

        </div>

      </div>

    </header>
  );
}

export default Topbar;