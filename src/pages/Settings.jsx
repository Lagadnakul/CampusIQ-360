import {
  Bell,
  Lock,
  Palette,
  User,
  ShieldCheck,
  Smartphone,
  Save,
} from "lucide-react";

import "../styles/pages/Settings.css";

function Settings() {
  return (
    <div className="settings-page">

      {/* HEADER */}
      <div className="settings-header">
        <div>
          <div className="settings-eyebrow">
            <ShieldCheck size={15} />
            CAMPUS CONTROL
          </div>

          <h1>Settings</h1>

          <p>
            Manage your CampusIQ preferences, notifications and account settings.
          </p>
        </div>
      </div>


      {/* PROFILE SETTINGS */}
      <section className="settings-section">

        <div className="settings-section-header">
          <div className="settings-section-icon purple">
            <User size={19} />
          </div>

          <div>
            <h2>Profile Preferences</h2>
            <p>Control how your personal information appears across CampusIQ.</p>
          </div>
        </div>

        <div className="settings-grid">

          <div className="settings-field">
            <label>Display Name</label>
            <input
              type="text"
              defaultValue="Nakul Lagad"
            />
          </div>

          <div className="settings-field">
            <label>University Email</label>
            <input
              type="email"
              defaultValue="student@university.edu"
            />
          </div>

          <div className="settings-field">
            <label>Program</label>
            <input
              type="text"
              defaultValue="M.Tech AI & Data Science"
            />
          </div>

          <div className="settings-field">
            <label>Student ID</label>
            <input
              type="text"
              defaultValue="PU-AI-2026-001"
            />
          </div>

        </div>

      </section>


      {/* NOTIFICATIONS */}
      <section className="settings-section">

        <div className="settings-section-header">
          <div className="settings-section-icon blue">
            <Bell size={19} />
          </div>

          <div>
            <h2>Notifications</h2>
            <p>Choose which campus updates you want to receive.</p>
          </div>
        </div>

        <div className="settings-options">

          <div className="settings-option">
            <div>
              <strong>Assignment Reminders</strong>
              <span>Get notified before assignment deadlines.</span>
            </div>

            <label className="toggle">
              <input type="checkbox" defaultChecked />
              <span></span>
            </label>
          </div>


          <div className="settings-option">
            <div>
              <strong>Attendance Alerts</strong>
              <span>Receive alerts when attendance approaches the minimum.</span>
            </div>

            <label className="toggle">
              <input type="checkbox" defaultChecked />
              <span></span>
            </label>
          </div>


          <div className="settings-option">
            <div>
              <strong>Placement Updates</strong>
              <span>Get notified about new placement drives.</span>
            </div>

            <label className="toggle">
              <input type="checkbox" defaultChecked />
              <span></span>
            </label>
          </div>


          <div className="settings-option">
            <div>
              <strong>Campus Events</strong>
              <span>Receive updates about upcoming campus events.</span>
            </div>

            <label className="toggle">
              <input type="checkbox" />
              <span></span>
            </label>
          </div>

        </div>

      </section>


      {/* SECURITY */}
      <section className="settings-section">

        <div className="settings-section-header">
          <div className="settings-section-icon orange">
            <Lock size={19} />
          </div>

          <div>
            <h2>Security</h2>
            <p>Manage your account security and login preferences.</p>
          </div>
        </div>

        <div className="security-card">

          <div className="security-icon">
            <Lock size={19} />
          </div>

          <div>
            <strong>Password</strong>
            <span>
              Your password was last updated recently.
            </span>
          </div>

          <button className="secondary-button">
            Change Password
          </button>

        </div>


        <div className="security-card">

          <div className="security-icon">
            <Smartphone size={19} />
          </div>

          <div>
            <strong>Two-Factor Authentication</strong>
            <span>
              Add an extra layer of protection to your account.
            </span>
          </div>

          <label className="toggle">
            <input type="checkbox" />
            <span></span>
          </label>

        </div>

      </section>


      {/* APPEARANCE */}
      <section className="settings-section">

        <div className="settings-section-header">
          <div className="settings-section-icon pink">
            <Palette size={19} />
          </div>

          <div>
            <h2>Appearance</h2>
            <p>Customize how CampusIQ looks on your device.</p>
          </div>
        </div>

        <div className="appearance-options">

          <button className="appearance-card active">
            <div className="appearance-preview dark-preview"></div>
            <strong>Dark</strong>
            <span>CampusIQ Dark</span>
          </button>


          <button className="appearance-card">
            <div className="appearance-preview light-preview"></div>
            <strong>Light</strong>
            <span>Clean light interface</span>
          </button>

        </div>

      </section>


      {/* SAVE */}
      <div className="settings-actions">

        <button className="save-settings-button">
          <Save size={17} />
          Save Changes
        </button>

      </div>

    </div>
  );
}

export default Settings;