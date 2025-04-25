import React, { useState, useEffect, useRef } from 'react';
import Summary from './summary';
import Settings from './settings';
import PastTask from './past-task';

export default function Timer() {
  const [total, setTotal]     = useState(0);
  const [focus, setFocus]     = useState(0);
  const [doom, setDoom]       = useState(0);
  const [running, setRun]     = useState(false);
  const [inDoom, setDooming]  = useState(false);
  const [showSummary, setShowSummary] = useState(false); // toggle summary modal
  // New state variables for settings and past task modals:
  const [showSettings, setShowSettings] = useState(false);
  const [showPastTask, setShowPastTask] = useState(false);
  
  const intervalRef = useRef(null);

  // Create a ref to store the latest inDoom value
  const inDoomRef = useRef(inDoom);
  useEffect(() => {
    inDoomRef.current = inDoom;
  }, [inDoom]);

  const start = () => {
    setRun(true);
    intervalRef.current = setInterval(() => {
      setTotal(t => t + 1);
      // Use the ref’s current value so the callback gets the latest state
      if (inDoomRef.current) {
        setDoom(d => d + 1);
      } else {
        setFocus(f => f + 1);
      }
    }, 1000);
  };

  const toggleDoom = () => setDooming(d => !d);

  const end = () => {
    clearInterval(intervalRef.current);
    // Instead of navigating, show the summary modal
    setShowSummary(true);
  };

  useEffect(() => () => clearInterval(intervalRef.current), []);

  const fmt = s => {
    const mm = String(Math.floor(s / 60)).padStart(2, '0');
    const ss = String(s % 60).padStart(2, '0');
    return `${mm}:${ss}`;
  };

  return (
    <div>
      <h2>Task Timer</h2>
      <p>Total: {fmt(total)}</p>
      {!running ? (
        <button onClick={start}>Start Task</button>
      ) : (
        <>
          <button onClick={toggleDoom}>
            {inDoom ? 'End Doomscroll' : 'Doomscroll'}
          </button>
          <button onClick={end}>End Task</button>
        </>
      )}

      {/* Buttons to open Settings and Past Task modals */}
      <button className="my-button" onClick={() => setShowSettings(true)}>
        Settings
      </button>
      <button className="my-button" onClick={() => setShowPastTask(true)}>
        View Past Task
      </button>

      {/* Render Summary as a modal */}
      {showSummary && (
        <div className="modal">
          <Summary 
            total={total} 
            focus={focus} 
            doom={doom} 
            onClose={() => setShowSummary(false)} 
          />
        </div>
      )}

      {/* Render Settings as a modal */}
      {showSettings && (
        <div className="modal">
          <Settings onClose={() => setShowSettings(false)} />
        </div>
      )}

      {/* Render Past Task as a modal */}
      {showPastTask && (
        <div className="modal">
          <PastTask onClose={() => setShowPastTask(false)} />
        </div>
      )}
    </div>
  );
}