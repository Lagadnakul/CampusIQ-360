import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  BarChart3,
  Building2,
  Camera,
  Clock3,
  MapPin,
  Users,
  Zap,
} from "lucide-react";

import { useEffect, useState } from "react";

import useMonitoring from "../context/useMonitoring";

import {
  getInitialZones,
  generatePulseUpdate,
} from "../services/campusPulseSimulator";

import "../styles/pages/CampusPulse.css";


function CampusPulse() {

  // =========================================
  // SHARED AI MONITORING DATA
  // =========================================

  const { monitoringData } = useMonitoring();

  const {
    cameraActive,
    peopleCount,
  } = monitoringData;


  // =========================================
  // LIVE CAMPUS ZONES
  // =========================================

  const [zones, setZones] = useState(
    getInitialZones()
  );


  // =========================================
  // ZONE ICONS
  // =========================================

  const zoneIcons = {
    "Central Library": Building2,
    "Main Cafeteria": Users,
    "Computer Lab": Activity,
    "Campus Parking": MapPin,
  };


  // =========================================
  // LIVE SIMULATION
  // =========================================

  useEffect(() => {

    const interval = setInterval(() => {

      setZones((currentZones) =>
        generatePulseUpdate(currentZones)
      );

    }, 3000);


    return () => {
      clearInterval(interval);
    };

  }, []);


  // =========================================
  // CONNECT CAMERA DATA TO LIBRARY
  // =========================================

  const displayZones = zones.map(
    (zone, index) => {

      if (
        index === 0 &&
        zone.name === "Central Library" &&
        cameraActive
      ) {

        return {
          ...zone,
          people: peopleCount,
        };

      }

      return zone;

    }
  );


  // =========================================
  // CAMPUS CALCULATIONS
  // =========================================

  const totalPeople = displayZones.reduce(
    (total, zone) =>
      total + zone.people,
    0
  );


  const totalCapacity = displayZones.reduce(
    (total, zone) =>
      total + zone.capacity,
    0
  );


  const campusOccupancy =
    totalCapacity > 0
      ? Math.round(
          (totalPeople / totalCapacity) * 100
        )
      : 0;


  const busiestZone = displayZones.reduce(
    (current, zone) =>
      zone.people > current.people
        ? zone
        : current,
    displayZones[0]
  );


  // =========================================
  // UI
  // =========================================

  return (

    <div className="campus-pulse-page">


      {/* =====================================
          HEADER
      ===================================== */}

      <section className="pulse-header">

        <div>

          <div className="pulse-eyebrow">

            <Zap size={16} />

            CAMPUS INTELLIGENCE

          </div>


          <h1>
            Campus Pulse
          </h1>


          <p>
            Real-time visibility into people flow,
            occupancy, activity and campus movement.
          </p>

        </div>


        <div className="pulse-live-status">

          <span className="pulse-live-dot"></span>

          <div>

            <strong>
              System Live
            </strong>

            <span>
              {cameraActive
                ? "AI monitoring campus activity"
                : "Monitoring campus activity"}
            </span>

          </div>

        </div>

      </section>



      {/* =====================================
          OVERVIEW
      ===================================== */}

      <section className="pulse-overview">


        {/* PEOPLE */}

        <div className="pulse-stat-card">

          <div className="pulse-stat-top">

            <span>
              PEOPLE ON CAMPUS
            </span>

            <div className="pulse-stat-icon purple">

              <Users size={20} />

            </div>

          </div>


          <strong className="pulse-stat-value">

            {totalPeople.toLocaleString()}

          </strong>


          <div className="pulse-stat-change positive">

            <ArrowUpRight size={15} />

            8.4%

            <span>
              vs last hour
            </span>

          </div>

        </div>



        {/* OCCUPANCY */}

        <div className="pulse-stat-card">

          <div className="pulse-stat-top">

            <span>
              CAMPUS OCCUPANCY
            </span>

            <div className="pulse-stat-icon blue">

              <Activity size={20} />

            </div>

          </div>


          <strong className="pulse-stat-value">

            {campusOccupancy}%

          </strong>


          <div className="pulse-stat-sub">

            Average across monitored zones

          </div>

        </div>



        {/* BUSIEST */}

        <div className="pulse-stat-card">

          <div className="pulse-stat-top">

            <span>
              BUSIEST ZONE
            </span>

            <div className="pulse-stat-icon orange">

              <BarChart3 size={20} />

            </div>

          </div>


          <strong className="pulse-stat-value small">

            {busiestZone?.name ?? "—"}

          </strong>


          <div className="pulse-stat-sub">

            {busiestZone
              ? `${busiestZone.people} people · ${Math.round(
                  (busiestZone.people /
                    busiestZone.capacity) *
                    100
                )}% capacity`
              : "No data"}

          </div>

        </div>



        {/* ALERTS */}

        <div className="pulse-stat-card">

          <div className="pulse-stat-top">

            <span>
              ACTIVE ALERTS
            </span>

            <div className="pulse-stat-icon red">

              <AlertTriangle size={20} />

            </div>

          </div>


          <strong className="pulse-stat-value">
            3
          </strong>


          <div className="pulse-stat-change warning">

            <span>
              Requires attention
            </span>

          </div>

        </div>

      </section>



      {/* =====================================
          MAIN GRID
      ===================================== */}

      <section className="pulse-main-grid">


        {/* CAMPUS ACTIVITY */}

        <div className="pulse-panel campus-activity-panel">

          <div className="panel-header">

            <div>

              <span className="panel-eyebrow">

                <Activity size={15} />

                LIVE MONITORING

              </span>


              <h2>
                Campus Activity
              </h2>


              <p>
                Current occupancy across monitored
                campus zones.
              </p>

            </div>


            <div className="monitoring-badge">

              <span></span>

              8 Zones Active

            </div>

          </div>



          {/* CAMPUS MAP */}

          <div className="campus-map">

            <div className="map-grid"></div>


            <div className="map-zone zone-library">

              <span className="map-zone-dot low"></span>

              <strong>
                Library
              </strong>

              <small>
                {displayZones[0]?.people ?? 0}
              </small>

            </div>


            <div className="map-zone zone-cafeteria">

              <span className="map-zone-dot high"></span>

              <strong>
                Cafeteria
              </strong>

              <small>
                {displayZones[1]?.people ?? 0}
              </small>

            </div>


            <div className="map-zone zone-lab">

              <span className="map-zone-dot medium"></span>

              <strong>
                Computer Lab
              </strong>

              <small>
                {displayZones[2]?.people ?? 0}
              </small>

            </div>


            <div className="map-zone zone-parking">

              <span className="map-zone-dot medium"></span>

              <strong>
                Parking
              </strong>

              <small>
                {displayZones[3]?.people ?? 0}
              </small>

            </div>


            <div className="map-center">

              <Activity size={22} />

              <span>
                Campus Core
              </span>

            </div>

          </div>

        </div>



        {/* SMART ALERTS */}

        <div className="pulse-panel alerts-panel">

          <div className="panel-header compact">

            <div>

              <span className="panel-eyebrow">

                <AlertTriangle size={15} />

                INTELLIGENCE

              </span>


              <h2>
                Smart Alerts
              </h2>

            </div>


            <span className="alert-count">
              3
            </span>

          </div>



          <div className="alert-list">


            <div className="alert-item critical">

              <div className="alert-icon">

                <AlertTriangle size={18} />

              </div>


              <div>

                <strong>
                  Cafeteria approaching capacity
                </strong>


                <p>
                  Occupancy has reached a high level.
                </p>


                <span>
                  Live monitoring
                </span>

              </div>

            </div>



            <div className="alert-item warning">

              <div className="alert-icon">

                <Users size={18} />

              </div>


              <div>

                <strong>
                  Computer Lab activity
                </strong>


                <p>
                  Student activity is increasing.
                </p>


                <span>
                  Live monitoring
                </span>

              </div>

            </div>



            <div className="alert-item info">

              <div className="alert-icon">

                <MapPin size={18} />

              </div>


              <div>

                <strong>
                  Parking occupancy
                </strong>


                <p>
                  Vehicle movement detected.
                </p>


                <span>
                  Live monitoring
                </span>

              </div>

            </div>

          </div>

        </div>

      </section>



      {/* =====================================
          ZONE INTELLIGENCE
      ===================================== */}

      <section className="pulse-panel zone-panel">


        <div className="panel-header">

          <div>

            <span className="panel-eyebrow">

              <Building2 size={15} />

              ZONE INTELLIGENCE

            </span>


            <h2>
              Campus Zones
            </h2>


            <p>
              Real-time occupancy of monitored
              campus locations.
            </p>

          </div>


          <button className="view-all-button">
            View analytics
          </button>

        </div>



        <div className="zone-grid">

          {displayZones.map((zone) => {

            const Icon =
              zoneIcons[zone.name] ||
              Building2;


            const occupancy =
              zone.capacity > 0
                ? Math.round(
                    (zone.people /
                      zone.capacity) *
                      100
                  )
                : 0;


            return (

              <div
                className="zone-card"
                key={zone.name}
              >


                <div className="zone-card-header">

                  <div
                    className={`zone-icon ${zone.statusType}`}
                  >

                    <Icon size={19} />

                  </div>


                  <span
                    className={`zone-status ${zone.statusType}`}
                  >

                    {zone.name === "Central Library" &&
                    cameraActive
                      ? occupancy >= 90
                        ? "FULL"
                        : occupancy >= 70
                        ? "CROWDED"
                        : occupancy >= 50
                        ? "MODERATE"
                        : "FREE"
                      : zone.status}

                  </span>

                </div>



                <div className="zone-info">

                  <h3>
                    {zone.name}
                  </h3>

                  <span>
                    {zone.location}
                  </span>

                </div>



                <div className="zone-occupancy">

                  <div className="zone-number">

                    <strong>
                      {zone.people}
                    </strong>

                    <span>
                      / {zone.capacity} people
                    </span>

                  </div>


                  <strong className="zone-percent">

                    {occupancy}%

                  </strong>

                </div>



                <div className="zone-progress">

                  <div
                    className={`zone-progress-fill ${zone.statusType}`}
                    style={{
                      width: `${Math.min(
                        occupancy,
                        100
                      )}%`,
                    }}
                  />

                </div>

              </div>

            );

          })}

        </div>

      </section>



      {/* =====================================
          ANALYTICS
      ===================================== */}

      <section className="pulse-analytics-grid">


        {/* TREND */}

        <div className="pulse-panel trend-panel">

          <div className="panel-header compact">

            <div>

              <span className="panel-eyebrow">

                <BarChart3 size={15} />

                ACTIVITY TREND

              </span>


              <h2>
                Campus Occupancy
              </h2>

            </div>


            <span className="trend-period">
              Live
            </span>

          </div>


          <div className="fake-chart">

            <div className="chart-y-labels">

              <span>400</span>
              <span>300</span>
              <span>200</span>
              <span>100</span>
              <span>0</span>

            </div>


            <div className="chart-area">

              <div className="chart-line"></div>

              <div className="chart-point p1"></div>
              <div className="chart-point p2"></div>
              <div className="chart-point p3"></div>
              <div className="chart-point p4"></div>
              <div className="chart-point p5"></div>
              <div className="chart-point p6"></div>

            </div>

          </div>


          <div className="chart-times">

            <span>9 AM</span>
            <span>11 AM</span>
            <span>1 PM</span>
            <span>3 PM</span>
            <span>5 PM</span>
            <span>7 PM</span>

          </div>

        </div>



        {/* PEAK */}

        <div className="pulse-panel peak-panel">

          <div className="panel-header compact">

            <div>

              <span className="panel-eyebrow">

                <Clock3 size={15} />

                PEAK INTELLIGENCE

              </span>


              <h2>
                Today's Peak
              </h2>

            </div>

          </div>


          <div className="peak-value">

            {Math.max(
              totalPeople,
              1642
            ).toLocaleString()}

          </div>


          <p>
            Maximum people detected across
            monitored zones.
          </p>


          <div className="peak-details">

            <div>

              <span>
                Peak time
              </span>

              <strong>
                1:15 PM
              </strong>

            </div>


            <div>

              <span>
                Compared to yesterday
              </span>


              <strong className="positive">

                <ArrowUpRight size={15} />

                12.4%

              </strong>

            </div>

          </div>


          <div className="prediction-box">

            <div className="prediction-icon">

              <Zap size={18} />

            </div>


            <div>

              <strong>
                AI Prediction
              </strong>


              <p>
                Campus activity is expected to
                peak around 1:30 PM today.
              </p>

            </div>

          </div>

        </div>

      </section>



      {/* =====================================
          CAMERA STATUS
      ===================================== */}

      <section className="pulse-camera-bar">


        <div className="camera-status-left">

          <div className="camera-icon">

            <Camera size={20} />

          </div>


          <div>

            <strong>
              AI Monitoring Network
            </strong>


            <span>
              Computer vision sensors are
              monitoring campus activity.
            </span>

          </div>

        </div>



        <div className="camera-status-right">

          <div>

            <span className="camera-live-dot"></span>

            <strong>
              {cameraActive
                ? `1 / 1 AI Camera Online`
                : "Camera Standby"}
            </strong>

          </div>


          <span className="last-update">

            {cameraActive
              ? "Updated just now"
              : "Waiting for camera"}

          </span>

        </div>

      </section>


    </div>

  );
}


export default CampusPulse;