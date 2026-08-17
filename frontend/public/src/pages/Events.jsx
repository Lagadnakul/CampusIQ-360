import {
  CalendarDays,
  Clock3,
  MapPin,
  Users,
  Sparkles,
  CheckCircle2,
  Trophy,
  GraduationCap,
  Music2,
  Code2,
} from "lucide-react";

import "../styles/pages/Events.css";

const events = [
  {
    title: "AI & Machine Learning Workshop",
    category: "Academic",
    date: "12 Aug 2026",
    time: "10:00 AM – 1:00 PM",
    location: "Innovation Lab · Block A",
    attendees: 86,
    status: "Registered",
    icon: Code2,
    color: "purple",
  },
  {
    title: "Inter-College Cricket Championship",
    category: "Sports",
    date: "14 Aug 2026",
    time: "3:00 PM – 6:30 PM",
    location: "University Sports Ground",
    attendees: 240,
    status: "Open",
    icon: Trophy,
    color: "orange",
  },
  {
    title: "Industry Connect: Future of AI",
    category: "Career",
    date: "16 Aug 2026",
    time: "11:00 AM – 1:30 PM",
    location: "Main Auditorium",
    attendees: 156,
    status: "Registered",
    icon: GraduationCap,
    color: "blue",
  },
  {
    title: "Campus Cultural Night",
    category: "Cultural",
    date: "18 Aug 2026",
    time: "6:00 PM – 9:30 PM",
    location: "Central Amphitheatre",
    attendees: 420,
    status: "Open",
    icon: Music2,
    color: "pink",
  },
];

function Events() {
  const registeredEvents = events.filter(
    (event) => event.status === "Registered"
  ).length;

  const totalAttendees = events.reduce(
    (total, event) => total + event.attendees,
    0
  );

  return (
    <div className="events-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="events-header">

        <div>

          <div className="events-eyebrow">
            <Sparkles size={15} />
            CAMPUS EXPERIENCES
          </div>

          <h1>Campus Events</h1>

          <p>
            Discover workshops, competitions, cultural activities and
            experiences happening across your campus.
          </p>

        </div>


        <div className="events-date-card">

          <CalendarDays size={18} />

          <div>
            <span>This Week</span>
            <strong>10 – 16 August 2026</strong>
          </div>

        </div>

      </div>


      {/* =========================
          STATISTICS
      ========================= */}

      <div className="events-stats">

        <div className="event-stat-card">

          <div className="event-stat-icon purple">
            <CalendarDays size={19} />
          </div>

          <div>
            <span>Upcoming Events</span>
            <strong>{events.length}</strong>
            <small>Across campus</small>
          </div>

        </div>


        <div className="event-stat-card">

          <div className="event-stat-icon green">
            <CheckCircle2 size={19} />
          </div>

          <div>
            <span>My Registrations</span>
            <strong>{registeredEvents}</strong>
            <small>Events you're attending</small>
          </div>

        </div>


        <div className="event-stat-card">

          <div className="event-stat-icon blue">
            <Users size={19} />
          </div>

          <div>
            <span>Total Participants</span>
            <strong>{totalAttendees}</strong>
            <small>Across listed events</small>
          </div>

        </div>


        <div className="event-stat-card">

          <div className="event-stat-icon orange">
            <Sparkles size={19} />
          </div>

          <div>
            <span>Featured Today</span>
            <strong>01</strong>
            <small>Recommended for you</small>
          </div>

        </div>

      </div>


      {/* =========================
          FEATURED EVENT
      ========================= */}

      <div className="featured-event">

        <div className="featured-content">

          <span className="featured-label">
            ✦ CAMPUSIQ FEATURED
          </span>

          <h2>
            AI & Machine Learning Workshop
          </h2>

          <p>
            Explore practical AI concepts, machine learning workflows
            and real-world applications with industry mentors.
          </p>


          <div className="featured-details">

            <div>
              <CalendarDays size={15} />
              12 August 2026
            </div>

            <div>
              <Clock3 size={15} />
              10:00 AM – 1:00 PM
            </div>

            <div>
              <MapPin size={15} />
              Innovation Lab · Block A
            </div>

          </div>


          <button className="featured-button">
            <CheckCircle2 size={16} />
            Registered
          </button>

        </div>


        <div className="featured-visual">

          <div className="featured-glow"></div>

          <Code2 size={64} />

          <span>AI</span>

        </div>

      </div>


      {/* =========================
          EVENT LIST
      ========================= */}

      <div className="events-section">

        <div className="events-section-header">

          <div>

            <h2>Upcoming Events</h2>

            <p>
              Explore what's happening around your university.
            </p>

          </div>

          <span className="event-count">
            {events.length} Events
          </span>

        </div>


        <div className="events-list">

          {events.map((event, index) => {

            const Icon = event.icon;

            return (
              <div
                className={`event-card ${event.color}`}
                key={index}
              >

                {/* ICON */}

                <div className="event-icon">
                  <Icon size={21} />
                </div>


                {/* MAIN CONTENT */}

                <div className="event-main">

                  <div className="event-title-row">

                    <div>

                      <span className="event-category">
                        {event.category}
                      </span>

                      <h3>
                        {event.title}
                      </h3>

                    </div>

                    <span
                      className={`event-status ${
                        event.status === "Registered"
                          ? "registered"
                          : "open"
                      }`}
                    >
                      {event.status === "Registered" && (
                        <CheckCircle2 size={13} />
                      )}

                      {event.status}
                    </span>

                  </div>


                  <div className="event-details">

                    <div>
                      <CalendarDays size={14} />
                      {event.date}
                    </div>

                    <div>
                      <Clock3 size={14} />
                      {event.time}
                    </div>

                    <div>
                      <MapPin size={14} />
                      {event.location}
                    </div>

                  </div>

                </div>


                {/* ATTENDEES */}

                <div className="event-attendees">

                  <Users size={15} />

                  <strong>
                    {event.attendees}
                  </strong>

                  <span>
                    attending
                  </span>

                </div>

              </div>
            );
          })}

        </div>

      </div>


      {/* =========================
          CAMPUSIQ INSIGHT
      ========================= */}

      <div className="events-insight">

        <div className="events-insight-icon">
          ✦
        </div>

        <div>

          <span>
            CAMPUSIQ INSIGHT
          </span>

          <h3>
            The AI Workshop looks like a strong match for your interests.
          </h3>

          <p>
            You have already registered for the workshop. There are
            {` ${events[0].attendees}`} students currently registered,
            so arriving early may help you get a good seat.
          </p>

        </div>

      </div>

    </div>
  );
}

export default Events;