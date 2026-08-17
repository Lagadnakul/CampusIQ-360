import {
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  AlertCircle,
} from "lucide-react";

import "../styles/pages/Assignment.css";

const assignments = [
  {
    title: "CNN Image Classification",
    subject: "Deep Learning",
    due: "12 Aug 2026",
    status: "Pending",
    priority: "High",
    icon: BookOpen,
  },
  {
    title: "Amdahl's Law Analysis",
    subject: "High Performance Computing",
    due: "14 Aug 2026",
    status: "Pending",
    priority: "Medium",
    icon: FileText,
  },
  {
    title: "Regression Dashboard",
    subject: "Business Analytics",
    due: "16 Aug 2026",
    status: "Submitted",
    priority: "Medium",
    icon: CheckCircle2,
  },
  {
    title: "Research Paper Review",
    subject: "Dissertation",
    due: "18 Aug 2026",
    status: "Pending",
    priority: "Low",
    icon: FileText,
  },
];

function Assignment() {
  const pendingCount = assignments.filter(
    (item) => item.status === "Pending"
  ).length;

  const submittedCount = assignments.filter(
    (item) => item.status === "Submitted"
  ).length;

  return (
    <div className="assignment-page">

      {/* HEADER */}

      <div className="assignment-header">

        <div>
          <div className="assignment-eyebrow">
            <FileText size={15} />
            ACADEMIC WORK
          </div>

          <h1>Assignments</h1>

          <p>
            Track your assignments, deadlines and submission progress.
          </p>
        </div>

        <div className="assignment-date-card">
          <CalendarDays size={18} />

          <div>
            <span>Current Week</span>
            <strong>10 – 16 August 2026</strong>
          </div>
        </div>

      </div>


      {/* STATISTICS */}

      <div className="assignment-stats">

        <div className="assignment-stat-card">
          <div className="assignment-stat-icon purple">
            <FileText size={19} />
          </div>

          <div>
            <span>Total Assignments</span>
            <strong>{assignments.length}</strong>
            <small>For this academic period</small>
          </div>
        </div>


        <div className="assignment-stat-card">
          <div className="assignment-stat-icon orange">
            <Clock3 size={19} />
          </div>

          <div>
            <span>Pending</span>
            <strong>{pendingCount}</strong>
            <small>Need your attention</small>
          </div>
        </div>


        <div className="assignment-stat-card">
          <div className="assignment-stat-icon green">
            <CheckCircle2 size={19} />
          </div>

          <div>
            <span>Submitted</span>
            <strong>{submittedCount}</strong>
            <small>Successfully submitted</small>
          </div>
        </div>


        <div className="assignment-stat-card">
          <div className="assignment-stat-icon red">
            <AlertCircle size={19} />
          </div>

          <div>
            <span>High Priority</span>
            <strong>1</strong>
            <small>Deadline approaching</small>
          </div>
        </div>

      </div>


      {/* ASSIGNMENT LIST */}

      <div className="assignment-section">

        <div className="assignment-section-header">

          <div>
            <h2>My Assignments</h2>
            <p>Recent academic work and submission deadlines.</p>
          </div>

          <span className="assignment-count">
            {assignments.length} Items
          </span>

        </div>


        <div className="assignment-list">

          {assignments.map((assignment, index) => {

            const Icon = assignment.icon;

            return (
              <div
                className="assignment-card"
                key={index}
              >

                <div className="assignment-icon">
                  <Icon size={20} />
                </div>


                <div className="assignment-main">

                  <div className="assignment-title-row">

                    <div>
                      <span className="assignment-subject">
                        {assignment.subject}
                      </span>

                      <h3>
                        {assignment.title}
                      </h3>
                    </div>

                    <span
                      className={`priority-badge ${assignment.priority.toLowerCase()}`}
                    >
                      {assignment.priority}
                    </span>

                  </div>


                  <div className="assignment-details">

                    <div>
                      <CalendarDays size={14} />
                      Due {assignment.due}
                    </div>

                    <div>
                      <Clock3 size={14} />
                      {assignment.status}
                    </div>

                  </div>

                </div>


                <div
                  className={`assignment-status ${
                    assignment.status === "Submitted"
                      ? "submitted"
                      : "pending"
                  }`}
                >
                  {assignment.status === "Submitted" ? (
                    <CheckCircle2 size={15} />
                  ) : (
                    <Clock3 size={15} />
                  )}

                  {assignment.status}
                </div>

              </div>
            );
          })}

        </div>

      </div>


      {/* SMART INSIGHT */}

      <div className="assignment-insight">

        <div className="insight-icon">
          ✦
        </div>

        <div>

          <span>
            CAMPUSIQ INSIGHT
          </span>

          <h3>
            You have 2 assignments due this week.
          </h3>

          <p>
            Prioritize your CNN Image Classification assignment
            before the 12 August deadline.
          </p>

        </div>

      </div>

    </div>
  );
}

export default Assignment;