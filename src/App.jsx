import { useEffect, useRef, useState } from 'react';

/* ─────────────────────────────────────────────
   PARTICLES — ambient floating dots
───────────────────────────────────────────── */
const PARTICLE_COUNT = 18;
const PARTICLE_COLORS = ['#a855f7', '#7c3aed', '#06b6d4', '#ec4899', '#34d399'];

function Particles() {
  const items = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
    duration: `${6 + Math.random() * 10}s`,
    delay: `${Math.random() * 8}s`,
    size: `${2 + Math.random() * 4}px`,
  }));

  return (
    <div className="particles-container" aria-hidden="true">
      {items.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            background: p.color,
            width: p.size,
            height: p.size,
            animationDuration: p.duration,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   CONFETTI BURST — fires on completion
───────────────────────────────────────────── */
const CONFETTI_COLORS = ['#a855f7', '#ec4899', '#06b6d4', '#fbbf24', '#34d399', '#f87171'];

function Confetti({ active }) {
  if (!active) return null;

  const pieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: `${10 + Math.random() * 80}%`,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    delay: `${Math.random() * 0.8}s`,
    duration: `${1.8 + Math.random() * 1.2}s`,
    size: `${6 + Math.random() * 8}px`,
    rotate: `${Math.random() * 360}deg`,
  }));

  return (
    <>
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: p.left,
            background: p.color,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
            transform: `rotate(${p.rotate})`,
          }}
        />
      ))}
    </>
  );
}

