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
  const [showSummary, setShowSummary] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showPastTask, setShowPastTask] = useState(false);
  
  // New state for the task modal and task name
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [taskName, setTaskName] = useState('');

  const intervalRef = useRef(null);

  // Create a ref to store the latest inDoom value
  const inDoomRef = useRef(inDoom);
  useEffect(() => {
    inDoomRef.current = inDoom;
  }, [inDoom]);

  // Function to actually start the timer
  const startTimer = () => {
    setRun(true);
    intervalRef.current = setInterval(() => {
      setTotal(t => t + 1);
      if (inDoomRef.current) {
        setDoom(d => d + 1);
      } else {
        setFocus(f => f + 1);
      }
    }, 1000);
  };

  // When start button is pressed, show task modal if task not yet set
  const handleStartClick = () => {
    setShowTaskModal(true);
  };

  // Called when user submits the task name
  const handleTaskSubmit = () => {
    // Here you could also add extra validation if needed
    setShowTaskModal(false);
    startTimer();
  };

  const toggleDoom = () => setDooming(d => !d);

  const end = () => {
    clearInterval(intervalRef.current);
    setShowSummary(true);
  };

  useEffect(() => () => clearInterval(intervalRef.current), []);

  const fmt = s => {
    const mm = String(Math.floor(s / 60)).padStart(2, '0');
    const ss = String(s % 60).padStart(2, '0');
    return `${mm}:${ss}`;
  };

  return (
    <>
      {/* Nav container placed outside of timer-all */}
      <div className="nav-container">
        <button className="my-button" onClick={() => setShowSettings(true)}>
          Timer
        </button>
        <button className="my-button" onClick={() => setShowPastTask(true)}>
          View Past Task
        </button>
      </div>

      <div className="timer-all">
        <div className="timer-wrapper">
          <h1>Derot Watch</h1>
          { taskName && <h2> Current Task: {taskName}</h2> }
          <div className="timer-container">
            <p className="total-time">{fmt(total)}</p>
          </div>
          {!running ? (
            <button className='my-button' onClick={handleStartClick}>Start Task</button>
          ) : (
            <div className="actions-container">
              <button className="my-button" onClick={toggleDoom}>
                {inDoom ? 'End Doomscroll' : 'Doomscroll'}
              </button>
              <button className="my-button" onClick={end}>End Task</button>
            </div>
          )}
        </div>

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

        {showSettings && (
          <div className="modal">
            <Settings onClose={() => setShowSettings(false)} />
          </div>
        )}

        {showPastTask && (
          <div className="modal">
            <PastTask onClose={() => setShowPastTask(false)} />
          </div>
        )}

        {showTaskModal && (
          <div className="modal">
            <div 
              className="task-modal-popup" 
              style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "8px",
                width: "90%",
                maxWidth: "400px",
                textAlign: "center"
              }}
            >
              <h2>What you working on?</h2>
              <input 
                type="text" 
                placeholder="Enter task name..." 
                value={taskName} 
                onChange={e => setTaskName(e.target.value)}
                style={{marginBottom: "10px", padding: "5px", width: "80%"}}
              />
              <br />
              <div className="timer-container">
                <button onClick={handleTaskSubmit}>Start Task</button>
              </div>
              <button 
                onClick={() => setShowTaskModal(false)} 
                style={{ marginLeft: "10px" }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}