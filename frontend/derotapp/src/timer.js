import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Timer() {
  const [total, setTotal]     = useState(0);
  const [focus, setFocus]     = useState(0);
  const [doom, setDoom]       = useState(0);
  const [running, setRun]     = useState(false);
  const [inDoom, setDooming]  = useState(false);
  const intervalRef = useRef(null);
  const navigate    = useNavigate();

  // Create a ref to store the latest inDoom value
  const inDoomRef = useRef(inDoom);
  useEffect(() => {
    inDoomRef.current = inDoom;
  }, [inDoom]);

  const start = () => {
    setRun(true);
    intervalRef.current = setInterval(() => {
      setTotal(t => t + 1);
      // Use the ref's current value so the callback gets the latest state
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
    // Pass stats via router state
    navigate('/summary', { state: { total, focus, doom } });
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
    </div>
  );
}