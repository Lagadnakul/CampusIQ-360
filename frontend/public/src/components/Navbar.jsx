import {
  Bell,
  Search,
} from "lucide-react";

import "../styles/components/Topbar.css";

function Navbar() {
  return (
    <header className="topbar">

      {/* Search */}
      <div className="search-box">

        <Search size={18} />

        <input
          type="text"
          placeholder="Search campus..."
        />

        <span className="shortcut">
          Ctrl K
        </span>

      </div>


      {/* Right Side */}
      <div className="navbar-right">

        {/* Notification */}
        <div className="notification">

          <Bell size={20} />

          <span className="notification-dot"></span>

        </div>


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

export default Navbar;