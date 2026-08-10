import {
  BookOpen,
  Coffee,
  Monitor,
  Car,
  Activity,
} from "lucide-react";

import "../styles/components/CampusPulse.css";

const zones = [
  {
    name: "Central Library",
    activity: "Low activity",
    status: "Free",
    icon: BookOpen,
    statusClass: "free",
  },
  {
    name: "Main Cafeteria",
    activity: "High activity",
    status: "Crowded",
    icon: Coffee,
    statusClass: "crowded",
  },
  {
    name: "Computer Lab",
    activity: "Medium activity",
    status: "Moderate",
    icon: Monitor,
    statusClass: "moderate",
  },
  {
    name: "Campus Parking",
    activity: "Very high activity",
    status: "Full",
    icon: Car,
    statusClass: "full",
  },
];

function CampusPulse() {
  return (
    <section className="campus-pulse">

      <div className="pulse-header">

        <div>
          <h2>Campus Pulse</h2>

          <p>
            Current activity across campus
          </p>
        </div>

        <div className="pulse-live">
          <span></span>
          LIVE
        </div>

      </div>


      <div className="pulse-zones">

        {zones.map((zone) => {

          const Icon = zone.icon;

          return (
            <div className="pulse-zone" key={zone.name}>

              <div className="zone-icon">
                <Icon size={20} />
              </div>

              <div className="zone-info">

                <strong>
                  {zone.name}
                </strong>

                <span>
                  {zone.activity}
                </span>

              </div>

              <div
                className={`zone-status ${zone.statusClass}`}
              >
                {zone.status}
              </div>

            </div>
          );

        })}

      </div>


      <div className="pulse-footer">

        <Activity size={16} />

        <span>
          Campus activity is updated continuously
        </span>

      </div>

    </section>
  );
}

export default CampusPulse;