import {
  GraduationCap,
  TrendingUp,
  BookOpen,
  Award,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
} from "lucide-react";

import "../styles/pages/Academics.css";

function Academics() {
  const subjects = [
    {
      name: "Artificial Intelligence",
      code: "AI501",
      faculty: "Dr. Mohd Arif",
      grade: "A",
      score: 87,
      credits: 4,
      status: "Excellent",
    },
    {
      name: "Machine Learning",
      code: "ML502",
      faculty: "Prof. Rajesh Patel",
      grade: "A-",
      score: 82,
      credits: 4,
      status: "Good",
    },
    {
      name: "Advanced Data Structures",
      code: "ADS503",
      faculty: "Prof. Amit Shah",
      grade: "B+",
      score: 78,
      credits: 4,
      status: "Good",
    },
    {
      name: "Deep Learning",
      code: "DL504",
      faculty: "Dr. Priya Mehta",
      grade: "A",
      score: 91,
      credits: 4,
      status: "Excellent",
    },
    {
      name: "Business Analytics",
      code: "BA505",
      faculty: "Prof. Neha Shah",
      grade: "A-",
      score: 84,
      credits: 3,
      status: "Good",
    },
    {
      name: "High Performance Computing",
      code: "HPC506",
      faculty: "Dr. Kunal Desai",
      grade: "B+",
      score: 76,
      credits: 3,
      status: "Needs Focus",
    },
  ];

  const upcomingWork = [
    {
      title: "Deep Learning Assignment",
      subject: "Deep Learning",
      due: "Tomorrow",
      priority: "High",
    },
    {
      title: "HPC Lab Submission",
      subject: "High Performance Computing",
      due: "14 Aug",
      priority: "Medium",
    },
    {
      title: "Business Analytics Dashboard",
      subject: "Business Analytics",
      due: "16 Aug",
      priority: "Medium",
    },
  ];

  return (
    <div className="academics-page">

      {/* =========================================
          PAGE HEADER
      ========================================= */}

      <section className="academics-header">

        <div className="academics-header-content">

          <div className="section-label">
            <GraduationCap size={17} />
            <span>ACADEMIC INTELLIGENCE</span>
          </div>

          <h1>Academic Performance</h1>

          <p>
            Track your academic progress, subject performance,
            credits and upcoming academic work.
          </p>

        </div>

        <div className="semester-card">

          <div className="semester-icon">
            <BookOpen size={20} />
          </div>

          <div>
            <span>Current Semester</span>
            <strong>Semester 1</strong>
          </div>

        </div>

      </section>


      {/* =========================================
          SUMMARY CARDS
      ========================================= */}

      <section className="academic-summary">

        <div className="academic-stat-card">

          <div className="stat-icon purple">
            <Award size={21} />
          </div>

          <div className="stat-content">
            <span>Current CGPA</span>
            <strong>8.42</strong>
            <small>
              <TrendingUp size={13} />
              +0.34 this semester
            </small>
          </div>

        </div>


        <div className="academic-stat-card">

          <div className="stat-icon green">
            <CheckCircle2 size={21} />
          </div>

          <div className="stat-content">
            <span>Attendance</span>
            <strong>87.4%</strong>
            <small>Above required 75%</small>
          </div>

        </div>


        <div className="academic-stat-card">

          <div className="stat-icon blue">
            <BookOpen size={21} />
          </div>

          <div className="stat-content">
            <span>Credits Completed</span>
            <strong>18 / 24</strong>
            <small>75% semester progress</small>
          </div>

        </div>


        <div className="academic-stat-card">

          <div className="stat-icon orange">
            <Clock size={21} />
          </div>

          <div className="stat-content">
            <span>Active Subjects</span>
            <strong>06</strong>
            <small>Currently enrolled</small>
          </div>

        </div>

      </section>


      {/* =========================================
          OVERALL PERFORMANCE
      ========================================= */}

      <section className="academic-performance-card">

        <div className="performance-heading">

          <div>
            <span className="section-label">
              <TrendingUp size={16} />
              PERFORMANCE OVERVIEW
            </span>

            <h2>You're making strong academic progress.</h2>

            <p>
              Your current academic performance is above the
              semester average.
            </p>
          </div>

          <div className="performance-score">
            <span>CGPA</span>
            <strong>8.42</strong>
            <small>Excellent</small>
          </div>

        </div>


        <div className="performance-progress">

          <div className="progress-header">
            <span>Semester Progress</span>
            <strong>75%</strong>
          </div>

          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: "75%" }}
            ></div>
          </div>

          <div className="progress-footer">
            <span>18 credits completed</span>
            <span>24 total credits</span>
          </div>

        </div>

      </section>


      {/* =========================================
          SUBJECT PERFORMANCE
      ========================================= */}

      <section className="subjects-section">

        <div className="section-heading">

          <div>
            <span className="section-label">
              <BookOpen size={16} />
              SUBJECT PERFORMANCE
            </span>

            <h2>Current Subjects</h2>

            <p>
              Your latest academic performance across enrolled subjects.
            </p>
          </div>

          <button className="view-all-button">
            View Details
            <ArrowUpRight size={16} />
          </button>

        </div>


        <div className="subjects-grid">

          {subjects.map((subject) => (
            <div
              className="subject-card"
              key={subject.code}
            >

              <div className="subject-top">

                <div className="subject-icon">
                  <BookOpen size={19} />
                </div>

                <span
                  className={`grade-badge grade-${subject.grade
                    .replace("+", "plus")
                    .replace("-", "minus")
                    .toLowerCase()}`}
                >
                  {subject.grade}
                </span>

              </div>


              <div className="subject-info">

                <span className="subject-code">
                  {subject.code}
                </span>

                <h3>{subject.name}</h3>

                <p>{subject.faculty}</p>

              </div>


              <div className="subject-score">

                <div className="score-header">
                  <span>Performance</span>
                  <strong>{subject.score}%</strong>
                </div>

                <div className="score-track">
                  <div
                    className="score-fill"
                    style={{
                      width: `${subject.score}%`,
                    }}
                  ></div>
                </div>

              </div>


              <div className="subject-footer">

                <span>
                  {subject.credits} Credits
                </span>

                <span
                  className={
                    subject.status === "Needs Focus"
                      ? "status-warning"
                      : "status-good"
                  }
                >
                  {subject.status === "Needs Focus" ? (
                    <AlertCircle size={13} />
                  ) : (
                    <CheckCircle2 size={13} />
                  )}

                  {subject.status}
                </span>

              </div>

            </div>
          ))}

        </div>

      </section>


      {/* =========================================
          UPCOMING ACADEMIC WORK
      ========================================= */}

      <section className="academic-work-section">

        <div className="section-heading">

          <div>
            <span className="section-label">
              <Clock size={16} />
              UPCOMING WORK
            </span>

            <h2>Academic Deadlines</h2>

            <p>
              Stay ahead of assignments and academic submissions.
            </p>
          </div>

          <span className="work-count">
            {upcomingWork.length} Upcoming
          </span>

        </div>


        <div className="academic-work-list">

          {upcomingWork.map((work, index) => (
            <div
              className="academic-work-item"
              key={index}
            >

              <div className="work-icon">
                <BookOpen size={18} />
              </div>


              <div className="work-info">

                <h3>{work.title}</h3>

                <span>{work.subject}</span>

              </div>


              <div
                className={`priority-badge priority-${work.priority.toLowerCase()}`}
              >
                {work.priority}
              </div>


              <div className="work-due">

                <span>Due</span>

                <strong>{work.due}</strong>

              </div>


              <button className="work-arrow">
                <ArrowUpRight size={17} />
              </button>

            </div>
          ))}

        </div>

      </section>

    </div>
  );
}

export default Academics;