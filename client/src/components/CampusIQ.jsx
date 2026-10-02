import {
  Sparkles,
  MapPin,
  CalendarDays,
  Clock,
  Send,
} from "lucide-react";

import "../styles/components/CampusIQ.css";

function CampusIQ() {
  return (
    <div className="campus-iq-card">

      {/* Header */}
      <div className="campus-iq-header">

        <div className="campus-iq-icon">
          <Sparkles size={22} />
        </div>

        <div>
          <h2>CampusIQ</h2>
          <p>Your intelligent campus assistant</p>
        </div>

      </div>


      {/* Greeting */}
      <div className="campus-iq-greeting">

        <div className="greeting-icon">
          <Sparkles size={16} />
        </div>

        <p>
          Hi Nakul 👋 Ask me anything about your campus.
        </p>

      </div>


      {/* Quick Actions */}
      <div className="campus-iq-actions">

        <button>
          <MapPin size={15} />
          Find a quiet place
        </button>

        <button>
          <CalendarDays size={15} />
          Today's events
        </button>

        <button>
          <Clock size={15} />
          Next class
        </button>

      </div>


      {/* Input */}
      <div className="campus-iq-input">

        <input
          type="text"
          placeholder="Ask CampusIQ..."
        />

        <button>
          <Send size={17} />
        </button>

      </div>

    </div>
  );
}

export default CampusIQ;