/* ─────────────────────────────────────────────
   STEP INDICATOR
───────────────────────────────────────────── */
function StepIndicator({ progress }) {
  const getStepState = (stepIndex) => {
    if (progress === 100) return stepIndex === 2 ? 'complete-done' : 'done';
    if (progress >= stepIndex * 34) return stepIndex === Math.floor(progress / 34) ? 'active' : 'done';
    return 'pending';
  };

  const steps = [
    { label: 'Initialize', icon: '01' },
    { label: 'Processing', icon: '02' },
    { label: 'Complete',   icon: '✓'  },
  ];

  const lineActive = (lineIdx) => {
    if (progress === 100) return true;
    return progress >= (lineIdx + 1) * 34;
  };

  return (
    <div className="step-indicator" role="list" aria-label="Progress steps">
      {steps.map((step, idx) => (
        <div key={step.label} style={{ display: 'flex', alignItems: 'center' }}>
          <div className={`step ${getStepState(idx)}`} role="listitem">
            <div className="step-circle">
              {progress === 100 && idx === 2 ? '✓' : step.icon}
            </div>
            <span className="step-label">{step.label}</span>
          </div>
          {idx < steps.length - 1 && (
            <div className={`step-line ${lineActive(idx) ? 'active' : ''}`} />
          )}
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   SPEED CONTROL
───────────────────────────────────────────── */
const SPEEDS = [
  { label: '0.5×', value: 2 },
  { label: '1×',   value: 1 },
  { label: '2×',   value: 0.5 },
  { label: '3×',   value: 0.33 },
];

function SpeedControl({ speed, onSpeedChange, disabled }) {
  return (
    <div className="speed-control" role="group" aria-label="Animation speed">
      <span className="speed-label">⚡ Speed</span>
      <div className="speed-chips">
        {SPEEDS.map((s) => (
          <button
            key={s.label}
            className={`speed-chip ${speed === s.value ? 'active-chip' : 'inactive'}`}
            onClick={() => onSpeedChange(s.value)}
            disabled={disabled}
            aria-pressed={speed === s.value}
            id={`speed-${s.label.replace('×', 'x')}`}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   LOADING ICON SVG
───────────────────────────────────────────── */
function LoadingIcon() {
  return (
    <svg className="icon-svg" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="18" cy="18" r="14" stroke="url(#gld)" strokeWidth="2.5" strokeLinecap="round"
        strokeDasharray="60 30" style={{ animation: 'spin 1.2s linear infinite', transformOrigin: 'center' }}>
        <animateTransform attributeName="transform" type="rotate"
          from="0 18 18" to="360 18 18" dur="1.2s" repeatCount="indefinite" />
      </circle>
      <defs>
        <linearGradient id="gld" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#a855f7" />
          <stop offset="1" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ─────────────────────────────────────────────
   COMPLETE ICON SVG
───────────────────────────────────────────── */
function CompleteIcon() {
  return (
    <svg className="icon-svg" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="18" cy="18" r="14" fill="url(#gldg)" />
      <path d="M11 18l5 5 9-9" stroke="white" strokeWidth="2.5"
        strokeLinecap="round" strokeLinejoin="round"
        strokeDasharray="20" strokeDashoffset="0"
        style={{ animation: 'drawCheck 0.5s ease forwards' }} />
      <defs>
        <linearGradient id="gldg" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#10b981" />
          <stop offset="1" stopColor="#34d399" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ─────────────────────────────────────────────
   PROGRESS BAR COMPONENT (core task requirement)
───────────────────────────────────────────── */
function ProgressBar({ progress, isComplete }) {
  return (
    <div className="progress-track-wrapper">
      <div
        className="progress-track"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Loading progress"
      >
        <div
          className={`progress-fill ${isComplete ? 'complete-fill' : 'loading-fill'}`}
          style={{ width: `${progress}%` }}
        >
          {progress > 3 && (
            <div className="progress-tip" />
          )}
        </div>
      </div>
      <div className="progress-ticks" aria-hidden="true">
        {[0, 25, 50, 75, 100].map((tick) => (
          <span key={tick} className="tick-label">{tick}%</span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN APP COMPONENT
───────────────────────────────────────────── */
export default function App() {
  // ── STATE ──────────────────────────────────
  const [progress, setProgress]       = useState(0);           // 0–100
  const [isRunning, setIsRunning]     = useState(false);
  const [isComplete, setIsComplete]   = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [speed, setSpeed]             = useState(1);           // interval multiplier

  const intervalRef = useRef(null);

  // Derived status label
  const statusLabel = isComplete ? 'Complete' : isRunning ? 'Loading…' : 'Ready';

  // ── PROGRESSION EFFECT (useEffect) ─────────
  useEffect(() => {
    if (!isRunning) return;

    // Clear any existing interval before starting a new one
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 1;
        if (next >= 100) {
          clearInterval(intervalRef.current);
          setIsRunning(false);
          setIsComplete(true);
          setShowConfetti(true);
          // Auto-hide confetti after 3 seconds
          setTimeout(() => setShowConfetti(false), 3000);
          return 100;
        }
        return next;
      });
    }, 80 * speed); // base 80ms per 1% step; scaled by speed factor

    // Cleanup on unmount or when isRunning/speed changes
    return () => clearInterval(intervalRef.current);
  }, [isRunning, speed]);

  // ── HANDLERS ───────────────────────────────
  const handleStart = () => {
    if (isComplete) return;
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setIsComplete(false);
    setShowConfetti(false);
    setProgress(0);
  };

  // ── RENDER ─────────────────────────────────
  return (
    <div className="app">
      {/* Ambient background */}
      <div className="grid-bg" aria-hidden="true" />
      <Particles />
      <Confetti active={showConfetti} />

      {/* ── MAIN CARD ── */}
      <main className="progress-card" role="main">

        {/* Header */}
        <header className="card-header">
          <div className={`icon-wrapper ${isComplete ? 'complete-icon' : 'loading-icon'}`}
            aria-hidden="true">
            {isComplete ? <CompleteIcon /> : <LoadingIcon />}
          </div>
          <h1 className="card-title">
            {isComplete ? 'Task Complete!' : 'Progress Tracker'}
          </h1>
          <p className="card-subtitle">
            {isComplete
              ? 'All processes finished successfully'
              : 'React useEffect — real-time progress demo'}
          </p>
        </header>

        {/* Step Indicator */}
        <StepIndicator progress={progress} />

        {/* Status Badge */}
        <div className="percentage-display" aria-live="polite" aria-atomic="true">
          <div
            className={`status-badge ${isComplete ? 'complete' : 'loading'}`}
            role="status"
          >
            <span className="status-dot" aria-hidden="true" />
            {statusLabel}
          </div>

          {/* Big percentage number */}
          <div
            className={`percentage-number ${isComplete ? 'complete-text' : 'loading-text'}`}
            aria-label={`${progress} percent`}
          >
            {progress}
            <span className="percentage-unit">%</span>
          </div>
        </div>

        {/* Speed control */}
        <SpeedControl
          speed={speed}
          onSpeedChange={setSpeed}
          disabled={isRunning}
        />

        {/* Progress Bar */}
        <ProgressBar progress={progress} isComplete={isComplete} />

        {/* Status Message */}
        <div className={`status-message ${isComplete ? 'complete-msg' : 'loading-msg'}`}>
          {isComplete ? (
            <>
              <p className="status-title">🎉 All Systems Go!</p>
              <p className="status-desc">
                The process completed in {(progress * 0.08 * speed).toFixed(1)}s.
                Click <strong>Reset</strong> to run again.
              </p>
            </>
          ) : (
            <>
              <p className="status-title">
                {isRunning ? '⚙️ Processing…' : progress > 0 ? '⏸ Paused' : '🚀 Ready to launch'}
              </p>
              <p className="status-desc">
                {isRunning
                  ? `Loaded ${progress} of 100 steps. Hang tight…`
                  : progress > 0
                  ? `Paused at ${progress}%. Press Start to resume.`
                  : 'Press Start to begin the loading sequence.'}
              </p>
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div className="actions" role="group" aria-label="Playback controls">
          <button
            id="btn-start"
            className="btn btn-primary"
            onClick={handleStart}
            disabled={isRunning || isComplete}
            aria-label="Start progress"
          >
            ▶ {progress > 0 && !isComplete ? 'Resume' : 'Start'}
          </button>
          <button
            id="btn-pause"
            className="btn btn-secondary"
            onClick={handlePause}
            disabled={!isRunning}
            aria-label="Pause progress"
          >
            ⏸ Pause
          </button>
          <button
            id="btn-reset"
            className="btn btn-secondary"
            onClick={handleReset}
            aria-label="Reset progress"
          >
            ↺ Reset
          </button>
        </div>

      </main>

      {/* Footer */}
      <footer style={{ marginTop: '1.5rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.78rem' }}>
        Built with React · <code style={{ fontFamily: 'monospace', color: '#a855f7' }}>useState</code> & <code style={{ fontFamily: 'monospace', color: '#06b6d4' }}>useEffect</code> hooks
      </footer>
    </div>
  );
}
