import {
  Search,
  Bell,
} from "lucide-react";

import "../styles/components/Topbar.css";


function Topbar() {
  return (
    <header className="topbar">

      {/* =========================
          SEARCH
      ========================= */}

      <div className="search-box">

        <Search size={19} />

        <input
          type="text"
          placeholder="Search campus..."
        />

        <span className="search-shortcut">
          Ctrl K
        </span>

      </div>


      {/* =========================
          RIGHT SIDE
      ========================= */}

      <div className="topbar-right">

        {/* Notification */}

        <button className="notification-button">
          <Bell size={20} />

          <span className="notification-dot"></span>
        </button>


        {/* Campus Status */}

        <div className="campus-status">

          <span className="status-dot"></span>

          <span>
            Campus Live
          </span>

        </div>

      </div>

    </header>
  );
}


export default Topbar;