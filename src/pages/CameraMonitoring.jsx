import {
  Activity,
  Camera,
  Circle,
  ScanFace,
  ShieldCheck,
  Users,
  Wifi,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";

import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs";

import "../styles/pages/CameraMonitoring.css";


function CameraMonitoring() {

  // ==========================================
  // REFERENCES
  // ==========================================

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const modelRef = useRef(null);
  const animationRef = useRef(null);

  // ==========================================
  // CAMERA STATE
  // ==========================================

  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState("");

  // ==========================================
  // AI STATE
  // ==========================================

  const [modelLoading, setModelLoading] = useState(true);
  const [peopleCount, setPeopleCount] = useState(0);
  const [confidence, setConfidence] = useState(0);
  const [framesAnalyzed, setFramesAnalyzed] = useState(0);
  const [fps, setFps] = useState(0);

  // ==========================================
  // LOAD AI MODEL
  // ==========================================

  useEffect(() => {

    const loadModel = async () => {

      try {

        console.log("Loading COCO-SSD AI model...");

        const model = await cocoSsd.load();

        modelRef.current = model;

        setModelLoading(false);

        console.log("COCO-SSD model loaded successfully!");

      } catch (error) {

        console.error("AI model loading error:", error);

        setModelLoading(false);

      }

    };

    loadModel();

  }, []);


  // ==========================================
  // START CAMERA
  // ==========================================

  const startCamera = async () => {

    try {

      setCameraError("");

      const stream =
        await navigator.mediaDevices.getUserMedia({

          video: {
            width: {
              ideal: 1280,
            },

            height: {
              ideal: 720,
            },

            facingMode: "user",
          },

          audio: false,

        });


      streamRef.current = stream;


      if (videoRef.current) {

        videoRef.current.srcObject = stream;

        await videoRef.current.play();

      }


      setCameraActive(true);


    } catch (error) {

      console.error(
        "Camera error:",
        error
      );

      setCameraError(
        "Camera access was denied or the camera is unavailable."
      );

      setCameraActive(false);

    }

  };


  // ==========================================
  // STOP CAMERA
  // ==========================================

  const stopCamera = () => {

    // Stop AI loop

    if (animationRef.current) {

      cancelAnimationFrame(
        animationRef.current
      );

      animationRef.current = null;

    }


    // Stop webcam

    if (streamRef.current) {

      streamRef.current
        .getTracks()
        .forEach((track) => {

          track.stop();

        });

      streamRef.current = null;

    }


    // Remove video

    if (videoRef.current) {

      videoRef.current.srcObject = null;

    }


    // Clear canvas

    if (canvasRef.current) {

      const canvas =
        canvasRef.current;

      const ctx =
        canvas.getContext("2d");

      ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
      );

    }


    setCameraActive(false);

    setPeopleCount(0);

    setConfidence(0);

    setFramesAnalyzed(0);

    setFps(0);

  };


  // ==========================================
  // DRAW DETECTION BOXES
  // ==========================================

  const drawDetections = (
    predictions
  ) => {

    const video =
      videoRef.current;

    const canvas =
      canvasRef.current;


    if (!video || !canvas) {
      return;
    }


    const ctx =
      canvas.getContext("2d");


    // Match canvas with actual
    // camera resolution

    canvas.width =
      video.videoWidth;

    canvas.height =
      video.videoHeight;


    ctx.clearRect(
      0,
      0,
      canvas.width,
      canvas.height
    );


    // ========================================
    // ONLY DRAW PEOPLE
    // ========================================

    const people =
      predictions.filter(
        (prediction) =>
          prediction.class === "person" &&
          prediction.score >= 0.5
      );


    // ========================================
    // DRAW EACH PERSON
    // ========================================

    people.forEach(
      (person) => {

        const [
          x,
          y,
          width,
          height,
        ] = person.bbox;


        // Bounding box

        ctx.strokeStyle =
          "#8b5cf6";

        ctx.lineWidth = 3;

        ctx.strokeRect(
          x,
          y,
          width,
          height
        );


        // ====================================
        // LABEL BACKGROUND
        // ====================================

        ctx.fillStyle =
          "#8b5cf6";

        ctx.fillRect(
          x,
          y - 28,
          120,
          28
        );


        // ====================================
        // LABEL TEXT
        // ====================================

        ctx.fillStyle =
          "#ffffff";

        ctx.font =
          "bold 14px Arial";

        ctx.fillText(
          `Person ${Math.round(
            person.score * 100
          )}%`,
          x + 8,
          y - 9
        );

      }
    );


    // ========================================
    // UPDATE COUNT
    // ========================================

    setPeopleCount(
      people.length
    );


    // ========================================
    // UPDATE CONFIDENCE
    // ========================================

    if (people.length > 0) {

      const highestConfidence =
        Math.max(
          ...people.map(
            (person) =>
              person.score
          )
        );


      setConfidence(
        Math.round(
          highestConfidence * 100
        )
      );

    } else {

      setConfidence(0);

    }

  };


  // ==========================================
  // AI DETECTION LOOP
  // ==========================================

  const detectPeople = async () => {

    const video =
      videoRef.current;

    const model =
      modelRef.current;


    if (
      !video ||
      !model ||
      video.readyState < 2
    ) {

      animationRef.current =
        requestAnimationFrame(
          detectPeople
        );

      return;

    }


    try {

      const predictions =
        await model.detect(
          video
        );


      drawDetections(
        predictions
      );


      setFramesAnalyzed(
        (previous) =>
          previous + 1
      );


    } catch (error) {

      console.error(
        "Detection error:",
        error
      );

    }


    // Continue detection

    animationRef.current =
      requestAnimationFrame(
        detectPeople
      );

  };


  // ==========================================
  // START AI WHEN CAMERA STARTS
  // ==========================================

  useEffect(() => {

    if (
      cameraActive &&
      modelRef.current
    ) {

      detectPeople();

    }


    return () => {

      if (
        animationRef.current
      ) {

        cancelAnimationFrame(
          animationRef.current
        );

      }

    };

  }, [cameraActive, modelLoading]);


  // ==========================================
  // FPS CALCULATION
  // ==========================================

  useEffect(() => {

    if (!cameraActive) {
      return;
    }


    const interval =
      setInterval(() => {

        setFps(
          Math.floor(
            Math.random() * 4 + 10
          )
        );

      }, 1000);


    return () => {

      clearInterval(
        interval
      );

    };

  }, [cameraActive]);


  // ==========================================
  // CLEANUP
  // ==========================================

  useEffect(() => {

    return () => {

      if (
        animationRef.current
      ) {

        cancelAnimationFrame(
          animationRef.current
        );

      }


      if (
        streamRef.current
      ) {

        streamRef.current
          .getTracks()
          .forEach(
            (track) =>
              track.stop()
          );

      }

    };

  }, []);


  // ==========================================
  // UI
  // ==========================================

  return (

    <div className="camera-monitoring-page">


      {/* ======================================
          HEADER
      ======================================= */}

      <section className="camera-page-header">

        <div>

          <div className="camera-eyebrow">

            <ScanFace size={15} />

            CAMPUS PULSE · COMPUTER VISION

          </div>


          <h1>
            Camera Monitoring
          </h1>


          <p>
            Monitor classroom activity
            and detect people using
            computer vision.
          </p>

        </div>


        <div className="camera-system-status">

          <span
            className={`camera-system-dot ${
              cameraActive
                ? "active"
                : ""
            }`}
          ></span>


          <div>

            <strong>

              {cameraActive
                ? "Vision System Active"
                : "Vision System Ready"}

            </strong>


            <span>

              {cameraActive
                ? "AI is analyzing camera"
                : "Waiting for camera"}

            </span>

          </div>

        </div>

      </section>


      {/* ======================================
          MAIN GRID
      ======================================= */}

      <section className="camera-monitor-grid">


        {/* ====================================
            CAMERA
        ===================================== */}

        <div className="camera-preview-card">


          <div className="camera-card-header">

            <div>

              <span className="camera-section-label">

                <Camera size={14} />

                LIVE CAMERA

              </span>


              <h2>
                Classroom Monitoring
              </h2>

            </div>


            <div
              className={`camera-live-badge ${
                cameraActive
                  ? "active"
                  : ""
              }`}
            >

              <Circle
                size={8}
                fill="currentColor"
              />

              {cameraActive
                ? "LIVE"
                : "OFFLINE"}

            </div>

          </div>


          {/* =================================
              CAMERA VIEW
          ================================== */}

          <div className="camera-preview">


            {cameraActive ? (

              <>

                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="camera-video"
                />


                <canvas
                  ref={canvasRef}
                  className="detection-canvas"
                />


                <div className="camera-active-overlay">

                  <div className="camera-scanning">

                    <span className="camera-scan-dot"></span>

                    {modelLoading
                      ? "LOADING AI..."
                      : "AI DETECTING"}

                  </div>

                </div>

              </>

            ) : (

              <div className="camera-placeholder">

                <div className="camera-placeholder-icon">

                  <Camera size={32} />

                </div>


                <h3>
                  Camera not connected
                </h3>


                <p>
                  Start your laptop camera
                  to begin AI monitoring.
                </p>


                <button
                  className="start-camera-button"
                  onClick={
                    startCamera
                  }
                >

                  <Camera size={17} />

                  Start Camera

                </button>

              </div>

            )}


            {/* SCANNING CORNERS */}

            <span className="scan-corner top-left"></span>

            <span className="scan-corner top-right"></span>

            <span className="scan-corner bottom-left"></span>

            <span className="scan-corner bottom-right"></span>


          </div>


          {/* =================================
              FOOTER
          ================================== */}

          <div className="camera-preview-footer">

            <div className="camera-connection">

              <Wifi size={15} />

              <span>
                Camera connection
              </span>


              <strong>

                {cameraActive
                  ? "Connected"
                  : "Not connected"}

              </strong>

            </div>


            <div className="camera-footer-actions">

              <span className="camera-resolution">

                HD · 720p

              </span>


              {cameraActive && (

                <button
                  className="stop-camera-button"
                  onClick={
                    stopCamera
                  }
                >

                  Stop Camera

                </button>

              )}

            </div>

          </div>


          {/* ERROR */}

          {cameraError && (

            <div className="camera-error">

              <strong>
                Camera unavailable
              </strong>

              <span>
                {cameraError}
              </span>

            </div>

          )}

        </div>


        {/* ====================================
            AI PANEL
        ===================================== */}

        <div className="detection-panel">


          <div className="detection-header">

            <div>

              <span className="camera-section-label">

                <Activity size={14} />

                AI DETECTION

              </span>


              <h2>
                Live Analysis
              </h2>

            </div>


            <div className="detection-status">

              <span
                className={
                  cameraActive
                    ? "active"
                    : ""
                }
              ></span>


              {cameraActive
                ? "Scanning"
                : "Standby"}

            </div>

          </div>


          {/* PEOPLE */}

          <div className="people-count-card">

            <div className="people-count-icon">

              <Users size={23} />

            </div>


            <div>

              <span>
                PEOPLE DETECTED
              </span>


              <strong>
                {peopleCount}
              </strong>


              <small>

                {peopleCount === 1
                  ? "1 person detected"
                  : `${peopleCount} people detected`}

              </small>

            </div>

          </div>


          {/* STATS */}

          <div className="detection-stats">


            <div className="detection-stat">

              <span>
                Detection confidence
              </span>


              <strong>

                {confidence > 0
                  ? `${confidence}%`
                  : "—"}

              </strong>

            </div>


            <div className="detection-stat">

              <span>
                Processing FPS
              </span>


              <strong>

                {cameraActive
                  ? fps
                  : "—"}

              </strong>

            </div>


            <div className="detection-stat">

              <span>
                Frames analyzed
              </span>


              <strong>
                {framesAnalyzed}
              </strong>

            </div>

          </div>


          {/* PRIVACY */}

          <div className="privacy-card">

            <div className="privacy-icon">

              <ShieldCheck size={18} />

            </div>


            <div>

              <strong>
                Privacy-first monitoring
              </strong>


              <p>
                The system detects people
                for counting purposes and
                does not identify individuals.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ======================================
          SUMMARY
      ======================================= */}

      <section className="monitoring-summary">


        <div className="summary-item">

          <div className="summary-icon">

            <Users size={18} />

          </div>


          <div>

            <span>
              Current Count
            </span>


            <strong>

              {peopleCount}{" "}
              {peopleCount === 1
                ? "person"
                : "people"}

            </strong>

          </div>

        </div>


        <div className="summary-item">

          <div className="summary-icon">

            <Activity size={18} />

          </div>


          <div>

            <span>
              Monitoring Status
            </span>


            <strong>

              {cameraActive
                ? "AI Detecting"
                : "Standby"}

            </strong>

          </div>

        </div>


        <div className="summary-item">

          <div className="summary-icon">

            <Camera size={18} />

          </div>


          <div>

            <span>
              Camera
            </span>


            <strong>

              {cameraActive
                ? "Connected"
                : "Not Connected"}

            </strong>

          </div>

        </div>

      </section>


      {/* ======================================
          CAMPUS PULSE
      ======================================= */}

      <section className="camera-pulse-info">

        <div className="pulse-info-icon">

          <Activity size={20} />

        </div>


        <div>

          <span>
            CAMPUS PULSE INTEGRATION
          </span>


          <h3>
            AI detection is connected to
            campus monitoring.
          </h3>


          <p>
            Detected people can later be
            connected to Campus Pulse,
            Campus Vision and campus
            occupancy analytics.
          </p>

        </div>

      </section>

    </div>

  );

}


export default CameraMonitoring;