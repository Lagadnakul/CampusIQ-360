import {
  CalendarDays,
  Clock3,
  MapPin,
  UserRound,
  BookOpen,
} from "lucide-react";

import "../styles/pages/Timetable.css";

const timetable = [
  {
    time: "09:00 AM",
    endTime: "10:00 AM",
    subject: "Deep Learning",
    code: "AI-501",
    faculty: "Dr. Mohd Arif",
    room: "Block A · 204",
    type: "Lecture",
    color: "purple",
  },
  {
    time: "10:15 AM",
    endTime: "11:15 AM",
    subject: "Advanced Data Structures",
    code: "CS-502",
    faculty: "Prof. Rakesh Patel",
    room: "Block B · 301",
    type: "Lecture",
    color: "blue",
  },
  {
    time: "11:30 AM",
    endTime: "12:30 PM",
    subject: "Business Analytics",
    code: "BA-503",
    faculty: "Dr. Neha Shah",
    room: "Block A · 305",
    type: "Lecture",
    color: "green",
  },
  {
    time: "01:30 PM",
    endTime: "02:30 PM",
    subject: "High Performance Computing",
    code: "HPC-504",
    faculty: "Dr. Amit Mehta",
    room: "Computer Lab · 02",
    type: "Practical",
    color: "orange",
  },
  {
    time: "02:45 PM",
    endTime: "03:45 PM",
    subject: "Research & Dissertation",
    code: "RES-505",
    faculty: "Ramiraza Shethwala",
    room: "Research Block · 102",
    type: "Research",
    color: "pink",
  },
];

function Timetable() {
  return (
    <div className="timetable-page">

      {/* HEADER */}
      <div className="timetable-header">

        <div>
          <div className="timetable-eyebrow">
            <CalendarDays size={15} />
            ACADEMIC SCHEDULE
          </div>

          <h1>Timetable</h1>

          <p>
            Your classes, lectures and academic activities for today.
          </p>
        </div>

        <div className="today-card">
          <CalendarDays size={18} />

          <div>
            <span>Today</span>
            <strong>Monday, 10 August 2026</strong>
          </div>
        </div>

      </div>


      {/* WEEK NAVIGATION */}
      <div className="week-navigation">

        <button className="week-arrow">
          ←
        </button>

        <div className="week-days">

          <div className="day">
            <span>Sun</span>
            <strong>09</strong>
          </div>

          <div className="day active">
            <span>Mon</span>
            <strong>10</strong>
          </div>

          <div className="day">
            <span>Tue</span>
            <strong>11</strong>
          </div>

          <div className="day">
            <span>Wed</span>
            <strong>12</strong>
          </div>

          <div className="day">
            <span>Thu</span>
            <strong>13</strong>
          </div>

          <div className="day">
            <span>Fri</span>
            <strong>14</strong>
          </div>

          <div className="day">
            <span>Sat</span>
            <strong>15</strong>
          </div>

        </div>

        <button className="week-arrow">
          →
        </button>

      </div>


      {/* CURRENT CLASS */}
      <div className="current-class">

        <div className="current-indicator">
          <span></span>
          LIVE NOW
        </div>

        <div className="current-content">

          <div>
            <span className="current-label">
              NEXT ACADEMIC ACTIVITY
            </span>

            <h2>Deep Learning</h2>

            <p>
              Your next scheduled class starts at 09:00 AM.
            </p>
          </div>

          <div className="current-time">
            <Clock3 size={18} />
            <strong>09:00 AM</strong>
          </div>

        </div>

      </div>


      {/* SCHEDULE */}
      <div className="schedule-section">

        <div className="section-title">

          <div>
            <h2>Today's Schedule</h2>
            <p>Monday · 10 August 2026</p>
          </div>

          <span className="class-count">
            {timetable.length} Classes
          </span>

        </div>


        <div className="schedule-list">

          {timetable.map((item, index) => (
            <div
              className={`class-card ${item.color}`}
              key={index}
            >

              {/* TIME */}
              <div className="class-time">

                <strong>{item.time}</strong>

                <span>{item.endTime}</span>

              </div>


              {/* TIMELINE */}
              <div className="timeline-line">

                <span className="timeline-dot"></span>

              </div>


              {/* CONTENT */}
              <div className="class-content">

                <div className="class-top">

                  <div>

                    <span className="class-type">
                      {item.type}
                    </span>

                    <h3>{item.subject}</h3>

                    <span className="subject-code">
                      {item.code}
                    </span>

                  </div>

                  <div className="subject-icon">
                    <BookOpen size={19} />
                  </div>

                </div>


                <div className="class-details">

                  <div>
                    <UserRound size={14} />
                    {item.faculty}
                  </div>

                  <div>
                    <MapPin size={14} />
                    {item.room}
                  </div>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default Timetable;