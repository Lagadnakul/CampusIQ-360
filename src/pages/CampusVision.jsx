import {
  Activity,
  Camera,
  ShieldCheck,
  Users,
  MapPin,
  Clock3,
  Wifi,
} from "lucide-react";

import "../styles/pages/CampusVision.css";

function CampusVision() {
  return (
    <div className="campus-vision-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="vision-header">

        <div>

          <div className="vision-eyebrow">
            <Activity size={15} />
            CAMPUS VISION
          </div>

          <h1>
            Campus Occupancy
          </h1>

          <p>
            Real-time visibility into activity across campus zones.
          </p>

        </div>


        <div className="vision-live-status">

          <span className="live-dot"></span>

          <div>
            <strong>Campus Live</strong>
            <small>Monitoring active</small>
          </div>

        </div>

      </div>


      {/* =========================
          TOP STATS
      ========================= */}

      <div className="vision-stats">

        <div className="vision-stat-card">

          <div className="stat-icon blue">
            <Users size={18} />
          </div>

          <div>
            <span>Total People</span>
            <strong>320</strong>
            <small>Across monitored zones</small>
          </div>

        </div>


        <div className="vision-stat-card">

          <div className="stat-icon purple">
            <Activity size={18} />
          </div>

          <div>
            <span>Active Zones</span>
            <strong>4</strong>
            <small>Currently monitored</small>
          </div>

        </div>


        <div className="vision-stat-card">

          <div className="stat-icon green">
            <Wifi size={18} />
          </div>

          <div>
            <span>System Status</span>
            <strong>Online</strong>
            <small>Detection services active</small>
          </div>

        </div>


        <div className="vision-stat-card">

          <div className="stat-icon orange">
            <Clock3 size={18} />
          </div>

          <div>
            <span>Last Updated</span>
            <strong>Now</strong>
            <small>Live occupancy data</small>
          </div>

        </div>

      </div>


      {/* =========================
          MAIN GRID
      ========================= */}

      <div className="vision-main-grid">


        {/* CAMERA PANEL */}

        <div className="vision-camera-card">

          <div className="vision-card-header">

            <div>

              <div className="camera-title">

                <span className="camera-live-dot"></span>

                <h2>Central Library</h2>

              </div>

              <p>
                Live camera feed · Zone A
              </p>

            </div>


            <div className="camera-badge">
              <Camera size={14} />
              LIVE
            </div>

          </div>


          {/* Camera Area */}

          <div className="camera-screen">

            <div className="camera-grid"></div>

            <div className="camera-center">

              <Camera size={42} />

              <h3>
                Camera Preview
              </h3>

              <p>
                Person detection will appear here
              </p>

            </div>


            {/* Fake detection boxes for prototype */}

            <div className="detection-box box-one">
              <span>Person</span>
            </div>

            <div className="detection-box box-two">
              <span>Person</span>
            </div>

            <div className="detection-box box-three">
              <span>Person</span>
            </div>


            <div className="camera-overlay-top">
              <span>CAM-01</span>
              <span>1080p</span>
            </div>


            <div className="camera-overlay-bottom">
              <span>
                <span className="red-dot"></span>
                LIVE
              </span>

              <span>
                10 Aug 2026 · 20:48
              </span>
            </div>

          </div>


          {/* Camera footer */}

          <div className="camera-footer">

            <div>
              <MapPin size={14} />
              Central Library · Ground Floor
            </div>

            <div>
              <ShieldCheck size={14} />
              Anonymous detection
            </div>

          </div>

        </div>


        {/* =========================
            OCCUPANCY PANEL
        ========================= */}

        <div className="occupancy-card">

          <div className="vision-card-header">

            <div>

              <h2>Occupancy</h2>

              <p>
                Current zone statistics
              </p>

            </div>

            <Users size={20} />

          </div>


          {/* Main number */}

          <div className="occupancy-number">

            <span>
              PEOPLE DETECTED
            </span>

            <strong>
              73
            </strong>

            <small>
              people currently inside
            </small>

          </div>


          {/* Capacity */}

          <div className="occupancy-values">

            <div>

              <span>Capacity</span>

              <strong>200</strong>

            </div>


            <div>

              <span>Occupancy</span>

              <strong>36.5%</strong>

            </div>

          </div>


          {/* Progress */}

          <div className="occupancy-progress-container">

            <div className="occupancy-progress-bar">

              <div
                className="occupancy-progress-fill"
                style={{ width: "36.5%" }}
              ></div>

            </div>

            <div className="progress-labels">

              <span>0</span>
              <span>100</span>
              <span>200</span>

            </div>

          </div>


          {/* Status */}

          <div className="zone-status free">

            <div className="status-left">

              <span className="status-dot"></span>

              <div>

                <strong>FREE</strong>

                <small>
                  Comfortable space available
                </small>

              </div>

            </div>

            <span>
              36.5%
            </span>

          </div>


          {/* Privacy */}

          <div className="privacy-card">

            <ShieldCheck size={18} />

            <div>

              <strong>Privacy Protected</strong>

              <p>
                The system counts people without identifying
                or storing personal identities.
              </p>

            </div>

          </div>

        </div>

      </div>


      {/* =========================
          CAMPUS ZONES
      ========================= */}

      <div className="zones-section">

        <div className="section-heading">

          <div>

            <h2>
              Campus Zones
            </h2>

            <p>
              Live activity across monitored locations
            </p>

          </div>

          <span>
            4 zones monitored
          </span>

        </div>


        <div className="zones-grid">


          {/* Library */}

          <div className="zone-card">

            <div className="zone-top">

              <div className="zone-icon blue">
                <Camera size={17} />
              </div>

              <span className="zone-status-pill free-pill">
                FREE
              </span>

            </div>

            <h3>
              Central Library
            </h3>

            <p>
              73 / 200 people
            </p>

            <div className="mini-progress">
              <div style={{ width: "36.5%" }}></div>
            </div>

            <strong>
              36.5% occupancy
            </strong>

          </div>


          {/* Cafeteria */}

          <div className="zone-card">

            <div className="zone-top">

              <div className="zone-icon orange">
                <Users size={17} />
              </div>

              <span className="zone-status-pill crowded-pill">
                CROWDED
              </span>

            </div>

            <h3>
              Main Cafeteria
            </h3>

            <p>
              185 / 200 people
            </p>

            <div className="mini-progress">
              <div
                className="crowded-progress"
                style={{ width: "92.5%" }}
              ></div>
            </div>

            <strong>
              92.5% occupancy
            </strong>

          </div>


          {/* Computer Lab */}

          <div className="zone-card">

            <div className="zone-top">

              <div className="zone-icon purple">
                <Activity size={17} />
              </div>

              <span className="zone-status-pill moderate-pill">
                MODERATE
              </span>

            </div>

            <h3>
              Computer Lab
            </h3>

            <p>
              62 / 100 people
            </p>

            <div className="mini-progress">
              <div
                className="moderate-progress"
                style={{ width: "62%" }}
              ></div>
            </div>

            <strong>
              62% occupancy
            </strong>

          </div>


          {/* Parking */}

          <div className="zone-card">

            <div className="zone-top">

              <div className="zone-icon red">
                <MapPin size={17} />
              </div>

              <span className="zone-status-pill full-pill">
                FULL
              </span>

            </div>

            <h3>
              Campus Parking
            </h3>

            <p>
              190 / 200 spaces
            </p>

            <div className="mini-progress">
              <div
                className="full-progress"
                style={{ width: "95%" }}
              ></div>
            </div>

            <strong>
              95% occupancy
            </strong>

          </div>

        </div>

      </div>


      {/* =========================
          SMART RECOMMENDATION
      ========================= */}

      <div className="vision-recommendation">

        <div className="recommendation-icon">
          ✦
        </div>

        <div>

          <span>
            CAMPUSIQ INSIGHT
          </span>

          <h3>
            Central Library is currently a quieter option.
          </h3>

          <p>
            The library has approximately 36.5% occupancy,
            while the cafeteria is currently crowded.
          </p>

        </div>

      </div>

    </div>
  );
}

export default CampusVision;