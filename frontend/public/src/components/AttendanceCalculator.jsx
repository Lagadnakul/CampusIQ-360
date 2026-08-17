import { useState } from "react";

import {
  Calculator,
  CheckCircle2,
  XCircle,
  Target,
  TrendingUp,
  RotateCcw,
} from "lucide-react";

import {
  calculateAttendance,
  calculateAfterAttend,
  calculateAfterMiss,
  calculateClassesCanMiss,
  calculateClassesNeeded,
} from "../utils/attendanceCalculator";

import "../styles/components/AttendanceCalculator.css";


function AttendanceCalculator() {

  const [attendedClasses, setAttendedClasses] = useState(42);
  const [totalClasses, setTotalClasses] = useState(50);
  const [targetAttendance, setTargetAttendance] = useState(75);

  const currentAttendance = calculateAttendance(
    attendedClasses,
    totalClasses
  );

  const afterAttend = calculateAfterAttend(
    attendedClasses,
    totalClasses
  );

  const afterMiss = calculateAfterMiss(
    attendedClasses,
    totalClasses
  );

  const classesCanMiss = calculateClassesCanMiss(
    attendedClasses,
    totalClasses,
    targetAttendance
  );

  const classesNeeded = calculateClassesNeeded(
    attendedClasses,
    totalClasses,
    targetAttendance
  );


  const handleReset = () => {
    setAttendedClasses(42);
    setTotalClasses(50);
    setTargetAttendance(75);
  };


  return (
    <section className="attendance-calculator">

      {/* HEADER */}

      <div className="calculator-top">

        <div className="calculator-heading">

          <div className="calculator-icon">
            <Calculator size={22} />
          </div>

          <div>

            <div className="calculator-eyebrow">
              <span className="pulse"></span>
              SMART ATTENDANCE PLANNER
            </div>

            <h2>
              Plan before you skip.
            </h2>

            <p>
              See exactly how your upcoming classes will affect
              your attendance percentage.
            </p>

          </div>

        </div>


        <button
          className="calculator-reset"
          onClick={handleReset}
        >
          <RotateCcw size={15} />
          Reset
        </button>

      </div>


      {/* CALCULATOR BODY */}

      <div className="calculator-body">


        {/* INPUT PANEL */}

        <div className="calculator-input-panel">

          <div className="panel-label">
            YOUR ATTENDANCE DATA
          </div>


          <div className="input-group">

            <label>
              Classes Attended
            </label>

            <div className="number-input">

              <input
                type="number"
                min="0"
                value={attendedClasses}
                onChange={(e) =>
                  setAttendedClasses(
                    Math.max(0, Number(e.target.value))
                  )
                }
              />

              <span>classes</span>

            </div>

          </div>


          <div className="input-group">

            <label>
              Total Classes Conducted
            </label>

            <div className="number-input">

              <input
                type="number"
                min="1"
                value={totalClasses}
                onChange={(e) =>
                  setTotalClasses(
                    Math.max(1, Number(e.target.value))
                  )
                }
              />

              <span>classes</span>

            </div>

          </div>


          <div className="input-group">

            <label>
              Required Attendance
            </label>

            <div className="number-input">

              <input
                type="number"
                min="1"
                max="100"
                value={targetAttendance}
                onChange={(e) =>
                  setTargetAttendance(
                    Math.min(
                      100,
                      Math.max(1, Number(e.target.value))
                    )
                  )
                }
              />

              <span>%</span>

            </div>

          </div>


          <div className="current-result">

            <div>

              <span>
                CURRENT ATTENDANCE
              </span>

              <strong>
                {currentAttendance.toFixed(1)}%
              </strong>

            </div>

            <div className="result-ratio">
              {attendedClasses} / {totalClasses}
            </div>

          </div>

        </div>


        {/* RESULTS PANEL */}

        <div className="calculator-results-panel">

          <div className="panel-label">
            WHAT HAPPENS NEXT?
          </div>


          <div className="calculator-result-grid">


            {/* MISS */}

            <div className="calculator-result-card miss">

              <div className="result-card-top">

                <div className="result-card-icon">
                  <XCircle size={20} />
                </div>

                <span>
                  IF YOU MISS
                </span>

              </div>

              <strong>
                {afterMiss.toFixed(1)}%
              </strong>

              <p>
                Your attendance after missing
                the next class.
              </p>

            </div>


            {/* ATTEND */}

            <div className="calculator-result-card attend">

              <div className="result-card-top">

                <div className="result-card-icon">
                  <CheckCircle2 size={20} />
                </div>

                <span>
                  IF YOU ATTEND
                </span>

              </div>

              <strong>
                {afterAttend.toFixed(1)}%
              </strong>

              <p>
                Your attendance after attending
                the next class.
              </p>

            </div>


          </div>


          {/* SAFE MISS + REQUIRED */}

          <div className="calculator-bottom-results">


            <div className="mini-result">

              <div className="mini-result-icon purple">
                <Target size={18} />
              </div>

              <div>

                <span>
                  SAFE MISSES
                </span>

                <strong>
                  {classesCanMiss}
                </strong>

                <small>
                  classes can be missed while
                  staying at {targetAttendance}%.
                </small>

              </div>

            </div>


            <div className="mini-result">

              <div className="mini-result-icon blue">
                <TrendingUp size={18} />
              </div>

              <div>

                <span>
                  TO REACH {targetAttendance}%
                </span>

                <strong>
                  {classesNeeded}
                </strong>

                <small>
                  consecutive classes to attend.
                </small>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* SMART EXPLANATION */}

      <div className="calculator-footer">

        <div className="footer-status">

          <span className="footer-status-dot"></span>

          <strong>
            {currentAttendance >= targetAttendance
              ? "You are currently above your target."
              : "You are currently below your target."
            }
          </strong>

        </div>


        <p>

          {currentAttendance >= targetAttendance
            ? `You can miss ${classesCanMiss} upcoming class${
                classesCanMiss !== 1 ? "es" : ""
              } and still maintain at least ${targetAttendance}% attendance.`
            : `You need to attend ${classesNeeded} consecutive class${
                classesNeeded !== 1 ? "es" : ""
              } to reach ${targetAttendance}% attendance.`
          }

        </p>

      </div>

    </section>
  );
}

export default AttendanceCalculator;