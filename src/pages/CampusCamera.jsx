import { useEffect, useRef, useState } from "react";
import {
  Camera,
  CameraOff,
  Users,
  ShieldCheck,
  Activity,
  Maximize2,
  Circle,
} from "lucide-react";

import "../styles/pages/CampusCamera.css";

function CampusCamera() {
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState("");

  // =========================================
  // START CAMERA
  // =========================================

  const startCamera = async () => {
    try {
      setCameraError("");

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      setCameraActive(true);
    } catch (error) {
      console.error("Camera error:", error);

      setCameraError(
        "Unable to access camera. Please allow camera permission."
      );
    }
  };

  // =========================================
  // STOP CAMERA
  // =========================================

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
      });

      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setCameraActive(false);
  };

  // =========================================
  // CLEANUP
  // =========================================

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, []);

  return (
    <div className="campus-camera-page">

      {/* =========================================
          PAGE HEADER
      ========================================= */}

      <section className="camera-page-header">

        <div>
          <div className="camera-eyebrow">
            <Activity size={16} />
            CAMPUS VISION
          </div>

          <h1>AI Camera Monitoring</h1>

          <p>
            Real-time classroom and campus activity monitoring
            using computer vision.
          </p>
        </div>

        <div className="camera-system-status">

          <span
            className={`camera-status-dot ${
              cameraActive ? "active" : ""
            }`}
          ></span>

          <div>
            <strong>
              {cameraActive ? "Camera Live" : "Camera Offline"}
            </strong>

            <span>
              {cameraActive
                ? "Monitoring camera feed"
                : "Camera ready to start"}
            </span>
          </div>

        </div>

      </section>


      {/* =========================================
          MAIN CAMERA GRID
      ========================================= */}

      <section className="camera-main-grid">

        {/* =========================================
            CAMERA PREVIEW
        ========================================= */}

        <div className="camera-preview-panel">

          <div className="camera-panel-header">

            <div>
              <span className="camera-panel-eyebrow">
                <Camera size={15} />
                LIVE CAMERA FEED
              </span>

              <h2>Classroom Monitoring</h2>
            </div>

            <button
              className="camera-fullscreen-button"
              type="button"
              title="Fullscreen"
            >
              <Maximize2 size={17} />
            </button>

          </div>


          {/* VIDEO AREA */}

          <div className="camera-video-container">

            <video
              ref={videoRef}
              className="camera-video"
              autoPlay
              playsInline
              muted
            />

            {!cameraActive && (
              <div className="camera-placeholder">

                <div className="camera-placeholder-icon">
                  <CameraOff size={32} />
                </div>

                <h3>Camera is not active</h3>

                <p>
                  Start the camera to begin classroom monitoring.
                </p>

              </div>
            )}


            {/* LIVE BADGE */}

            {cameraActive && (
              <div className="camera-live-badge">

                <span></span>

                LIVE

              </div>
            )}


            {/* TOP RIGHT CAMERA INFO */}

            {cameraActive && (
              <div className="camera-feed-info">

                <span>
                  <Circle size={8} fill="currentColor" />
                  HD
                </span>

                <span>
                  30 FPS
                </span>

              </div>
            )}

          </div>


          {/* CAMERA CONTROLS */}

          <div className="camera-controls">

            {!cameraActive ? (

              <button
                className="start-camera-button"
                onClick={startCamera}
                type="button"
              >
                <Camera size={18} />
                Start Camera
              </button>

            ) : (

              <button
                className="stop-camera-button"
                onClick={stopCamera}
                type="button"
              >
                <CameraOff size={18} />
                Stop Camera
              </button>

            )}

          </div>


          {/* ERROR */}

          {cameraError && (
            <div className="camera-error">
              {cameraError}
            </div>
          )}

        </div>


        {/* =========================================
            DETECTION PANEL
        ========================================= */}

        <div className="camera-detection-panel">

          <div className="camera-panel-header">

            <div>
              <span className="camera-panel-eyebrow">
                <Users size={15} />
                PEOPLE DETECTION
              </span>

              <h2>Live Detection</h2>
            </div>

          </div>


          {/* PEOPLE COUNT */}

          <div className="people-count-card">

            <div className="people-count-icon">
              <Users size={26} />
            </div>

            <span>PEOPLE DETECTED</span>

            <strong>0</strong>

            <p>
              Waiting for computer vision...
            </p>

          </div>


          {/* DETECTION STATUS */}

          <div className="detection-status-card">

            <div className="detection-status-icon">
              <ShieldCheck size={20} />
            </div>

            <div>
              <strong>Detection Engine</strong>

              <span>
                Not initialized
              </span>
            </div>

          </div>


          {/* CONFIDENCE */}

          <div className="confidence-section">

            <div className="confidence-header">

              <span>
                Detection Confidence
              </span>

              <strong>
                0%
              </strong>

            </div>

            <div className="confidence-bar">

              <div
                className="confidence-fill"
                style={{ width: "0%" }}
              ></div>

            </div>

          </div>


          {/* SESSION INFO */}

          <div className="camera-session">

            <div>
              <span>Camera Status</span>

              <strong>
                {cameraActive ? "Online" : "Offline"}
              </strong>
            </div>

            <div>
              <span>People Count</span>

              <strong>0</strong>
            </div>

            <div>
              <span>Detection Mode</span>

              <strong>Preview</strong>
            </div>

          </div>

        </div>

      </section>


      {/* =========================================
          SYSTEM INFORMATION
      ========================================= */}

      <section className="camera-system-panel">

        <div className="system-info-left">

          <div className="system-info-icon">
            <ShieldCheck size={21} />
          </div>

          <div>
            <strong>
              Campus Vision AI
            </strong>

            <span>
              Privacy-focused computer vision monitoring
              for campus environments.
            </span>
          </div>

        </div>


        <div className="system-info-right">

          <div>
            <span className="system-online-dot"></span>

            <strong>
              System Ready
            </strong>
          </div>

          <span>
            Detection engine will be connected in the next step.
          </span>

        </div>

      </section>

    </div>
  );
}

export default CampusCamera;