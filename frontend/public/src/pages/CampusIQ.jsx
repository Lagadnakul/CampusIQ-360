
import { Send, Sparkles } from "lucide-react";
import { useState } from "react";

import "../styles/components/CampusIQ.css";

function CampusIQ() {
  const [message, setMessage] = useState("");

  const quickActions = [
    "Find a quiet place",
    "Today's events",
    "Next class",
  ];

  const handleQuickAction = (action) => {
    setMessage(action);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
      return;
    }

    // Temporary behavior.
    // This will later connect to the CampusIQ AI/API.
    console.log("CampusIQ query:", trimmedMessage);

    setMessage("");
  };

  return (
    <div className="campus-iq">

      {/* =========================================
          HEADER
      ========================================= */}

      <div className="campus-iq-header">

        <div className="campus-iq-icon">
          <Sparkles size={20} />
        </div>

        <div className="campus-iq-header-text">
          <h2>CampusIQ</h2>

          <p>
            Your intelligent campus assistant
          </p>
        </div>

      </div>


      {/* =========================================
          ASSISTANT MESSAGE
      ========================================= */}

      <div className="campus-iq-message">

        <p>
          Hi Nakul 👋 Ask me anything about your campus.
        </p>

      </div>


      {/* =========================================
          QUICK ACTIONS
      ========================================= */}

      <div className="campus-iq-actions">

        {quickActions.map((action) => (
          <button
            key={action}
            type="button"
            onClick={() => handleQuickAction(action)}
          >
            {action}
          </button>
        ))}

      </div>


      {/* =========================================
          CHAT INPUT
      ========================================= */}

      <form
        className="campus-iq-input"
        onSubmit={handleSubmit}
      >

        <input
          type="text"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Ask CampusIQ..."
          aria-label="Ask CampusIQ"
        />

        <button
          type="submit"
          aria-label="Send message"
          disabled={!message.trim()}
        >
          <Send size={17} />
        </button>

      </form>

    </div>
  );
}

export default CampusIQ;
