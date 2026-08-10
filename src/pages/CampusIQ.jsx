import { Send, Sparkles } from "lucide-react";
import "../styles/components/CampusIQ.css";

function CampusIQ() {
  return (
    <div className="campus-iq">

      {/* Header */}
      <div className="campus-iq-header">

        <div className="campus-iq-icon">
          <Sparkles size={20} />
        </div>

        <div>
          <h2>CampusIQ</h2>
          <p>Your intelligent campus assistant</p>
        </div>

      </div>


      {/* Assistant Message */}
      <div className="campus-iq-message">

        <p>
          Hi Nakul 👋 Ask me anything about your campus.
        </p>

      </div>


      {/* Quick Actions */}
      <div className="campus-iq-actions">

        <button>
          Find a quiet place
        </button>

        <button>
          Today's events
        </button>

        <button>
          Next class
        </button>

      </div>


      {/* Chat Input */}
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