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
import useMonitoring from "../context/useMonitoring";


function CameraMonitoring() {

  // ==========================================
  // MONITORING CONTEXT
  // ==========================================

  const { setMonitoringData } = useMonitoring();


  // ==========================================
  // REFERENCES
  // ==========================================

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const modelRef = useRef(null);
  const animationRef = useRef(null);
  const fpsAnimationRef = useRef(null);


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
  // LOAD COCO-SSD MODEL
  // ==========================================

  useEffect(() => {

    let mounted = true;

    const loadModel = async () => {

      try {

        console.log("Loading COCO-SSD AI model...");

        const model = await cocoSsd.load();

        if (!mounted) {
          return;
        }

        modelRef.current = model;

        setModelLoading(false);

        console.log(
          "COCO-SSD model loaded successfully."
        );

      } catch (error) {

        console.error(
          "AI model loading error:",
          error
        );

        if (mounted) {
          setModelLoading(false);
        }

      }

    };

    loadModel();


    return () => {
      mounted = false;
    };

  }, []);


  // ==========================================
  // SYNC DATA WITH MONITORING CONTEXT
  // ==========================================

  useEffect(() => {

    setMonitoringData({
      cameraActive,
      peopleCount,
      confidence,
      fps,
      framesAnalyzed,
    });

  }, [
    cameraActive,
    peopleCount,
    confidence,
    fps,
    framesAnalyzed,
    setMonitoringData,
  ]);


  // ==========================================
  // START CAMERA
  // ==========================================

  const startCamera = async () => {

    // Prevent starting another stream
    // while one is already active.

    if (streamRef.current) {
      return;
    }


    try {

      setCameraError("");

      console.log("Requesting camera access...");


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


      console.log(
        "Camera stream received."
      );


      // Store stream first.

      streamRef.current = stream;


      // IMPORTANT:
      // We do NOT call video.play() here.
      //
      // React has to render the video element first.
      //
      // The useEffect below will attach the stream
      // and safely start playback.

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
  // ATTACH STREAM TO VIDEO
  // ==========================================

  useEffect(() => {

    if (!cameraActive) {
      return;
    }


    const video =
      videoRef.current;

    const stream =
      streamRef.current;


    if (!video || !stream) {
      return;
    }


    let cancelled = false;


    const startVideoPlayback = async () => {

      try {

        // Attach stream only once.

        if (video.srcObject !== stream) {
          video.srcObject = stream;
        }


        // Wait until the browser has enough
        // information about the video.

        if (video.readyState < 2) {

          await new Promise((resolve) => {

            const handleLoadedMetadata = () => {

              video.removeEventListener(
                "loadedmetadata",
                handleLoadedMetadata
              );

              resolve();

            };


            video.addEventListener(
              "loadedmetadata",
              handleLoadedMetadata
            );

          });

        }


        if (cancelled) {
          return;
        }


        // Only play if the video is paused.

        if (video.paused) {

          await video.play();

        }


        console.log(
          "Camera video started successfully."
        );

      } catch (error) {

        if (cancelled) {
          return;
        }


        // AbortError can happen if the stream
        // is stopped while playback is starting.
        //
        // We don't show it as a camera failure
        // because it is a lifecycle interruption.

        if (error?.name === "AbortError") {

          console.log(
            "Camera playback was interrupted."
          );

          return;

        }


        console.error(
          "Video playback error:",
          error
        );


        setCameraError(
          "The camera opened, but the video could not be started."
        );

        setCameraActive(false);

      }

    };


    startVideoPlayback();


    return () => {

      cancelled = true;

    };

  }, [cameraActive]);


  // ==========================================
  // STOP CAMERA
  // ==========================================

  const stopCamera = () => {

    console.log("Stopping camera...");


    // Stop AI animation.

    if (animationRef.current) {

      cancelAnimationFrame(
        animationRef.current
      );

      animationRef.current = null;

    }


    // Stop FPS animation.

    if (fpsAnimationRef.current) {

      cancelAnimationFrame(
        fpsAnimationRef.current
      );

      fpsAnimationRef.current = null;

    }


    // Stop webcam tracks.

    if (streamRef.current) {

      streamRef.current
        .getTracks()
        .forEach((track) => {

          track.stop();

        });

      streamRef.current = null;

    }


    // Detach video stream.

    if (videoRef.current) {

      videoRef.current.pause();

      videoRef.current.srcObject = null;

    }


    // Clear detection canvas.

    if (canvasRef.current) {

      const canvas =
        canvasRef.current;

      const ctx =
        canvas.getContext("2d");


      if (ctx) {

        ctx.clearRect(
          0,
          0,
          canvas.width,
          canvas.height
        );

      }

    }


    // Reset state.

    setCameraActive(false);
    setPeopleCount(0);
    setConfidence(0);
    setFramesAnalyzed(0);
    setFps(0);

  };


  // ==========================================
  // DRAW DETECTION BOXES
  // ==========================================

  const drawDetections = (predictions) => {

    const video =
      videoRef.current;

    const canvas =
      canvasRef.current;


    if (!video || !canvas) {
      return;
    }


    if (
      video.videoWidth === 0 ||
      video.videoHeight === 0
    ) {
      return;
    }


    const ctx =
      canvas.getContext("2d");


    if (!ctx) {
      return;
    }


    // Match canvas to actual video resolution.

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
    // FILTER ONLY PEOPLE
    // ========================================

    const people =
      predictions.filter(
        (prediction) =>
          prediction.class === "person" &&
          prediction.score >= 0.5
      );


    // ========================================
    // DRAW PERSON BOXES
    // ========================================

    people.forEach((person) => {

      const [
        x,
        y,
        width,
        height,
      ] = person.bbox;


      // Bounding box.

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
        Math.max(0, y - 28),
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
        Math.max(19, y - 9)
      );

    });


    // ========================================
    // UPDATE PEOPLE COUNT
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
      !cameraActive ||
      video.readyState < 2
    ) {

      if (cameraActive) {

        animationRef.current =
          requestAnimationFrame(
            detectPeople
          );

      }

      return;

    }


    try {

      const predictions =
        await model.detect(video);


      // Make sure camera is still active.

      if (!streamRef.current) {
        return;
      }


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


    // Continue detection.

    if (streamRef.current) {

      animationRef.current =
        requestAnimationFrame(
          detectPeople
        );

    }

  };


  // ==========================================
  // START AI WHEN CAMERA IS ACTIVE
  // ==========================================

  useEffect(() => {

    if (
      cameraActive &&
      !modelLoading &&
      modelRef.current
    ) {

      // Small delay gives the browser time
      // to finish rendering the video.

      const timer =
        setTimeout(() => {

          detectPeople();

        }, 100);


      return () => {

        clearTimeout(timer);


        if (
          animationRef.current
        ) {

          cancelAnimationFrame(
            animationRef.current
          );

          animationRef.current = null;

        }

      };

    }


    return () => {

      if (
        animationRef.current
      ) {

        cancelAnimationFrame(
          animationRef.current
        );

        animationRef.current = null;

      }

    };

  }, [
    cameraActive,
    modelLoading,
  ]);


  // ==========================================
  // FPS CALCULATION
  // ==========================================

  useEffect(() => {

    if (!cameraActive) {
      return;
    }


    let frameCount = 0;

    let lastTime =
      performance.now();


    const calculateFPS = () => {

      if (!streamRef.current) {
        return;
      }


      frameCount++;


      const currentTime =
        performance.now();


      const elapsed =
        currentTime - lastTime;


      if (elapsed >= 1000) {

        const calculatedFPS =
          Math.round(
            (frameCount * 1000) /
            elapsed
          );


        setFps(
          calculatedFPS
        );


        frameCount = 0;

        lastTime =
          currentTime;

      }


      fpsAnimationRef.current =
        requestAnimationFrame(
          calculateFPS
        );

    };


    fpsAnimationRef.current =
      requestAnimationFrame(
        calculateFPS
      );


    return () => {

      if (
        fpsAnimationRef.current
      ) {

        cancelAnimationFrame(
          fpsAnimationRef.current
        );

        fpsAnimationRef.current = null;

      }

    };

  }, [cameraActive]);


  // ==========================================
  // CLEANUP WHEN PAGE UNMOUNTS
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
        fpsAnimationRef.current
      ) {

        cancelAnimationFrame(
          fpsAnimationRef.current
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

        streamRef.current = null;

      }


      if (videoRef.current) {

        videoRef.current.pause();

        videoRef.current.srcObject = null;

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


            {/* =================================
                VIDEO IS ALWAYS IN THE DOM
                ================================= */}

            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`camera-video ${
                cameraActive
                  ? "visible"
                  : "hidden"
              }`}
            />


            {/* =================================
                DETECTION CANVAS
                ================================= */}

            <canvas
              ref={canvasRef}
              className={`detection-canvas ${
                cameraActive
                  ? "visible"
                  : "hidden"
              }`}
            />


            {/* =================================
                CAMERA PLACEHOLDER
                ================================= */}

            {!cameraActive && (

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
                  type="button"
                  className="start-camera-button"
                  onClick={startCamera}
                >

                  <Camera size={17} />

                  Start Camera

                </button>

              </div>

            )}


            {/* =================================
                ACTIVE OVERLAY
                ================================= */}

            {cameraActive && (

              <div className="camera-active-overlay">

                <div className="camera-scanning">

                  <span className="camera-scan-dot"></span>

                  {modelLoading
                    ? "LOADING AI..."
                    : "AI DETECTING"}

                </div>

              </div>

            )}


            {/* =================================
                SCANNING CORNERS
                ================================= */}

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
                  type="button"
                  className="stop-camera-button"
                  onClick={stopCamera}
                >

                  Stop Camera

                </button>

              )}

            </div>

          </div>


          {/* =================================
              ERROR
          ================================== */}

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
            Detected people are shared
            with the campus monitoring
            system for occupancy analytics.
          </p>

        </div>

      </section>

    </div>

  );

}

export default CameraMonitoring;